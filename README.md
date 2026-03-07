# AWS EC2 Instance Running Scheduler

[![GitHub](https://img.shields.io/github/license/gammarers-aws-cdk-constructs/aws-ec2-instance-running-scheduler?style=flat-square)](https://github.com/gammarers-aws-cdk-constructs/aws-ec2-instance-running-scheduler/blob/main/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/aws-ec2-instance-running-scheduler?style=flat-square)](https://www.npmjs.com/package/aws-ec2-instance-running-scheduler)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/gammarers-aws-cdk-constructs/aws-ec2-instance-running-scheduler/release.yml?branch=main&label=release&style=flat-square)](https://github.com/gammarers-aws-cdk-constructs/aws-ec2-instance-running-scheduler/actions/workflows/release.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/gammarers-aws-cdk-constructs/aws-ec2-instance-running-scheduler?sort=semver&style=flat-square)](https://github.com/gammarers-aws-cdk-constructs/aws-ec2-instance-running-scheduler/releases)

[![View on Construct Hub](https://constructs.dev/badge?package=aws-ec2-instance-running-scheduler)](https://constructs.dev/packages/aws-ec2-instance-running-scheduler)

AWS CDK construct to run EC2 instances on a schedule (start/stop within working hours) using EventBridge Scheduler and a Durable Lambda.

## Features

- **Tag-based targeting** – Select EC2 instances by tag key and values (e.g. `Schedule` / `YES`).
- **EventBridge Scheduler** – Cron-based start and stop schedules with timezone support.
- **Durable Lambda** – Single Lambda with AWS Lambda Durable Execution for reliable, long-running start/stop and polling (no Step Functions).
- **Slack notifications** – Optional Slack messages for run results via Secrets Manager.
- **Scheduling toggle** – Enable or disable scheduling without removing the stack (`enableScheduling`).
- **Configurable schedules** – Separate cron settings for start and stop (minute, hour, week day, timezone).

## Installation

**npm**

```bash
npm install aws-ec2-instance-running-scheduler
```

**yarn**

```bash
yarn add aws-ec2-instance-running-scheduler
```

## Usage

Use the **Construct** `EC2InstanceRunningScheduler` when adding the scheduler into an existing Stack or any CDK scope.

```typescript
import * as cdk from 'aws-cdk-lib';
import { TimeZone } from 'aws-cdk-lib';
import { EC2InstanceRunningScheduler } from 'aws-ec2-instance-running-scheduler';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MyStack');

new EC2InstanceRunningScheduler(stack, 'EC2InstanceRunningScheduler', {
  targetResource: {
    tagKey: 'Schedule',
    tagValues: ['YES'],
  },
  secrets: {
    slackSecretName: 'my-slack-secret',
  },
  startSchedule: {
    timezone: TimeZone.ASIA_TOKYO,
    minute: '55',
    hour: '8',
    week: 'MON-FRI',
  },
  stopSchedule: {
    timezone: TimeZone.ASIA_TOKYO,
    minute: '5',
    hour: '19',
    week: 'MON-FRI',
  },
  enableScheduling: true,
});
```

Use the **Stack** `EC2InstanceRunningScheduleStack` when deploying the scheduler as a standalone stack.

```typescript
import * as cdk from 'aws-cdk-lib';
import { TimeZone } from 'aws-cdk-lib';
import { EC2InstanceRunningScheduleStack } from 'aws-ec2-instance-running-scheduler';

const app = new cdk.App();

new EC2InstanceRunningScheduleStack(app, 'EC2InstanceRunningScheduleStack', {
  targetResource: {
    tagKey: 'Schedule',
    tagValues: ['YES'],
  },
  secrets: {
    slackSecretName: 'my-slack-secret',
  },
  startSchedule: {
    timezone: TimeZone.ASIA_TOKYO,
    minute: '55',
    hour: '8',
    week: 'MON-FRI',
  },
  stopSchedule: {
    timezone: TimeZone.ASIA_TOKYO,
    minute: '5',
    hour: '19',
    week: 'MON-FRI',
  },
  enableScheduling: true,
});
```

## Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `targetResource` | `TargetResource` | Yes | Tag key and values to select EC2 instances. |
| `secrets` | `Secrets` | Yes | Slack secret name in AWS Secrets Manager. |
| `startSchedule` | `Schedule` | No | Cron for starting instances (default: 07:50 MON–FRI UTC). |
| `stopSchedule` | `Schedule` | No | Cron for stopping instances (default: 19:05 MON–FRI UTC). |
| `enableScheduling` | `boolean` | No | Whether schedules are enabled (default: `true`). |

### TargetResource

- `tagKey` – Tag key used to select instances (e.g. `Schedule`).
- `tagValues` – Tag values that match instances to include (e.g. `['YES']`).

### Schedule

- `timezone` – `TimeZone` from `aws-cdk-lib` (e.g. `TimeZone.ASIA_TOKYO`, `TimeZone.ETC_UTC`).
- `minute` – Cron minute (0–59).
- `hour` – Cron hour (0–23).
- `week` – Cron day of week (e.g. `MON-FRI`).

### Secrets

- `slackSecretName` – Name of the Secrets Manager secret containing Slack `token` and `channel` (JSON).

## Requirements

- **Node.js** ≥ 20.0.0
- **AWS CDK** ^2.232.0
- **constructs** ^10.5.1
- **AWS** – EventBridge Scheduler, Lambda (Durable Execution), EC2, Resource Groups Tagging API, Secrets Manager

## License

This project is licensed under the Apache-2.0 License.
