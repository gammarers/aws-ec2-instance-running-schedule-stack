import * as crypto from 'crypto';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as scheduler from 'aws-cdk-lib/aws-scheduler';
import { Construct } from 'constructs';

export interface ScheduleProperty {
  readonly timezone: string;
  readonly minute?: string;
  readonly hour?: string;
  readonly week?: string;
}

export interface TargetsProperty {
  readonly instances: string[];
  readonly stopSchedule: ScheduleProperty;
  readonly startSchedule: ScheduleProperty;
}

export interface Ec2InstanceRunningSchedulerProps {
  readonly targets: TargetsProperty[];
}

export class Ec2InstanceRunningScheduler extends Construct {
  constructor(scope: Construct, id: string, props: Ec2InstanceRunningSchedulerProps) {
    super(scope, id);

    const account = cdk.Stack.of(this).account;
    //const stackName: string = cdk.Stack.of(this).stackName;
    //const region = cdk.Stack.of(this).region;

    const randomNameKey = crypto.createHash('shake256', { outputLength: 4 })
      .update(`${cdk.Names.uniqueId(scope)}-${cdk.Names.uniqueId(this)}`)
      .digest('hex');

    // 👇EventBridge Scheduler IAM Role
    const schedulerExecutionRole = new iam.Role(this, 'SchedulerExecutionRole', {
      roleName: `stop-ec2-instance-schedule-${randomNameKey}-exec-role`,
      assumedBy: new iam.ServicePrincipal('scheduler.amazonaws.com'),
      inlinePolicies: {
        ['ec2-instance-stop-policy']: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'ec2:StartInstances',
                'ec2:StopInstances',
              ],
              resources: [
                `arn:aws:ec2:*:${account}:instance/*`,
              ],
            }),
          ],
        }),
      },
    });

    // Object.entries(props.targets)

    for (const target of props.targets) {
      // 👇Create random string
      const scheduleNameKey = crypto.createHash('shake256', { outputLength: 4 })
        .update(target.instances.toString())
        .digest('hex');

      // 👇EventBridge Scheduler for DB Instance Stop
      new scheduler.CfnSchedule(this, `StopSchedule${scheduleNameKey.toUpperCase()}`, {
        name: `auto-stop-ec2-instance-${scheduleNameKey}-schedule`,
        description: `auto stop ec2 instance (${target.instances.join(',')}) schedule.`,
        state: 'ENABLED',
        //groupName: scheduleGroup.name, // default
        flexibleTimeWindow: {
          mode: 'OFF',
        },
        scheduleExpressionTimezone: target.stopSchedule.timezone,
        scheduleExpression: (() => {
          // default: weekday 21:10
          const minute: string = target.stopSchedule.minute ?? '10';
          const hour: string = target.stopSchedule.hour ?? '21';
          const week: string = target.stopSchedule.week ?? 'MON-FRI';
          return `cron(${minute} ${hour} ? * ${week} *)`;
        })(),
        target: {
          arn: 'arn:aws:scheduler:::aws-sdk:ec2:stopInstances',
          roleArn: schedulerExecutionRole.roleArn,
          input: JSON.stringify({ InstanceIds: target.instances }),
          retryPolicy: {
            maximumEventAgeInSeconds: 60,
            maximumRetryAttempts: 0,
          },
        },
      });

      // 👇EventBridge Scheduler for DB Instance Start
      new scheduler.CfnSchedule(this, `StartSchedule${scheduleNameKey.toUpperCase()}`, {
        name: `auto-start-ec2-instance-${scheduleNameKey}-schedule`,
        description: `auto start ec2 instance(${target.instances.join(',')}) schedule.`,
        state: 'ENABLED',
        //groupName: scheduleGroup.name, // default
        flexibleTimeWindow: {
          mode: 'OFF',
        },
        scheduleExpressionTimezone: target.startSchedule.timezone,
        scheduleExpression: (() => {
          // default: weekday 07:50
          const minute: string = target.startSchedule.minute ?? '50';
          const hour: string = target.startSchedule.hour ?? '7';
          const week: string = target.startSchedule.week ?? 'MON-FRI';
          return `cron(${minute} ${hour} ? * ${week} *)`;
        })(),
        target: {
          arn: 'arn:aws:scheduler:::aws-sdk:ec2:startInstances',
          roleArn: schedulerExecutionRole.roleArn,
          input: JSON.stringify({ InstanceIds: target.instances }),
          retryPolicy: {
            maximumEventAgeInSeconds: 60,
            maximumRetryAttempts: 0,
          },
        },
      });
    }
  }
}
