import { Duration, Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as scheduler from 'aws-cdk-lib/aws-scheduler';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

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

    // const account = Stack.of(this).account;

    const succeed = new sfn.Succeed(this, 'Succeed');

    // aws resourcegroupstaggingapi get-resources --resource-type-filters ec2:instance
    // 👇 Get EC2 Instance Resource from Tag
    const getTargetResources = new tasks.CallAwsService(this, 'GetTargetResources', {
      iamResources: ['*'],
      iamAction: 'tag:GetResources',
      service: 'resourcegroupstaggingapi',
      action: 'getResources',
      parameters: {
        ResourceTypeFilters: [
          'ec2:instance',
        ],
        TagFilters: [
          {
            Key: sfn.JsonPath.stringAt('$.Params.TagKey'),
            Values: sfn.JsonPath.stringAt('$.Params.TagValues'),
          },
        ],
      },
      resultPath: '$.Result',
      // $.Result.TargetResources
      resultSelector: {
        TargetResources: sfn.JsonPath.listAt('$..ResourceTagMappingList[*].ResourceARN'),
      },
    });

    const getTargetLength = new sfn.Pass(this, 'CalculateArrayLength', {
      resultPath: '$.TargetResourceLength', // 中間結果を格納する場所
      parameters: {
        'Length.$': 'States.ArrayLength($.Result.TargetResources)', // 配列の長さを計算
      },
    });
    getTargetResources.next(getTargetLength);

    // 👇 Do Stop instance
    const stopInstance = new tasks.CallAwsService(this, 'StopInstance', {
      iamResources: ['*'],
      service: 'ec2',
      action: 'stopInstances',
      parameters: {
        'InstanceIds.$': '$.Result.TargetInstanceId',
      },
      resultPath: '$.Result',
      resultSelector: {
        'CurrentState.$': '$.StoppingInstances[0].CurrentState.Name',
      },
    });

    // 👇 Do Start instances
    const startInstance = new tasks.CallAwsService(this, 'StartInstance', {
      iamResources: ['*'],
      service: 'ec2',
      action: 'startInstances',
      parameters: {
        'InstanceIds.$': '$.Result.TargetInstanceId',
      },
      resultPath: '$.Result',
      resultSelector: {
        'CurrentState.$': '$.StartingInstances[0].CurrentState.Name',
      },
    });

    // 👇 Describe instance Status
    const describeInstanceStatus = new tasks.CallAwsService(this, 'DescribeInstanceStatus', {
      iamResources: ['*'],
      service: 'ec2',
      action: 'describeInstanceStatus',
      parameters: {
        'InstanceIds.$': '$.Result.TargetInstanceId',
      },
      resultPath: '$.Result',
      resultSelector: {
        'TargetInstanceId.$': '$.InstanceStatuses[0].InstanceState.Name',
      },
    });

    const statusChangeWait = new sfn.Wait(this, 'StatusChangeWait', {
      time: sfn.WaitTime.duration(Duration.seconds(20)),
    });
    statusChangeWait.next(describeInstanceStatus);

    stopInstance.next(statusChangeWait);
    startInstance.next(statusChangeWait);


    const describeTypeChoice = new sfn.Choice(this, 'StatusChoice')
      // instance start on status.stopped
      .when(
        sfn.Condition.and(
          sfn.Condition.stringEquals('$.Params.Mode', 'Start'),
          sfn.Condition.stringEquals('$.Result.status.current', 'Stopped'),
        ),
        startInstance,
      )
      // instance stop on status.running
      .when(
        sfn.Condition.and(
          sfn.Condition.stringEquals('$.Params.Mode', 'Stop'),
          sfn.Condition.stringEquals('$.Result.status.current', 'Running'),
        ),
        stopInstance,
      )
      // status change succeed, // todo generate topic
      .when(
        sfn.Condition.or(
          sfn.Condition.and(
            sfn.Condition.stringEquals('$.Params.Mode', 'Start'),
            sfn.Condition.stringEquals('$.Result.status.current', 'Running'),
          ),
          sfn.Condition.and(
            sfn.Condition.stringEquals('$.Params.Mode', 'Stop'),
            sfn.Condition.stringEquals('$.Result.status.current', 'Stopped'),
          ),
        ),
        new sfn.Succeed(this, 'InstanceStatusChangeSucceed'),
      )
      .when(
        // start & starting/configuring-enhanced-monitoring/backing-up or stop modifying/stopping
        sfn.Condition.or(
          sfn.Condition.and(
            sfn.Condition.and(
              sfn.Condition.stringEquals('$.Params.Mode', 'Start'),
              sfn.Condition.or(
                sfn.Condition.stringEquals('$.Result.status.current', 'pending'),
              ),
            ),
          ),
          sfn.Condition.and(
            sfn.Condition.and(
              sfn.Condition.stringEquals('$.Params.Mode', 'Stop'),
              sfn.Condition.or(
                sfn.Condition.stringEquals('$.Result.status.current', 'stopping'),
                sfn.Condition.stringEquals('$.Result.status.current', 'shutting-down'),
              ),
            ),
          ),
        ),
        statusChangeWait,
      )
      .otherwise(new sfn.Fail(this, 'StatusFail', {
        cause: 'instance status fail.',
      }));

    const resourceStatusChangingMap = new sfn.Map(this, 'ResourceProcessingMap', {
      itemsPath: sfn.JsonPath.stringAt('$.Result.TargetResources'),
      parameters: {
        TargetResource: sfn.JsonPath.stringAt('$$.Map.Item.Value'),
        params: sfn.JsonPath.stringAt('$.Params'),
        definition: sfn.JsonPath.stringAt('$.definition'),
      },
      maxConcurrency: 10,
    }).itemProcessor(
      new sfn.Pass(this, 'GetIdentifier', {
        resultPath: '$.Result.target',
        parameters: {
          identifier: sfn.JsonPath.arrayGetItem(sfn.JsonPath.stringSplit(sfn.JsonPath.stringAt('$.TargetResource'), ':'), 6),
        },
      }).next(describeTypeChoice));

    const targetResourcesNotFound = new sfn.Pass(this, 'TargetResourcesNotFound');
    targetResourcesNotFound.next(succeed);

    const targetResourcesExistCheck = new sfn.Choice(this, 'TargetResourcesExistCheck')
      .when(
        sfn.Condition.numberGreaterThan('$.TargetResourceLength.Length', 0),
        //sfn.Condition.numberGreaterThan(sfn.JsonPath.arrayLength('$.Result.TargetResources'), 0),
        resourceStatusChangingMap,
      )
      .otherwise(targetResourcesNotFound);

    getTargetLength.next(targetResourcesExistCheck);

    const machine = new sfn.StateMachine(this, 'StateMachine', {
      stateMachineName: undefined,
      definitionBody: sfn.DefinitionBody.fromChainable(getTargetResources),
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
