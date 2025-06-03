---
outline: deep
prev:
  text: "Message 消息提示"
  link: "/md/components/message"
next:
  text: "Switch 开关"
  link: "/md/components/switch"
---

# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

<preview path="../../demo/Input/Basic.vue" title="基础用法" description="Input 组件基础用法"></preview>

## 禁用状态

通过 disabled 属性指定是否禁用 input 组件

<preview path="../../demo/Input/Disabled.vue" title="禁用状态" description="Input 禁用状态"></preview>

## 一键清空

使用clearable属性即可得到一个可一键清空的输入框

<preview path="../../demo/Input/Clear.vue" title="一键清空" description="Input 一键清空"></preview>

## 密码框

使用 show-password 属性即可得到一个可切换显示隐藏的密码框

<preview path="../../demo/Input/Password.vue" title="密码框" description="Input 密码框" ></preview>

## 带图标的输入框

可以在输入框中前置或后置一个元素，通常是标签或按钮。

<preview path="../../demo/Input/Iconinput.vue" title="带图标的输入框" description="Input 带图标的输入框"></preview>

## 复合型输入框

可以在输入框中前置或后置一个元素，通常是标签或按钮。

<preview path="../../demo/Input/Slotsinput.vue" title="复合型输入框" description="Input 复合型输入框"></preview>

## 文本域

用于输入多行文本信息可缩放的输入框。 添加 type="textarea" 属性来将 input 元素转换为原生的 textarea 元素。

<preview path="../../demo/Input/Textarea.vue" title="文本域" description="Input 文本域"></preview>

## 尺寸

使用 size 属性改变输入框大小。 除了默认大小外，还有另外两个选项： large, small。

<preview path="../../demo/Input/Size.vue" title="尺寸" description="Input 尺寸"></preview>

## API

### Attributes

| 属性名        | 说明                                                           | 类型                                                                                                      | 默认值 |
| :------------ | :------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- | :----- |
| type          | 类型                                                           | `string` 等[原生 input 类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form__types) | text   |
| v-model       | 绑定值                                                         | `string` / `number`                                                                                       | —      |
| disabled      | 是否禁用                                                       | `boolean`                                                                                                 | false  |
| size          | 输入框尺寸，只在 `type` 不为 'textarea' 时有效                 | small / large                                                                                             | —      |
| autocomplete  | 原生 `autocomplete` 属性                                       | `string`                                                                                                  | off    |
| placeholder   | 输入框占位文本                                                 | `string`                                                                                                  | —      |
| clearable     | 是否显示清除按钮，只有当 `type` 不是 textarea时生效            | `boolean`                                                                                                 | false  |
| autofocus     | 原生属性，自动获取焦点                                         | `boolean`                                                                                                 | false  |
| parser        | 指定从格式化器输入中提取的值。(仅当 `type` 是"text"时才起作用) | `Function`                                                                                                | —      |
| show-password | 是否显示切换密码图标                                           | `boolean`                                                                                                 | false  |
| form          | 原生属性                                                       | `string`                                                                                                  | —      |
| readonly      | 只读属性                                                       | `boolean`                                                                                                 | false  |

### Events

| 事件名 | 说明                                                        | 类型       |
| :----- | :---------------------------------------------------------- | :--------- |
| blur   | 当选择器的输入框失去焦点时触发                              | `Function` |
| focus  | 当选择器的输入框获得焦点时触发                              | `Function` |
| change | 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发 | `Function` |
| input  | 在 Input 值改变时触发                                       | `Function` |
| clear  | 在点击由 `clearable` 属性生成的清空按钮时触发               | `Function` |

### Slots

| 插槽名  | 说明                                          |
| :------ | :-------------------------------------------- |
| prefix  | 输入框头部内容，只对非 `type="textarea"` 有效 |
| suffix  | 输入框尾部内容，只对非 `type="textarea"` 有效 |
| prepend | 输入框前置内容，只对非 `type="textarea"` 有效 |
| append  | 输入框后置内容，只对非 `type="textarea"` 有效 |

### Exposes

| 名称 | 说明                       | 类型     |
| :--- | :------------------------- | :------- |
| ref  | HTML元素 input 或 textarea | `object` |
