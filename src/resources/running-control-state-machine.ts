import { Duration } from 'aws-cdk-lib';
// import * as sns from 'aws-cdk-lib/aws-sns';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export interface RunningControlStateMachineProps extends sfn.StateMachineProps {
  // notificationTopic: sns.ITopic;
}

export class RunningControlStateMachine extends sfn.StateMachine {
  constructor(scope: Construct, id: string, props: RunningControlStateMachineProps) {
    super(scope, id, {
      ...props,
      definitionBody: (() => {

        const succeed = new sfn.Succeed(scope, 'Succeed');

        // aws resourcegroupstaggingapi get-resources --resource-type-filters ec2:instance
        // 👇 Get EC2 Instance Resource from Tag
        const getTargetResources = new tasks.CallAwsService(scope, 'GetTargetResources', {
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

        const getTargetLength = new sfn.Pass(scope, 'CalculateArrayLength', {
          resultPath: '$.TargetResourceLength', // 中間結果を格納する場所
          parameters: {
            'Length.$': 'States.ArrayLength($.Result.TargetResources)', // 配列の長さを計算
          },
        });
        getTargetResources.next(getTargetLength);

        // 👇 Do Stop instance
        const stopInstance = new tasks.CallAwsService(scope, 'StopInstance', {
          iamResources: ['*'],
          service: 'ec2',
          action: 'stopInstances',
          parameters: {
            InstanceIds: sfn.JsonPath.array(sfn.JsonPath.stringAt('$.Target.Identifier')),
          },
          resultPath: '$.Result',
          resultSelector: {
            'CurrentState.$': '$.StoppingInstances[0].CurrentState.Name',
          },
        });

        // 👇 Do Start instances
        const startInstance = new tasks.CallAwsService(scope, 'StartInstance', {
          iamResources: ['*'],
          service: 'ec2',
          action: 'startInstances',
          parameters: {
            InstanceIds: sfn.JsonPath.array(sfn.JsonPath.stringAt('$.Target.Identifier')),
          },
          resultPath: '$.Result',
          resultSelector: {
            'CurrentState.$': '$.StartingInstances[0].CurrentState.Name',
          },
        });

        // 👇 Describe instance
        const describeInstance = new tasks.CallAwsService(scope, 'DescribeInstance', {
          iamResources: ['*'],
          service: 'ec2',
          action: 'describeInstances',
          parameters: {
            InstanceIds: sfn.JsonPath.array(sfn.JsonPath.stringAt('$.Target.Identifier')),
          },
          resultPath: '$.Result',
          resultSelector: {
            'CurrentState.$': '$.Reservations[0].Instances[0].State.Name',
          },
        });

        const statusChangeWait = new sfn.Wait(scope, 'StatusChangeWait', {
          time: sfn.WaitTime.duration(Duration.seconds(20)),
        });
        statusChangeWait.next(describeInstance);

        stopInstance.next(statusChangeWait);
        startInstance.next(statusChangeWait);


        const describeTypeChoice = new sfn.Choice(scope, 'StatusChoice')
          // instance start on status.stopped
          .when(
            sfn.Condition.and(
              sfn.Condition.stringEquals('$.Params.Mode', 'Start'),
              sfn.Condition.stringEquals('$.Result.CurrentState', 'stopped'),
            ),
            startInstance,
          )
          // instance stop on status.running
          .when(
            sfn.Condition.and(
              sfn.Condition.stringEquals('$.Params.Mode', 'Stop'),
              sfn.Condition.stringEquals('$.Result.CurrentState', 'running'),
            ),
            stopInstance,
          )
          // status change succeed, // todo generate topic
          .when(
            sfn.Condition.or(
              sfn.Condition.and(
                sfn.Condition.stringEquals('$.Params.Mode', 'Start'),
                sfn.Condition.stringEquals('$.Result.CurrentState', 'running'),
              ),
              sfn.Condition.and(
                sfn.Condition.stringEquals('$.Params.Mode', 'Stop'),
                sfn.Condition.stringEquals('$.Result.CurrentState', 'stopped'),
              ),
            ),
            new sfn.Succeed(scope, 'InstanceStatusChangeSucceed'),
          )
          .when(
            // start & starting/configuring-enhanced-monitoring/backing-up or stop modifying/stopping
            sfn.Condition.or(
              sfn.Condition.and(
                sfn.Condition.and(
                  sfn.Condition.stringEquals('$.Params.Mode', 'Start'),
                  sfn.Condition.or(
                    sfn.Condition.stringEquals('$.Result.CurrentState', 'pending'),
                  ),
                ),
              ),
              sfn.Condition.and(
                sfn.Condition.and(
                  sfn.Condition.stringEquals('$.Params.Mode', 'Stop'),
                  sfn.Condition.or(
                    sfn.Condition.stringEquals('$.Result.CurrentState', 'stopping'),
                    sfn.Condition.stringEquals('$.Result.CurrentState', 'shutting-down'),
                  ),
                ),
              ),
            ),
            statusChangeWait,
          )
          .otherwise(new sfn.Fail(scope, 'StatusFail', {
            cause: 'instance status fail.',
          }));
        describeInstance.next(describeTypeChoice);

        const resourceStatusChangingMap = new sfn.Map(scope, 'ResourceProcessingMap', {
          itemsPath: sfn.JsonPath.stringAt('$.Result.TargetResources'),
          parameters: {
            TargetResource: sfn.JsonPath.stringAt('$$.Map.Item.Value'),
            Params: sfn.JsonPath.stringAt('$.Params'),
            // definition: sfn.JsonPath.stringAt('$.definition'),
          },
          maxConcurrency: 10,
        }).itemProcessor(
          new sfn.Pass(scope, 'GetIdentifier', {
            resultPath: '$.Target',
            parameters: {
              // arn:aws:ec2:ap-northeast-1:123456789012:instance/i-0000000000aaaaa
              Identifier: sfn.JsonPath.arrayGetItem(sfn.JsonPath.stringSplit(sfn.JsonPath.stringAt('$.TargetResource'), '/'), 1),
            },
          }).next(describeInstance));

        const targetResourcesNotFound = new sfn.Pass(scope, 'TargetResourcesNotFound');
        targetResourcesNotFound.next(succeed);

        const targetResourcesExistCheck = new sfn.Choice(scope, 'TargetResourcesExistCheck')
          .when(
            sfn.Condition.numberGreaterThan('$.TargetResourceLength.Length', 0),
            //sfn.Condition.numberGreaterThan(sfn.JsonPath.arrayLength('$.Result.TargetResources'), 0),
            resourceStatusChangingMap,
          )
          .otherwise(targetResourcesNotFound);

        getTargetLength.next(targetResourcesExistCheck);

        return sfn.DefinitionBody.fromChainable(getTargetResources);
      })(),
    });
  }
}
