import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  authorOrganization: true,
  cdkVersion: '2.120.0',
  typescriptVersion: '5.5.x',
  jsiiVersion: '5.5.x',
  defaultReleaseBranch: 'main',
  name: '@gammarers/aws-ec2-instance-running-schedule-stack',
  description: 'AWS EC2 Instance Running Scheduler',
  keywords: ['aws', 'cdk', 'aws-cdk', 'auto', 'running', 'scheduler', 'ec2', 'instance'],
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers/aws-ec2-instance-running-schedule-stack.git',
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  majorVersion: 2,
  minNodeVersion: '16.0.0',
  workflowNodeVersion: '22.4.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['0 16 * * 3']), // every wednesday 16:00 (JST/THU:0100)
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
  publishToPypi: {
    distName: 'gammarer.aws-ec2-instance-running-scheduler',
    module: 'gammarer.aws_ec2_instance_running_scheduler',
  },
  publishToNuget: {
    dotNetNamespace: 'Gammarer.CDK.AWS',
    packageId: 'Gammarer.CDK.AWS.Ec2InstanceRunningScheduler',
  },
});
project.synth();
