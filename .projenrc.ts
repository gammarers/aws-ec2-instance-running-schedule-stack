import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.62.0',
  defaultReleaseBranch: 'main',
  name: '@yicr/aws-ec2-running-scheduler',
  description: 'AWS EC2 Running Scheduler',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/yicr/aws-ec2-running-scheduler.git',
  releaseToNpm: false,
});
project.synth();
