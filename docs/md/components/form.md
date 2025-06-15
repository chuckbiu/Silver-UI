---
outline: deep
prev:
  text: "Select 选择器"
  link: "/md/components/select"
next:
  text: "正在开发 敬请期待 ！！！"
#   link: "/md/components/tooltip"
---

# Form 表单

表单包含 输入框, 单选框, 下拉选择, 多选框 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。

## 典型表单

最基础的表单包括各种输入表单项，比如input、select等。

在每一个 form 组件中，你需要一个 form-item 字段作为输入项的容器，用于获取值与验证值。

<preview path="../../demo/Form/Basic.vue" title="基础用法" description="Form 组件基础用法"></preview>

## 表单校验

Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。
<preview path="../../demo/Form/Validator.vue" title="基础用法" description="Form 组件基础用法"></preview>

## 确认密码

<preview path="../../demo/Form/Confirm.vue" title="基础用法" description="Form 组件基础用法"></preview>

## Form API

### Form Attributes

| 属性名 | 说明         | 类型     | 默认值 |
| :----- | :----------- | :------- | :----- |
| model  | 表单数据对象 | `object` | —      |
| rules  | 表单验证规则 | `object` | —      |

### Form Events

| 名称     | 说明                   | 类型       |
| :------- | :--------------------- | :--------- |
| validate | 任一表单项被校验后触发 | `Function` |

### Form Slots

| 事件名  | 说明           | 子标签   |
| :------ | :------------- | :------- |
| default | 自定义默认内容 | FormItem |

### Form Exposes

| 名称          | 说明                                                         | 类型       |
| :------------ | :----------------------------------------------------------- | :--------- |
| validate      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise`。 | `Function` |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果             | `Function` |
| clearValidate | 清理某个字段的表单验证信息。                                 | `Function` |

## FormItem API

### FormItem Attributes

| 属性名 | 说明                                                         | 类型                  | Default |
| :----- | :----------------------------------------------------------- | :-------------------- | :------ |
| prop   | `model` 的键名。 它可以是一个属性的值(如 `a.b.0` 或 `['a', 'b', '0']`)。 在使用了 `validate`、`resetFields` 的方法时，该属性是必填的。 | `string` / `string[]` | —       |
| rules  | 表单验证规则, 更多内容可以参考[async-validator](https://github.com/yiminghe/async-validator) | `object`              |         |

**FormItemRule**

| 名称    | 说明               | 类型   | 默认值 |
| :------ | :----------------- | :----- | :----- |
| trigger | 验证逻辑的触发方式 | `enum` | —      |

### FormItem Exposes

| 名称          | 说明                                                 | 类型                  |
| :------------ | :--------------------------------------------------- | :-------------------- |
| prop          | 传入值                                               | `string` / `string[]` |
| validate      | 验证表单项                                           | `Function`            |
| resetField    | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | `Function`            |
| clearValidate | 移除该表单项的校验结果                               | `Function`            |