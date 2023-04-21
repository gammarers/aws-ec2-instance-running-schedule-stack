# AWS EC2 Instance Running Scheduler

This is an AWS CDK Construct to make EC2 instance running schedule (only running while working hours(start/stop)).

## Fixed

- EC2 Instance

## Resources

This construct creating resource list.

- EventBridge Scheduler execution role
- EventBridge Scheduler

## Install

### TypeScript

```shell
npm install @yicr/aws-ec2-instance-running-scheduler
```
or
```shell
yarn add @yicr/aws-ec2-instance-running-scheduler
```

## Example

```shell
npm install @yicr/aws-ec2-instance-running-scheduler
```

```typescript
import { Ec2InstanceRunningScheduler } from '@yicr/aws-ec2-instance-running-scheduler';

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

```

## License

This project is licensed under the Apache-2.0 License.




# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Ec2InstanceRunningScheduler <a name="Ec2InstanceRunningScheduler" id="@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler"></a>

#### Initializers <a name="Initializers" id="@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.Initializer"></a>

```typescript
import { Ec2InstanceRunningScheduler } from '@yicr/aws-ec2-instance-running-scheduler'

new Ec2InstanceRunningScheduler(scope: Construct, id: string, props: Ec2InstanceRunningSchedulerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.Initializer.parameter.props">props</a></code> | <code><a href="#@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningSchedulerProps">Ec2InstanceRunningSchedulerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.Initializer.parameter.props"></a>

- *Type:* <a href="#@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningSchedulerProps">Ec2InstanceRunningSchedulerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.isConstruct"></a>

```typescript
import { Ec2InstanceRunningScheduler } from '@yicr/aws-ec2-instance-running-scheduler'

Ec2InstanceRunningScheduler.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningScheduler.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### Ec2InstanceRunningSchedulerProps <a name="Ec2InstanceRunningSchedulerProps" id="@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningSchedulerProps"></a>

#### Initializer <a name="Initializer" id="@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningSchedulerProps.Initializer"></a>

```typescript
import { Ec2InstanceRunningSchedulerProps } from '@yicr/aws-ec2-instance-running-scheduler'

const ec2InstanceRunningSchedulerProps: Ec2InstanceRunningSchedulerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningSchedulerProps.property.targets">targets</a></code> | <code><a href="#@yicr/aws-ec2-instance-running-scheduler.TargetsProperty">TargetsProperty</a>[]</code> | *No description.* |

---

##### `targets`<sup>Required</sup> <a name="targets" id="@yicr/aws-ec2-instance-running-scheduler.Ec2InstanceRunningSchedulerProps.property.targets"></a>

```typescript
public readonly targets: TargetsProperty[];
```

- *Type:* <a href="#@yicr/aws-ec2-instance-running-scheduler.TargetsProperty">TargetsProperty</a>[]

---

### ScheduleProperty <a name="ScheduleProperty" id="@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty"></a>

#### Initializer <a name="Initializer" id="@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty.Initializer"></a>

```typescript
import { ScheduleProperty } from '@yicr/aws-ec2-instance-running-scheduler'

const scheduleProperty: ScheduleProperty = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty.property.timezone">timezone</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty.property.hour">hour</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty.property.minute">minute</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty.property.week">week</a></code> | <code>string</code> | *No description.* |

---

##### `timezone`<sup>Required</sup> <a name="timezone" id="@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty.property.timezone"></a>

```typescript
public readonly timezone: string;
```

- *Type:* string

---

##### `hour`<sup>Optional</sup> <a name="hour" id="@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty.property.hour"></a>

```typescript
public readonly hour: string;
```

- *Type:* string

---

##### `minute`<sup>Optional</sup> <a name="minute" id="@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty.property.minute"></a>

```typescript
public readonly minute: string;
```

- *Type:* string

---

##### `week`<sup>Optional</sup> <a name="week" id="@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty.property.week"></a>

```typescript
public readonly week: string;
```

- *Type:* string

---

### TargetsProperty <a name="TargetsProperty" id="@yicr/aws-ec2-instance-running-scheduler.TargetsProperty"></a>

#### Initializer <a name="Initializer" id="@yicr/aws-ec2-instance-running-scheduler.TargetsProperty.Initializer"></a>

```typescript
import { TargetsProperty } from '@yicr/aws-ec2-instance-running-scheduler'

const targetsProperty: TargetsProperty = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.TargetsProperty.property.instances">instances</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.TargetsProperty.property.startSchedule">startSchedule</a></code> | <code><a href="#@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty">ScheduleProperty</a></code> | *No description.* |
| <code><a href="#@yicr/aws-ec2-instance-running-scheduler.TargetsProperty.property.stopSchedule">stopSchedule</a></code> | <code><a href="#@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty">ScheduleProperty</a></code> | *No description.* |

---

##### `instances`<sup>Required</sup> <a name="instances" id="@yicr/aws-ec2-instance-running-scheduler.TargetsProperty.property.instances"></a>

```typescript
public readonly instances: string[];
```

- *Type:* string[]

---

##### `startSchedule`<sup>Required</sup> <a name="startSchedule" id="@yicr/aws-ec2-instance-running-scheduler.TargetsProperty.property.startSchedule"></a>

```typescript
public readonly startSchedule: ScheduleProperty;
```

- *Type:* <a href="#@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty">ScheduleProperty</a>

---

##### `stopSchedule`<sup>Required</sup> <a name="stopSchedule" id="@yicr/aws-ec2-instance-running-scheduler.TargetsProperty.property.stopSchedule"></a>

```typescript
public readonly stopSchedule: ScheduleProperty;
```

- *Type:* <a href="#@yicr/aws-ec2-instance-running-scheduler.ScheduleProperty">ScheduleProperty</a>

---



