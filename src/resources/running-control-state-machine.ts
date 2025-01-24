import { Duration } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export interface RunningControlStateMachineProps extends sfn.StateMachineProps {
  notificationTopic: sns.ITopic;
}

export class RunningControlStateMachine extends sfn.StateMachine {
  constructor(scope: Construct, id: string, props: RunningControlStateMachineProps) {
    super(scope, id, {
      ...props,
      definitionBody: (() => {

        const initStateListDefinition: sfn.Pass = new sfn.Pass(scope, 'InitStateListDefinition', {
          result: sfn.Result.fromObject([
            { name: 'RUNNING', emoji: '☺', state: 'running' },
            { name: 'STOPPED', emoji: '😴', state: 'stopped' },
          ]),
          resultPath: '$.definition.stateList',
        });

        const prepareTopicValue = new sfn.Pass(scope, 'PrepareTopicValue', {
          resultPath: '$.prepare.topic.values',
          parameters: {
            emoji: sfn.JsonPath.arrayGetItem(sfn.JsonPath.stringAt('$.definition.stateList[?(@.state == $.Result.CurrentState)].emoji'), 0),
            status: sfn.JsonPath.arrayGetItem(sfn.JsonPath.stringAt('$.definition.stateList[?(@.state == $.Result.CurrentState)].name'), 0),
            account: sfn.JsonPath.arrayGetItem(sfn.JsonPath.stringSplit(sfn.JsonPath.stringAt('$.TargetResource'), ':'), 4), // account
            region: sfn.JsonPath.arrayGetItem(sfn.JsonPath.stringSplit(sfn.JsonPath.stringAt('$.TargetResource'), ':'), 3), // region
          },
        }).next(new sfn.Pass(scope, 'GenerateTopic', {
          resultPath: '$.Generate.Topic',
          parameters: {
            Subject: sfn.JsonPath.format('{} [{}] AWS EC2 Instance {} Running Notification [{}][{}]',
              sfn.JsonPath.stringAt('$.prepare.topic.values.emoji'),
              sfn.JsonPath.stringAt('$.prepare.topic.values.status'),
              sfn.JsonPath.stringAt('$.Params.Mode'),
              sfn.JsonPath.stringAt('$.prepare.topic.values.account'),
              sfn.JsonPath.stringAt('$.prepare.topic.values.region'),
            ),
            TextMessage: sfn.JsonPath.format('{}\n\nAccount : {}\nRegion : {}\nIdentifier : {}\nStatus : {}',
              sfn.JsonPath.format('The status of the EC2 instance changed to {} due to the schedule.',
                sfn.JsonPath.stringAt('$.prepare.topic.values.status'),
              ),
              sfn.JsonPath.stringAt('$.prepare.topic.values.account'),
              sfn.JsonPath.stringAt('$.prepare.topic.values.region'),
              sfn.JsonPath.stringAt('$.Target.Identifier'),
              sfn.JsonPath.stringAt('$.prepare.topic.values.status'),
            ),
            // todo: next send slack
            //            SlackJsonMessage: {
            //              attachments: [
            //                {
            //                  color: '#36a64f',
            //                  pretext: sfn.JsonPath.format('{} The status of the RDS {} changed to {} due to the schedule.',
            //                    sfn.JsonPath.stringAt('$.prepare.topic.values.emoji'),
            //                    sfn.JsonPath.stringAt('$.Result.target.type'),
            //                    sfn.JsonPath.stringAt('$.prepare.topic.values.status'),
            //                  ),
            //                  fields: [
            //                    {
            //                      title: 'Account',
            //                      value: sfn.JsonPath.stringAt('$.prepare.topic.values.account'),
            //                      short: true,
            //                    },
            //                    {
            //                      title: 'Region',
            //                      value: sfn.JsonPath.stringAt('$.prepare.topic.values.region'),
            //                      short: true,
            //                    },
            //                    {
            //                      title: 'Type',
            //                      value: sfn.JsonPath.stringAt('$.Result.target.type'),
            //                      short: true,
            //                    },
            //                    {
            //                      title: 'Identifier',
            //                      value: sfn.JsonPath.stringAt('$.Result.target.identifier'),
            //                      short: true,
            //                    },
            //                    {
            //                      title: 'Status',
            //                      value: sfn.JsonPath.stringAt('$.prepare.topic.values.status'),
            //                      short: true,
            //                    },
            //                  ],
            //                },
            //              ],
            //            },
          },
        }).next(new tasks.SnsPublish(scope, 'SendNotification', {
          topic: props.notificationTopic,
          subject: sfn.JsonPath.stringAt('$.Generate.Topic.Subject'),
          message: sfn.TaskInput.fromObject({
            default: sfn.JsonPath.stringAt('$.Generate.Topic.TextMessage'),
            email: sfn.JsonPath.stringAt('$.Generate.Topic.TextMessage'),
            // lambda: sfn.JsonPath.jsonToString(sfn.JsonPath.objectAt('$.Generate.Topic.SlackJsonMessage')),
          }),
          messagePerSubscriptionType: true,
          resultPath: '$.Result.SNS',
        }).next(new sfn.Succeed(scope, 'InstanceStatusChangeSucceed'))));

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

        initStateListDefinition.next(getTargetResources);

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
            prepareTopicValue,
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
            definition: sfn.JsonPath.stringAt('$.definition'),
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

        const targetResourcesExistCheck = new sfn.Choice(scope, 'TargetResourcesExistCheck')
          .when(
            sfn.Condition.numberGreaterThan('$.TargetResourceLength.Length', 0),
            //sfn.Condition.numberGreaterThan(sfn.JsonPath.arrayLength('$.Result.TargetResources'), 0),
            resourceStatusChangingMap,
          )
          .otherwise(new sfn.Succeed(scope, 'TargetResourcesNotFound'));

        getTargetLength.next(targetResourcesExistCheck);

        return sfn.DefinitionBody.fromChainable(initStateListDefinition);
      })(),
    });
  }
}
