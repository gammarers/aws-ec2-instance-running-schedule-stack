import { App, Duration } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { EC2InstanceRunningScheduleStack, EC2InstanceRunningScheduleStackMachineLogLevel } from '../src';

describe('Ec2InstanceRunningScheduleStack specific Testing', () => {

  const app = new App();

  const stack = new EC2InstanceRunningScheduleStack(app, 'EC2InstanceRunningScheduleStack', {
    enabled: true,
    targetResource: {
      tagKey: 'WorkHoursRunning',
      tagValues: ['YES'],
    },
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
    notifications: {
      emails: [
        'foo@example.com',
        'bar@example.net',
      ],
    },
    timeout: {
      stateMachineTimeout: Duration.minutes(30),
    },
    logOption: {
      machineLogLevel: EC2InstanceRunningScheduleStackMachineLogLevel.ALL,
    },
  });

  const template = Template.fromStack(stack);

  it('Should have Scheduler 2 exist', async () => {
    template.resourceCountIs('AWS::Scheduler::Schedule', 2);
  });

  it('Should have Start Scheduler exist', async () => {
    template.hasResourceProperties('AWS::Scheduler::Schedule', {
      ScheduleExpression: 'cron(55 8 ? * MON-FRI *)',
      ScheduleExpressionTimezone: 'Asia/Tokyo',
    });
  });
  it('Should have Stop Scheduler exist', async () => {
    template.hasResourceProperties('AWS::Scheduler::Schedule', {
      ScheduleExpression: 'cron(5 19 ? * MON-FRI *)',
      ScheduleExpressionTimezone: 'Asia/Tokyo',
    });
  });

  it('Should have State Machine 1 exist', async () => {
    template.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  });

  it('Should match snapshot', async () => {
    expect(template.toJSON()).toMatchSnapshot('default');
  });


});