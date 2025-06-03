---
outline: deep
prev:
  text: "Icon"
  link: "/md/components/icon"
next:
  text: "Tooltip"
  link: "/md/components/tooltip"
---

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

悬停在下拉菜单上以展开更多操作。

通过设置 options 来设置下拉触发的元素。 默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

<preview path="../../demo/Dropdown/Basic.vue" title="基础用法" description="Dropdown 组件基础用法"></preview>

## 位置

支持 6 个位置。

设置 placement 属性，使下拉菜单出现在不同位置。

<preview path="../../demo/Dropdown/Position.vue" title="位置​" description="Dropdown 位置​"></preview>

## 触发方式

可以配置点击激活或者悬停激活。

将 trigger 属性设置为 click 即可

<preview path="../../demo/Dropdown/Trigger.vue" title="触发方式" description="Dropdown 触发方式"></preview>

## 下拉方法

您可以手动使用 手动打开 或 手动关闭下拉菜单以打开或关闭

<preview path="../../demo/Dropdown/Manual.vue" title="下拉方法" description="Dropdown 下拉方法"></preview>

## Dropdown API

### Dropdown Attributes

| 属性名        | 说明                                                             | 类型      | Default |
| :------------ | :--------------------------------------------------------------- | :-------- | :------ |
| placement     | 菜单弹出位置                                                     | `enum`    | bottom  |
| trigger       | 触发下拉的行为                                                   | `enum`    | —       |
| disabled      | 是否禁用                                                         | `boolean` | false   |
| openDelay     | 打开延迟                                                         | `number`  | 0       |
| closeDelay    | 关闭延迟                                                         | `number`  | 0       |
| popperOptions | [popper.js](https://popper.js.org/docs/v2/) 参数 参考tooltip组件 | `object`  | —       |

### menuOptions Attributes

| 属性名   | 说明           | Type      | 默认值 |
| :------- | :------------- | :-------- | :----- |
| divided  | 是否显示分隔符 | `boolean` | false  |
| disabled | 是否禁用       | `boolean` | false  |

### Dropdown Slots

| 插槽名  | 说明                                                                              | 子标签 |
| :------ | :-------------------------------------------------------------------------------- | :----- |
| default | 下拉菜单触发内容。 注意：必须是有效的 html DOM 元素（例如 `<span>、<button>` 等） | —      |

### Dropdown Events

| 事件名         | 说明                                                                       | 类型       |
| :------------- | :------------------------------------------------------------------------- | :--------- |
| visible-change | 当下拉菜单出现/消失时触发器, 当它出现时, 参数将是 `true`, 否则将是 `false` | `Function` |
| select         | 当下拉项被点击时触发                                                       | `Function` |

### dropdown Exposes

| 方法名 | 说明         | Type       |
| :----- | :----------- | :--------- |
| show   | 打开下拉菜单 | `Function` |
| hide   | 关闭下拉菜单 | `Function` |
