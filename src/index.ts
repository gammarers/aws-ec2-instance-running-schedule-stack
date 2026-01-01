import { Duration, Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as scheduler from 'aws-cdk-lib/aws-scheduler';
import * as sns from 'aws-cdk-lib/aws-sns';
import { LogLevel as EC2InstanceRunningScheduleStackMachineLogLevel } from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';
import { RunningControlStateMachine } from './resources/running-control-state-machine';

export {
  EC2InstanceRunningScheduleStackMachineLogLevel,
};

export interface TargetResource {
  readonly tagKey: string;
  readonly tagValues: string[];
}

export interface Schedule {
  readonly timezone: string;
  readonly minute?: string;
  readonly hour?: string;
  readonly week?: string;
}

export interface Notifications {
  readonly emails?: string[];
  // readonly slack?: Slack;
}

export interface LogOption {
  readonly machineLogLevel?: EC2InstanceRunningScheduleStackMachineLogLevel;
}

export interface Timeout {
  readonly stateMachineTimeout?: Duration;
}

export interface EC2InstanceRunningScheduleStackProps {
  readonly targetResource: TargetResource;
  readonly enabled?: boolean;
  // todo: schedule {start/stop}
  readonly stopSchedule?: Schedule;
  readonly startSchedule?: Schedule;
  readonly notifications?: Notifications;
  readonly logOption?: LogOption;
  readonly timeout?: Timeout;
}

export class EC2InstanceRunningScheduleStack extends Stack {
  constructor(scope: Construct, id: string, props: EC2InstanceRunningScheduleStackProps) {
    super(scope, id);

    const topic: sns.Topic = new sns.Topic(this, 'NotificationTopic', {
      // topicName: names.notificationTopicName,
      // displayName: names.notificationTopicDisplayName,
    });

    const emails = props.notifications?.emails ?? [];
    for (const [index, value] of emails.entries()) {
      new sns.Subscription(this, `SubscriptionEmail${index.toString().padStart(3, '0')}`, {
        topic,
        protocol: sns.SubscriptionProtocol.EMAIL,
        endpoint: value,
      });
    }

    // 👇 StepFunctions State Machine
    const machine = new RunningControlStateMachine(this, 'StateMachine', {
      stateMachineName: undefined,
      notificationTopic: topic,
      timeout: (() => {
        if (props.timeout?.stateMachineTimeout) {
          return props.timeout?.stateMachineTimeout;
        }
        return Duration.hours(1);
      })(),
      logs: (() => {
        if (props.logOption?.machineLogLevel) {
          return {
            destination: new logs.LogGroup(this, 'StateMachineLogGroup', {
              logGroupName: (() => {
                // if (names.stateMachineName) {
                //   return `/aws/states/${names.stateMachineName}`;
                // }
                return undefined;
              })(),
            }),
            level: props.logOption.machineLogLevel,
          };
        }
        return undefined;
      })(),
    });

    // 👇 EventBridge Scheduler IAM Role
    const schedulerExecutionRole = new iam.Role(this, 'SchedulerExecutionRole', {
      roleName: undefined,
      assumedBy: new iam.ServicePrincipal('scheduler.amazonaws.com'),
      inlinePolicies: {
        'state-machine-exec-policy': new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'states:StartExecution',
              ],
              resources: [
                machine.stateMachineArn,
              ],
            }),
          ],
        }),
      },
    });

    // 👇 Rule state
    const enableRule: boolean = (() => {
      return props?.enabled === undefined || props.enabled;
    })();

    // 👇 Stop Schedule expression
    const stopScheduleExpression: string = (() => {
      // default: weekday 21:10
      const minute: string = props.stopSchedule?.minute ?? '10';
      const hour: string = props.stopSchedule?.hour ?? '21';
      const week: string = props.stopSchedule?.week ?? 'MON-FRI';
      return `cron(${minute} ${hour} ? * ${week} *)`;
    })();

    // 👇 Start Schedule expression
    const startScheduleExpression: string = (() => {
      // default: weekday 07:50
      const minute: string = props.startSchedule?.minute ?? '50';
      const hour: string = props.startSchedule?.hour ?? '7';
      const week: string = props.startSchedule?.week ?? 'MON-FRI';
      return `cron(${minute} ${hour} ? * ${week} *)`;
    })();

    // 👇 Stop EC2 instance schedule
    new InstanceRuningSchedule(this, 'StopDatabaseRunningSchedule', {
      name: undefined,
      enabled: enableRule,
      description: 'stop database(instance/cluster) running stop schedule.',
      timezone: props.stopSchedule?.timezone ?? 'UTC',
      expression: stopScheduleExpression,
      target: {
        stateMachineArn: machine.stateMachineArn,
        roleArn: schedulerExecutionRole.roleArn,
        resourceTag: {
          key: props.targetResource.tagKey,
          values: props.targetResource.tagValues,
        },
        input: { mode: 'Stop' },
      },
    });

    // 👇 Start EC2 instance schedule
    new InstanceRuningSchedule(this, 'StartDatabaseRunningSchedule', {
      name: undefined,
      enabled: enableRule,
      description: 'start db instance schedule.',
      timezone: props.startSchedule?.timezone ?? 'UTC',
      expression: startScheduleExpression,
      target: {
        stateMachineArn: machine.stateMachineArn,
        roleArn: schedulerExecutionRole.roleArn,
        resourceTag: {
          key: props.targetResource.tagKey,
          values: props.targetResource.tagValues,
        },
        input: { mode: 'Start' },
      },
    });
  }
}

interface InstanceRuningScheduleProps {
  name?: string;
  enabled: boolean;
  description: string;
  timezone: string;
  expression: string;
  target: {
    stateMachineArn: string;
    roleArn: string;
    resourceTag: {
      key: string;
      values: string[];
    };
    input: {
      mode: string;
    };
  };
}

class InstanceRuningSchedule extends scheduler.CfnSchedule {
  constructor(scope: Construct, id: string, props: InstanceRuningScheduleProps) {
    super(scope, id, {
      name: props.name,
      state: props.enabled ? 'ENABLED' : 'DISABLED',
      description: props.description,
      //groupName: scheduleGroup.name, // default
      flexibleTimeWindow: {
        mode: 'OFF',
      },
      scheduleExpressionTimezone: props.timezone,
      scheduleExpression: props.expression,
      target: {
        arn: props.target.stateMachineArn,
        roleArn: props.target.roleArn,
        input: JSON.stringify({
          Params: {
            TagKey: props.target.resourceTag.key,
            TagValues: props.target.resourceTag.values,
            Mode: props.target.input.mode,
          },
        }),
        retryPolicy: {
          maximumEventAgeInSeconds: 60,
          maximumRetryAttempts: 0,
        },
      },
    });
  }
}
