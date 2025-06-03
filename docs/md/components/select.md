---
outline: deep
prev:
  text: "Switch 开关"
  link: "/md/components/switch"
next:
  text: "正在开发 敬请期待 ！！！"
#   link: "/md/components/tooltip"
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选 v-model 的值为当前被选中的 options 的 value 属性值

<preview path="../../demo/Select/Basic.vue" title="基础用法" description="Select 组件基础用法"></preview>

## 有禁用选项

在 options 中，设定 disabled 值为 true，即可禁用该选项

<preview path="../../demo/Select/Disableoption.vue" title="有禁用选项" description="Select 有禁用选项"></preview>

## 禁用状态

禁用整个选择器组件

为 SiSelect 设置 disabled属性，则整个选择器不可用。

<preview path="../../demo/Select/Disabled.vue" title="禁用状态" description="Select 禁用状态"></preview>

## 可清空单选

您可以使用清除图标来清除选择。

为 SiSelect 设置 clearable 属性，则可将选择器清空

<preview path="../../demo/Select/Clearable.vue" title="禁用状态" description="Select 禁用状态"></preview>

## 筛选选项

可以利用筛选功能快速查找选项。

为SiSelect添加filterable属性即可启用搜索功能。 默认情况下，SiSelect 会找出所有 label 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 filter-method 来实现。 filter-method 为一个 Function，它会在输入值发生变化时调用，参数为当前输入值。

<preview path="../../demo/Select/Filter.vue" title="筛选选项" description="Select 筛选选项"></preview>

## 远程搜索

输入关键字以从远程服务器中查找数据。

从服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将filterable和remote设置为true，同时传入一个remote-method。 remote-method为一个Function，它会在输入值发生变化时调用，参数为当前输入值。 需要注意的是，如果 el-option 是通过 v-for 指令渲染出来的，此时需要为 el-option 添加 key 属性， 且其值需具有唯一性，比如这个例子中的 item.value。

<preview path="../../demo/Select/Remote.vue" title="远程搜索" description="Select 远程搜索"></preview>

## Select API

### Select Attributes

| 属性名                | 说明                           | 类型       | Default |
| :-------------------- | :----------------------------- | :--------- | :------ |
| model-value / v-model | 选中项绑定值                   | `string`   | —       |
| placeholder           | 占位符，默认为“请选择”         | `string`   | —       |
| disabled              | 是否禁用                       | `boolean`  | false   |
| renderLabel           | 自定义模板                     | `VNode`    | —       |
| remote                | 其中的选项是否从服务器远程加载 | `boolean`  | false   |
| clearable             | 是否可以清空选项               | `boolean`  | false   |
| filter-method         | 自定义筛选方法                 | `Function` | —       |
| size                  | 输入框尺寸                     | `string`   | —       |

### Select Events

| 事件名         | 说明                                     | Type       |
| :------------- | :--------------------------------------- | :--------- |
| change         | 选中值发生变化时触发                     | `Function` |
| visible-change | 下拉框出现/隐藏时触发                    | `Function` |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | `Function` |
