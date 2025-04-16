# Message 消息提示

常用于主动操作后的反馈提示。 与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基础用法

从顶部出现，3 秒后自动消失。

Message 可以接收一个字符串或一个 VNode 作为参数，它会被显示为正文内容。

<preview path="../../demo/Message/Basic.vue" title="基础用法" description="Message 组件基础用法"></preview>

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

当需要自定义更多属性时，Message 也可以接收一个对象为参数。 比如，设置 type 字段可以定义不同的状态，默认为default。 此时正文内容以 message 的值传入

<preview path="../../demo/Message/Status.vue" title="不同状态" description="Message 不同状态"></preview>

## 可关闭的消息提示

可以添加关闭按钮。

默认的 Message 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 showClose 设置为 true

<preview path="../../demo/Message/Manual.vue" title="关闭" description="Message 关闭"></preview>

## 支持修改停留时间

Message 拥有可控的 duration， 默认的关闭时间为 3000 毫秒，当把这个属性的值设置为0便表示该消息不会被自动关闭。

<preview path="../../demo/Message/Duration.vue" title="停留时间" description="Message 停留时间"></preview>

## API

### Message 配置项

| 名称      | 说明                                         | 类型                                      | 默认值 |
| :-------- | :------------------------------------------- | :---------------------------------------- | :----- |
| message   | 消息文字                                     | `string` / `VNode`                        | ''     |
| type      | 消息类型                                     | `info` / `success` / `warning` / `danger` | info   |
| showclose | 是否显示关闭按钮                             | `boolean`                                 | false  |
| offset    | Message 距离窗口顶部的偏移量                 | `number`                                  | 20     |
| duration  | 显示时间，单位为毫秒。 设为 0 则不会自动关闭 | `number`                                  | 3000   |

