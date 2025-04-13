---
outline: deep
---

# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`plain`、`round` 来定义按钮的样式。

<preview path="../../demo/Button/Basic.vue" title="基础用法" description="Button 组件基础用法"></preview>

## 禁用状态

你可以使用 disabled 属性来定义按钮是否被禁用。
使用 disabled 属性来控制按钮是否为禁用状态。 该属性接受一个 Boolean 类型的值。

<preview path="../../demo/Button/Disabled.vue" title="基础用法" description="Button 组件基础用法"></preview>

## 不同尺寸

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

使用 size 属性额外配置尺寸，可使用 large和small两种值。

<preview path="../../demo/Button/Size.vue" title="基础用法" description="Button 组件基础用法"></preview>

## 加载状态

点击按钮后进行数据加载操作，在按钮上显示加载状态。

<preview path="../../demo/Button/Loading.vue" title="加载状态" description="Button 加载状态"></preview>

## 自动获取焦点

使用 `autofocus` 属性来设置按钮自动获取焦点。

<preview path="../../demo/Button/Autofocus.vue" title="自动获取焦点" description="Button 自动获取焦点"></preview>

## API

### 属性

| 属性名     | 说明             | 类型      | 可选值                               | 默认值 |
| ---------- | ---------------- | --------- | ------------------------------------ | ------ |
| type       | 按钮类型         | `string`  | primary / success / warning / danger | —      |
| size       | 按钮尺寸         | `string`  | large / small                        | —      |
| plain      | 是否为朴素按钮   | `boolean` | —                                    | false  |
| round      | 是否为圆角按钮   | `boolean` | —                                    | false  |
| disabled   | 是否禁用         | `boolean` | —                                    | false  |
| loading    | 是否加载中状态   | `boolean` | —                                    | false  |
| autofocus  | 是否自动获取焦点 | `boolean` | —                                    | false  |
| nativeType | 原生 type 属性   | `string`  | button / submit / reset              | button |

### 插槽

| 插槽名  | 说明       |
| ------- | ---------- |
| default | 按钮的内容 |

### 事件

| 事件名 | 说明           | 参数                |
| ------ | -------------- | ------------------- |
| click  | 点击按钮时触发 | (event: MouseEvent) |
