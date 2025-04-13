# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

使用 content 属性来决定 hover 时的提示信息。 由 placement 属性决定展示效果： placement属性值为：[方向]-[对齐位置]；四个方向：top、left、right、bottom；三种对齐位置：start, end，默认为空。 如 placement="left-end"，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

<preview path="../../demo/Tooltip/Basic.vue" title="基础用法" description="Tooltip 组件基础用法"></preview>

## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式

用具名 slot content，替代tooltip中的content属性。

<preview path="../../demo/Tooltip/Content.vue" title="更多内容的文字提示" description="Tooltip 更多内容的文字提示"></preview>

## 支持点击触发

<preview path="../../demo/Tooltip/Trigger.vue" title="支持点击触发" description="Tooltip 支持点击触发"></preview>

## 支持手动触发

<preview path="../../demo/Tooltip/Manual.vue" title="支持手动触发" description="Tooltip 支持手动触发"></preview>

## API

### Attributes

| 名称           | 说明                                             | 类型                                                         | 默认值 |
| :------------- | :----------------------------------------------- | :----------------------------------------------------------- | :----- |
| content        | 显示的内容，也可被 `slot#content` 覆盖           | `string`                                                     | ''     |
| placement      | Tooltip 组件出现的位置                           | `enum`                                                       | bottom |
| disabled       | Tooltip 组件是否禁用                             | `boolean`                                                    | false  |
| popper-options | [popper.js](https://popper.js.org/docs/v2/) 参数 | `object` 请参考 [popper.js](https://popper.js.org/docs/v2/) 文档 | {}     |
| open-delay     | 在触发后多久显示内容，单位毫秒                   | `number`                                                     | 200    |
| close-delay    | 延迟关闭，单位毫秒                               | `number`                                                     | 200    |
| trigger        | 如何触发 Tooltip                                 | `hover` | `click`                                            | hover  |
| manual         | 是否手动触发                                     | `boolean`                                                    | false  |

### Slots

| 插槽名  | 说明                      |
| :------ | :------------------------ |
| default | Tooltip 触发 & 引用的元素 |
| content | 自定义内容                |

### Exposes

| 名称       | 详情                             | 类型       |
| :--------- | :------------------------------- | :--------- |
| contentRef | si-tooltip 组件实例      | `object`   |
| show       | show方法控制 si-tooltip 显示状态 | `Function` |
| hide       | hide方法控制 si-tooltip 显示状态 | `Function` |