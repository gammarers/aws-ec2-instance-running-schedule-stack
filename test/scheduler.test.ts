import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { Ec2InstanceRunningScheduler } from '../src';

describe('Ec2InstanceRunningScheduler Type=Cluster Testing', () => {

  describe('default schedule', () => {
    const app = new App();
    const stack = new Stack(app, 'TestingStack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });

    new Ec2InstanceRunningScheduler(stack, 'Ec2InstanceRunningScheduler', {
      targets: [
        {
          instances: ['i-0af01c0123456789a', 'i-0af01c0123456789b'],
          startSchedule: {
            timezone: 'UTC',
          },
          stopSchedule: {
            timezone: 'UTC',
          },
        },
      ],
    });

    const template = Template.fromStack(stack);

    // Schedule execution role
    it('Should have schedule execution role', async () => {
      template.hasResourceProperties('AWS::IAM::Role', Match.objectEquals({
        RoleName: Match.stringLikeRegexp('stop-ec2-instance-schedule-.*-exec-role'),
        AssumeRolePolicyDocument: Match.objectEquals({
          Version: '2012-10-17',
          Statement: Match.arrayWith([
            Match.objectEquals({
              Effect: 'Allow',
              Principal: {
                Service: 'scheduler.amazonaws.com',
              },
              Action: 'sts:AssumeRole',
            }),
          ]),
        }),
        Policies: Match.arrayEquals([
          {
            PolicyName: 'ec2-instance-stop-policy',
            PolicyDocument: Match.objectEquals({
              Version: '2012-10-17',
              Statement: [
                Match.objectEquals({
                  Effect: 'Allow',
                  Action: Match.arrayWith([
                    'ec2:StartInstances',
                    'ec2:StopInstances',
                  ]),
                  Resource: 'arn:aws:ec2:*:123456789012:instance/*',
                }),
              ],
            }),
          },
        ]),
      }));
    });

    // Start Schedule testing
    it('Should have Start Schedule', async () => {
      template.hasResourceProperties('AWS::Scheduler::Schedule', Match.objectEquals({
        Name: Match.stringLikeRegexp('auto-start-ec2-instance-.*-schedule'),
        Description: Match.anyValue(),
        State: 'ENABLED',
        FlexibleTimeWindow: {
          Mode: 'OFF',
        },
        ScheduleExpressionTimezone: 'UTC',
        ScheduleExpression: 'cron(50 7 ? * MON-FRI *)',
        Target: Match.objectEquals({
          Arn: 'arn:aws:scheduler:::aws-sdk:ec2:startInstances',
          RoleArn: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('Ec2InstanceRunningSchedulerSchedulerExecutionRole.*'),
              'Arn',
            ],
          },
          Input: JSON.stringify({ InstanceIds: ['i-0af01c0123456789a', 'i-0af01c0123456789b'] }),
          RetryPolicy: {
            MaximumEventAgeInSeconds: 60,
            MaximumRetryAttempts: 0,
          },
        }),
      }));
    });

    // Stop Schedule testing
    it('Should have Stop Schedule', async () => {
      template.hasResourceProperties('AWS::Scheduler::Schedule', Match.objectEquals({
        Name: Match.stringLikeRegexp('auto-stop-ec2-instance-.*-schedule'),
        Description: Match.anyValue(),
        State: 'ENABLED',
        FlexibleTimeWindow: {
          Mode: 'OFF',
        },
        ScheduleExpressionTimezone: 'UTC',
        ScheduleExpression: 'cron(10 21 ? * MON-FRI *)',
        Target: Match.objectEquals({
          Arn: 'arn:aws:scheduler:::aws-sdk:ec2:stopInstances',
          RoleArn: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('Ec2InstanceRunningSchedulerSchedulerExecutionRole.*'),
              'Arn',
            ],
          },
          Input: JSON.stringify({ InstanceIds: ['i-0af01c0123456789a', 'i-0af01c0123456789b'] }),
          RetryPolicy: {
            MaximumEventAgeInSeconds: 60,
            MaximumRetryAttempts: 0,
          },
        }),
      }));
    });

    it('Should match snapshot', async () => {
      expect(template.toJSON()).toMatchSnapshot('default');
    });

  });

  describe('specify schedule', () => {
    const app = new App();
    const stack = new Stack(app, 'TestingStack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });

    new Ec2InstanceRunningScheduler(stack, 'Ec2InstanceRunningScheduler', {
      targets: [
        {
          instances: ['i-0af01c0123456789a', 'i-0af01c0123456789b'],
          startSchedule: {
            timezone: 'Asia/Tokyo',
            minute: '55',
            hour: '8',
            week: 'MON-FRI',
          },
          stopSchedule: {
            timezone: 'Asia/Tokyo',
            minute: '5',
            hour: '19',
            week: 'MON-FRI',
          },
        },
      ],
    });

    const template = Template.fromStack(stack);

    // Start Schedule testing
    it('Should have Start Schedule', async () => {
      template.hasResourceProperties('AWS::Scheduler::Schedule', Match.objectEquals({
        Name: Match.stringLikeRegexp('auto-start-ec2-instance-.*-schedule'),
        Description: Match.anyValue(),
        State: 'ENABLED',
        FlexibleTimeWindow: {
          Mode: 'OFF',
        },
        ScheduleExpressionTimezone: 'Asia/Tokyo',
        ScheduleExpression: 'cron(55 8 ? * MON-FRI *)',
        Target: Match.objectEquals({
          Arn: 'arn:aws:scheduler:::aws-sdk:ec2:startInstances',
          RoleArn: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('Ec2InstanceRunningSchedulerSchedulerExecutionRole.*'),
              'Arn',
            ],
          },
          Input: JSON.stringify({ InstanceIds: ['i-0af01c0123456789a', 'i-0af01c0123456789b'] }),
          RetryPolicy: {
            MaximumEventAgeInSeconds: 60,
            MaximumRetryAttempts: 0,
          },
        }),
      }));
    });

    // Stop Schedule testing
    it('Should have Stop Schedule', async () => {
      template.hasResourceProperties('AWS::Scheduler::Schedule', Match.objectEquals({
        Name: Match.stringLikeRegexp('auto-stop-ec2-instance-.*-schedule'),
        Description: Match.anyValue(),
        State: 'ENABLED',
        FlexibleTimeWindow: {
          Mode: 'OFF',
        },
        ScheduleExpressionTimezone: 'Asia/Tokyo',
        ScheduleExpression: 'cron(5 19 ? * MON-FRI *)',
        Target: Match.objectEquals({
          Arn: 'arn:aws:scheduler:::aws-sdk:ec2:stopInstances',
          RoleArn: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('Ec2InstanceRunningSchedulerSchedulerExecutionRole.*'),
              'Arn',
            ],
          },
          Input: JSON.stringify({ InstanceIds: ['i-0af01c0123456789a', 'i-0af01c0123456789b'] }),
          RetryPolicy: {
            MaximumEventAgeInSeconds: 60,
            MaximumRetryAttempts: 0,
          },
        }),
      }));
    });

    it('Should match snapshot', async () => {
      expect(template.toJSON()).toMatchSnapshot('specify');
    });

  });
});