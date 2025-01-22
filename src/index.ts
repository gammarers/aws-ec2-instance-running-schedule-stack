import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as scheduler from 'aws-cdk-lib/aws-scheduler';
import { Construct } from 'constructs';
import { RunningControlStateMachine } from './resources/running-control-state-machine';

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

export interface EC2InstanceRunningScheduleStackProps {
  readonly targetResource: TargetResource;
  readonly stopSchedule?: Schedule;
  readonly startSchedule?: Schedule;
}

export class EC2InstanceRunningScheduleStack extends Stack {
  constructor(scope: Construct, id: string, props: EC2InstanceRunningScheduleStackProps) {
    super(scope, id);

    // 👇 StepFunctions State Machine
    const machine = new RunningControlStateMachine(this, 'StateMachine', {
      stateMachineName: undefined,
      // notificationTopic: topic,
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
      description: 'stop database(instance/cluster) running stop schedule.',
      sheduleState: 'ENABLED',
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
      description: 'start db instance schedule.',
      sheduleState: 'ENABLED',
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
  description: string;
  sheduleState: string;
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
      description: props.description,
      state: props.sheduleState,
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
