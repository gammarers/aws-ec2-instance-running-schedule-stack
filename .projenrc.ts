import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  authorOrganization: true,
  cdkVersion: '2.80.0',
  constructsVersion: '10.0.5',
  typescriptVersion: '5.1.x',
  jsiiVersion: '5.1.0',
  defaultReleaseBranch: 'main',
  name: '@gammarer/aws-ec2-instance-running-scheduler',
  description: 'AWS EC2 Instance Running Scheduler',
  keywords: ['aws', 'cdk', 'aws-cdk', 'auto', 'running', 'scheduler', 'ec2', 'instance'],
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarer/aws-ec2-instance-running-scheduler.git',
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  majorVersion: 1,
  minNodeVersion: '16.0.0',
  workflowNodeVersion: '20.11.x',
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
  publishToMaven: {
    mavenGroupId: 'com.gammarer',
    javaPackage: 'com.gammarer.cdk.aws.ec2_instance_running_scheduler',
    mavenArtifactId: 'aws-ec2-instance-running-scheduler',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
  },
  publishToNuget: {
    dotNetNamespace: 'Gammarer.CDK.AWS',
    packageId: 'Gammarer.CDK.AWS.Ec2InstanceRunningScheduler',
  },
});
project.synth();
