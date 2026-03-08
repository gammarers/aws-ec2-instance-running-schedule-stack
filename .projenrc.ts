import { awscdk, javascript, github } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  authorOrganization: true,
  cdkVersion: '2.232.0',
  typescriptVersion: '5.9.x',
  jsiiVersion: '5.9.x',
  defaultReleaseBranch: 'main',
  name: 'aws-ec2-instance-running-scheduler',
  description: 'AWS CDK construct to run EC2 instances on a schedule (start/stop within working hours) using EventBridge Scheduler and a Durable Lambda.',
  keywords: ['aws', 'cdk', 'aws-cdk', 'auto', 'running', 'scheduler', 'ec2', 'instance'],
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers-aws-cdk-constructs/aws-ec2-instance-running-scheduler.git',
  devDeps: [
    '@aws/durable-execution-sdk-js@^1',
    '@aws-sdk/client-ec2@^3',
    '@aws-sdk/client-resource-groups-tagging-api@^3',
    '@slack/web-api@^6',
    '@types/aws-lambda@^8',
    'aws-lambda-secret-fetcher@^0.3',
    'aws-sdk-client-mock@^2',
    'aws-sdk-client-mock-jest@^2',
  ],
  mergify: true,
  npmTrustedPublishing: true,
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  majorVersion: 3,
  minNodeVersion: '20.0.0',
  workflowNodeVersion: '24.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.WEEKLY,
    },
  },
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp({
      permissions: {
        pullRequests: github.workflows.AppPermission.WRITE,
        contents: github.workflows.AppPermission.WRITE,
      },
    }),
  },
  autoApproveOptions: {
    allowedUsernames: [
      'gammarers-projen-upgrade-bot[bot]',
      'yicr',
    ],
  },
  // publishToPypi: {
  //   distName: 'gammarers.aws-ec2-instance-running-schedule-stack',
  //   module: 'gammarers.aws_ec2_instance_running_schedule_stack',
  // },
  // publishToNuget: {
  //   dotNetNamespace: 'Gammarers.CDK.AWS',
  //   packageId: 'Gammarers.CDK.AWS.EC2InstanceRunningScheduleStack',
  // },
});
project.addPackageIgnore('/.devcontainer/');
project.synth();
