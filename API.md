# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### EC2InstanceRunningScheduleStack <a name="EC2InstanceRunningScheduleStack" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack"></a>

#### Initializers <a name="Initializers" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.Initializer"></a>

```typescript
import { EC2InstanceRunningScheduleStack } from '@gammarers/aws-ec2-instance-running-schedule-stack'

new EC2InstanceRunningScheduleStack(scope: Construct, id: string, props: EC2InstanceRunningScheduleStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.Initializer.parameter.props">props</a></code> | <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps">EC2InstanceRunningScheduleStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps">EC2InstanceRunningScheduleStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |

---

##### `toString` <a name="toString" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.isConstruct"></a>

```typescript
import { EC2InstanceRunningScheduleStack } from '@gammarers/aws-ec2-instance-running-schedule-stack'

EC2InstanceRunningScheduleStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.isStack"></a>

```typescript
import { EC2InstanceRunningScheduleStack } from '@gammarers/aws-ec2-instance-running-schedule-stack'

EC2InstanceRunningScheduleStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.of"></a>

```typescript
import { EC2InstanceRunningScheduleStack } from '@gammarers/aws-ec2-instance-running-schedule-stack'

EC2InstanceRunningScheduleStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |

---

##### `node`<sup>Required</sup> <a name="node" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---


## Structs <a name="Structs" id="Structs"></a>

### EC2InstanceRunningScheduleStackProps <a name="EC2InstanceRunningScheduleStackProps" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps"></a>

#### Initializer <a name="Initializer" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.Initializer"></a>

```typescript
import { EC2InstanceRunningScheduleStackProps } from '@gammarers/aws-ec2-instance-running-schedule-stack'

const eC2InstanceRunningScheduleStackProps: EC2InstanceRunningScheduleStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.property.targetResource">targetResource</a></code> | <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.TargetResource">TargetResource</a></code> | *No description.* |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.property.logOption">logOption</a></code> | <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.LogOption">LogOption</a></code> | *No description.* |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.property.notifications">notifications</a></code> | <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Notifications">Notifications</a></code> | *No description.* |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.property.startSchedule">startSchedule</a></code> | <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Schedule">Schedule</a></code> | *No description.* |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.property.stopSchedule">stopSchedule</a></code> | <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Schedule">Schedule</a></code> | *No description.* |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.property.timeout">timeout</a></code> | <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Timeout">Timeout</a></code> | *No description.* |

---

##### `targetResource`<sup>Required</sup> <a name="targetResource" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.property.targetResource"></a>

```typescript
public readonly targetResource: TargetResource;
```

- *Type:* <a href="#@gammarers/aws-ec2-instance-running-schedule-stack.TargetResource">TargetResource</a>

---

##### `logOption`<sup>Optional</sup> <a name="logOption" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.property.logOption"></a>

```typescript
public readonly logOption: LogOption;
```

- *Type:* <a href="#@gammarers/aws-ec2-instance-running-schedule-stack.LogOption">LogOption</a>

---

##### `notifications`<sup>Optional</sup> <a name="notifications" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.property.notifications"></a>

```typescript
public readonly notifications: Notifications;
```

- *Type:* <a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Notifications">Notifications</a>

---

##### `startSchedule`<sup>Optional</sup> <a name="startSchedule" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.property.startSchedule"></a>

```typescript
public readonly startSchedule: Schedule;
```

- *Type:* <a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Schedule">Schedule</a>

---

##### `stopSchedule`<sup>Optional</sup> <a name="stopSchedule" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.property.stopSchedule"></a>

```typescript
public readonly stopSchedule: Schedule;
```

- *Type:* <a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Schedule">Schedule</a>

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@gammarers/aws-ec2-instance-running-schedule-stack.EC2InstanceRunningScheduleStackProps.property.timeout"></a>

```typescript
public readonly timeout: Timeout;
```

- *Type:* <a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Timeout">Timeout</a>

---

### LogOption <a name="LogOption" id="@gammarers/aws-ec2-instance-running-schedule-stack.LogOption"></a>

#### Initializer <a name="Initializer" id="@gammarers/aws-ec2-instance-running-schedule-stack.LogOption.Initializer"></a>

```typescript
import { LogOption } from '@gammarers/aws-ec2-instance-running-schedule-stack'

const logOption: LogOption = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.LogOption.property.machineLogLevel">machineLogLevel</a></code> | <code>aws-cdk-lib.aws_stepfunctions.LogLevel</code> | *No description.* |

---

##### `machineLogLevel`<sup>Optional</sup> <a name="machineLogLevel" id="@gammarers/aws-ec2-instance-running-schedule-stack.LogOption.property.machineLogLevel"></a>

```typescript
public readonly machineLogLevel: LogLevel;
```

- *Type:* aws-cdk-lib.aws_stepfunctions.LogLevel

---

### Notifications <a name="Notifications" id="@gammarers/aws-ec2-instance-running-schedule-stack.Notifications"></a>

#### Initializer <a name="Initializer" id="@gammarers/aws-ec2-instance-running-schedule-stack.Notifications.Initializer"></a>

```typescript
import { Notifications } from '@gammarers/aws-ec2-instance-running-schedule-stack'

const notifications: Notifications = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Notifications.property.emails">emails</a></code> | <code>string[]</code> | *No description.* |

---

##### `emails`<sup>Optional</sup> <a name="emails" id="@gammarers/aws-ec2-instance-running-schedule-stack.Notifications.property.emails"></a>

```typescript
public readonly emails: string[];
```

- *Type:* string[]

---

### Schedule <a name="Schedule" id="@gammarers/aws-ec2-instance-running-schedule-stack.Schedule"></a>

#### Initializer <a name="Initializer" id="@gammarers/aws-ec2-instance-running-schedule-stack.Schedule.Initializer"></a>

```typescript
import { Schedule } from '@gammarers/aws-ec2-instance-running-schedule-stack'

const schedule: Schedule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Schedule.property.timezone">timezone</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Schedule.property.hour">hour</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Schedule.property.minute">minute</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Schedule.property.week">week</a></code> | <code>string</code> | *No description.* |

---

##### `timezone`<sup>Required</sup> <a name="timezone" id="@gammarers/aws-ec2-instance-running-schedule-stack.Schedule.property.timezone"></a>

```typescript
public readonly timezone: string;
```

- *Type:* string

---

##### `hour`<sup>Optional</sup> <a name="hour" id="@gammarers/aws-ec2-instance-running-schedule-stack.Schedule.property.hour"></a>

```typescript
public readonly hour: string;
```

- *Type:* string

---

##### `minute`<sup>Optional</sup> <a name="minute" id="@gammarers/aws-ec2-instance-running-schedule-stack.Schedule.property.minute"></a>

```typescript
public readonly minute: string;
```

- *Type:* string

---

##### `week`<sup>Optional</sup> <a name="week" id="@gammarers/aws-ec2-instance-running-schedule-stack.Schedule.property.week"></a>

```typescript
public readonly week: string;
```

- *Type:* string

---

### TargetResource <a name="TargetResource" id="@gammarers/aws-ec2-instance-running-schedule-stack.TargetResource"></a>

#### Initializer <a name="Initializer" id="@gammarers/aws-ec2-instance-running-schedule-stack.TargetResource.Initializer"></a>

```typescript
import { TargetResource } from '@gammarers/aws-ec2-instance-running-schedule-stack'

const targetResource: TargetResource = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.TargetResource.property.tagKey">tagKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.TargetResource.property.tagValues">tagValues</a></code> | <code>string[]</code> | *No description.* |

---

##### `tagKey`<sup>Required</sup> <a name="tagKey" id="@gammarers/aws-ec2-instance-running-schedule-stack.TargetResource.property.tagKey"></a>

```typescript
public readonly tagKey: string;
```

- *Type:* string

---

##### `tagValues`<sup>Required</sup> <a name="tagValues" id="@gammarers/aws-ec2-instance-running-schedule-stack.TargetResource.property.tagValues"></a>

```typescript
public readonly tagValues: string[];
```

- *Type:* string[]

---

### Timeout <a name="Timeout" id="@gammarers/aws-ec2-instance-running-schedule-stack.Timeout"></a>

#### Initializer <a name="Initializer" id="@gammarers/aws-ec2-instance-running-schedule-stack.Timeout.Initializer"></a>

```typescript
import { Timeout } from '@gammarers/aws-ec2-instance-running-schedule-stack'

const timeout: Timeout = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-ec2-instance-running-schedule-stack.Timeout.property.stateMachineTimeout">stateMachineTimeout</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |

---

##### `stateMachineTimeout`<sup>Optional</sup> <a name="stateMachineTimeout" id="@gammarers/aws-ec2-instance-running-schedule-stack.Timeout.property.stateMachineTimeout"></a>

```typescript
public readonly stateMachineTimeout: Duration;
```

- *Type:* aws-cdk-lib.Duration

---



