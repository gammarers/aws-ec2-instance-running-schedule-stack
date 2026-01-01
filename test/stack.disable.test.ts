import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { EC2InstanceRunningScheduleStack } from '../src';

describe('Ec2InstanceRunningScheduleStack default Testing', () => {

  const app = new App();

  const stack = new EC2InstanceRunningScheduleStack(app, 'EC2InstanceRunningScheduleStack', {
    enabled: false,
    targetResource: {
      tagKey: 'WorkHoursRunning',
      tagValues: ['YES'],
    },
  });

  const template = Template.fromStack(stack);

  it('Should match snapshot', async () => {
    expect(template.toJSON()).toMatchSnapshot('default');
  });

});