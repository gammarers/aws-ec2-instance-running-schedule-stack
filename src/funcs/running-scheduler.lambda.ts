/**
 * EC2 Running Scheduler – Durable Functions implementation.
 *
 * Implements the running-control flow using AWS Lambda Durable Execution.
 * Step checkpoints, wait (no charge), and parallel map provide a flow equivalent to Step Functions.
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/durable-execution-sdk.html
 */

import { withDurableExecution, type DurableContext } from '@aws/durable-execution-sdk-js';
import {
  EC2Client,
  DescribeInstancesCommand,
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';
import { GetResourcesCommand, ResourceGroupsTaggingAPIClient } from '@aws-sdk/client-resource-groups-tagging-api';
import { WebClient } from '@slack/web-api';
import { secretFetcher } from 'aws-lambda-secret-fetcher';

/** Mapping of EC2 instance state to display name and emoji for Slack. */
const STATE_LIST = [
  { name: 'RUNNING', emoji: '😆', state: 'running' },
  { name: 'STOPPED', emoji: '😴', state: 'stopped' },
] as const;

/** Seconds to wait between polling instance state after start/stop. */
const STATUS_CHANGE_WAIT_SECONDS = 20;

/** Event payload from EventBridge Scheduler invoking this Lambda. */
export interface SchedulerEvent {
  Params: {
    /** Tag key used to select EC2 instances. */
    TagKey: string;
    /** Tag values to match. */
    TagValues: string[];
    /** Whether to start or stop instances. */
    Mode: 'Start' | 'Stop';
  };
}

/** Shape of the Slack secret stored in Secrets Manager. */
interface SlackSecret {
  token: string;
  channel: string;
}

/**
 * Returns display name and emoji for an EC2 instance state.
 *
 * @param current - Current instance state (e.g. 'running', 'stopped').
 * @returns Display info or undefined if state is not in STATE_LIST.
 */
const getStateDisplay = (current: string): { emoji: string; name: string } | undefined => {
  const found = STATE_LIST.find((s) => s.state === current);
  return found ? { emoji: found.emoji, name: found.name } : undefined;
};

/**
 * Processes a single EC2 instance: describes state, starts or stops as needed, and polls until stable.
 *
 * @param ctx - Durable execution context for steps and wait.
 * @param targetResource - EC2 instance ARN.
 * @param params - Scheduler params (TagKey, TagValues, Mode).
 * @param resourceIndex - Index of this resource (used for step names).
 * @returns Resource ARN, final status, account, region, and instance id.
 */
const processOneResource = async (
  ctx: DurableContext,
  targetResource: string,
  params: SchedulerEvent['Params'],
  resourceIndex: number,
): Promise<{ resource: string; status: string; account: string; region: string; identifier: string }> => {
  const parts = targetResource.split('/');
  const identifier = parts[parts.length - 1] ?? 'unknown';
  const arnParts = targetResource.split(':');
  const account = arnParts[4] ?? '';
  const region = arnParts[3] ?? '';
  const stepPrefix = `resource-${resourceIndex}-${identifier}`;

  let loopCount = 0;
  for (;;) {
    const currentState = await ctx.step(`${stepPrefix}-describe-${loopCount}`, async () => {
      const ec2 = new EC2Client({});
      const out = await ec2.send(new DescribeInstancesCommand({ InstanceIds: [identifier] }));
      return out.Reservations?.[0]?.Instances?.[0]?.State?.Name ?? 'unknown';
    });

    const mode = params.Mode;

    if (mode === 'Start' && currentState === 'stopped') {
      await ctx.step(`${stepPrefix}-start-${loopCount}`, async () => {
        const ec2 = new EC2Client({});
        await ec2.send(new StartInstancesCommand({ InstanceIds: [identifier] }));
      });
      await ctx.wait({ seconds: STATUS_CHANGE_WAIT_SECONDS });
      loopCount += 1;
      continue;
    }

    if (mode === 'Stop' && (currentState === 'running')) {
      await ctx.step(`${stepPrefix}-stop-${loopCount}`, async () => {
        const ec2 = new EC2Client({});
        await ec2.send(new StopInstancesCommand({ InstanceIds: [identifier] }));
      });
      await ctx.wait({ seconds: STATUS_CHANGE_WAIT_SECONDS });
      loopCount += 1;
      continue;
    }

    if (
      (mode === 'Start' && currentState === 'running') ||
      (mode === 'Stop' && currentState === 'stopped')
    ) {
      return {
        identifier,
        account,
        region,
        resource: targetResource,
        status: currentState,
      };
    }

    const transitioning =
      (mode === 'Start' && currentState === 'pending') ||
      (mode === 'Stop' && (currentState === 'stopping' || currentState === 'shutting-down'));

    if (transitioning) {
      await ctx.wait({ seconds: STATUS_CHANGE_WAIT_SECONDS });
      loopCount += 1;
      continue;
    }

    throw new Error(`instance status fail: mode=${mode} currentState=${currentState}`);
  }
};

/**
 * Durable Lambda handler for the EC2 running scheduler.
 * Fetches target resources by tag, starts or stops instances per Mode, and posts results to Slack.
 *
 * @param event - SchedulerEvent with Params.TagKey, Params.TagValues, Params.Mode.
 * @param context - Durable execution context.
 * @returns Status and list of processed resources, or TargetResourcesNotFound if none match.
 */
export const handler = withDurableExecution(async (event: SchedulerEvent, context: DurableContext) => {

  const params = event.Params;

  if (!params?.TagKey || !params?.TagValues || !params?.Mode) {
    throw new Error('Invalid event: Params.TagKey, Params.TagValues, Params.Mode are required.');
  }
  const slackSecretName = process.env.SLACK_SECRET_NAME;
  if (!slackSecretName) {
    throw new Error('missing environment variable SLACK_SECRET_NAME.');
  }
  const slackSecretValue = await context.step('fetch-slack-secret', async () => {
    return secretFetcher.getSecretValue<SlackSecret>(slackSecretName);
  });

  if (!slackSecretValue?.token || !slackSecretValue?.channel) {
    throw new Error('Slack secret must contain token and channel.');
  }

  const targetResources = await context.step('get-target-resources', async () => {
    const client = new ResourceGroupsTaggingAPIClient({});
    const result = await client.send(
      new GetResourcesCommand({
        ResourceTypeFilters: ['ec2:instance'],
        TagFilters: [{ Key: params.TagKey, Values: params.TagValues }],
      }),
    );
    return (result.ResourceTagMappingList ?? [])
      .map((m: { ResourceARN?: string }) => m.ResourceARN)
      .filter((arn: string | undefined): arn is string => arn != null);
  });

  if (targetResources.length === 0) {
    return { status: 'TargetResourcesNotFound' as const };
  }

  const client = new WebClient(slackSecretValue.token);
  const channel = slackSecretValue.channel;

  // send slack message
  const slackParentMessageResult = await context.step('post-slack-messages', async () => {
    return client.chat.postMessage({
      channel,
      text: `${params.Mode === 'Start' ? '😆 Starts' : '🥱 Stops'} the scheduled EC2 Instance.`,
    });
  });

  const results = await context.map(
    targetResources,
    // async (ctx: DurableContext, targetResource: string, index: number) =>
    //   ctx.step(`process-resource-${index}`, async () =>
    //     processOneResource(ctx, targetResource, params, index),
    //   ),
    async (ctx: DurableContext, targetResource: string, index: number) => {
      return ctx.runInChildContext(`resource-${index}`, async (childCtx: DurableContext) => {
        const result = await processOneResource(childCtx, targetResource, params, index);
        // if (result.status === 'skipped') {
        //   return result;
        // }
        // send slack thread message
        await childCtx.step('post-slack-child-messages', async () => {
          const display = getStateDisplay(result.status);

          return client.chat.postMessage({
            channel,
            thread_ts: slackParentMessageResult?.ts,
            attachments: [
              {
                color: '#36a64f',
                pretext: `${display?.emoji} The status of the EC2 Instance ${result.identifier} changed to ${display?.name} due to the schedule.`,
                fields: [
                  { title: 'Account', value: result.account, short: true },
                  { title: 'Region', value: result.region, short: true },
                  { title: 'Identifier', value: result.identifier, short: true },
                  { title: 'Status', value: (display?.name ?? 'Unknown'), short: true },
                ],
              },
            ],
          });
        });
        return result;
      });
    },
    { maxConcurrency: 10 },
  );

  const resultList = Array.isArray(results) ? results : [];
  return {
    status: 'Completed' as const,
    processed: targetResources.length,
    results: resultList,
  };
});
