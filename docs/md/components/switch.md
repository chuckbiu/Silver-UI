# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 v-model 到一个 Boolean 类型的变量。

<preview path="../../demo/Switch/Basic.vue" title="基础用法" description="Switch 基础用法"></preview>

## 尺寸

<preview path="../../demo/Switch/Size.vue" title="尺寸" description="Switch 尺寸"></preview>

## 文字描述

使用active-text属性与inactive-text属性来设置开关的文字描述。

<preview path="../../demo/Switch/Text.vue" title="文字描述" description="Switch 文字描述"></preview>

## 扩展的 value 类型

你可以设置 active-value 和 inactive-value 属性， 它们接受 Boolean、String 或 Number 类型的值。

<preview path="../../demo/Switch/Expand.vue" title="扩展的 value 类型" description="Switch 扩展的 value 类型"></preview>

## 禁用状态

设置disabled属性，接受一个Boolean，设置true即可禁用。

<preview path="../../demo/Switch/Disabled.vue" title="禁用状态" description="Switch 禁用状态"></preview>

## API

### Attributes

| 属性名         | 说明                                                         | 类型                            | Default |
| :------------- | :----------------------------------------------------------- | :------------------------------ | :------ |
| v-model        | 绑定值，必须等于 `active-value` 或 `inactive-value`，默认为 `Boolean` 类型 | `boolean` / `string` / `number` | false   |
| disabled       | 是否禁用                                                     | `boolean`                       | false   |
| size           | switch 的大小                                                | small / large                   | —       |
| active-text    | switch 打开时的文字描述                                      | `string`                        | ''      |
| inactive-text  | switch 的状态为 `off` 时的文字描述                           | `string`                        | ''      |
| active-value   | switch 状态为 `on` 时的值                                    | `boolean` / `string` / `number` | true    |
| inactive-value | switch的状态为 `off` 时的值                                  | `boolean` / `string` / `number` | false   |

### 事件

| 事件名 | 说明                            | Type       |
| :----- | :------------------------------ | :--------- |
| change | switch 状态发生变化时的回调函数 | `Function` |