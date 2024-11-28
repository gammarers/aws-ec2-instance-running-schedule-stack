import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { EC2InstanceRunningScheduleStack } from '../src';

describe('Ec2InstanceRunningScheduleStack default Testing', () => {

  const app = new App();

  const stack = new EC2InstanceRunningScheduleStack(app, 'EC2InstanceRunningScheduleStack', {
    targetResource: {
      tagKey: 'WorkHoursRunning',
      tagValues: ['YES'],
    },
  });

  const template = Template.fromStack(stack);

  it('Should have Scheduler 2 exist', async () => {
    template.resourceCountIs('AWS::Scheduler::Schedule', 2);
  });

  it('Should have State Machine 1 exist', async () => {
    template.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  });

  it('Should match snapshot', async () => {
    expect(template.toJSON()).toMatchSnapshot('default');
  });


});