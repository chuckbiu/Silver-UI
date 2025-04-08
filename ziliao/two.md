## Icon

### 需求分析

我们需要封装一个 Icon 组件，利用第三方图标库 [Font Awesome](https://docs.fontawesome.com/web/setup/get-started) 提供的图标资源。通过封装，我们可以更方便地在项目中使用图标，并且可以自定义图标的样式和行为。

### 主要写法

1. 类型定义：

首先，我们需要定义 Icon 组件的 Props 类型。这些类型是从 `@fortawesome/vue-fontawesome` 库中提取的，用于确保我们能够正确地传递和使用 Font Awesome 图标的属性。

取自 node_modules\@fortawesome\vue-fontawesome\index.d.ts

```ts
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface FontAwesomeIconProps {
  border?: boolean  // 是否显示边框
  fixedWidth?: boolean  // 是否固定宽度
  flip?: 'horizontal' | 'vertical' | 'both'  // 图标翻转方向
  icon: object | Array<string> | string | IconDefinition  // 图标名称或定义
  mask?: object | Array<string> | string  // 图标遮罩
  maskId?: object | Array<string> | string  // 遮罩ID
  listItem?: boolean  // 是否作为列表项
  pull?: 'right' | 'left'  // 图标对齐方式
  pulse?: boolean  // 是否启用脉冲动画
  rotation?: 90 | 180 | 270 | '90' | '180' | '270'  // 图标旋转角度
  swapOpacity?: boolean  // 是否交换透明度
  size?: '2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x'  // 图标大小
  spin?: boolean  // 是否启用旋转动画
  transform?: object | string  // 图标变换
  symbol?: boolean | string  // 是否作为符号使用
  title?: string  // 图标标题
  titleId?: string  // 标题ID
  inverse?: boolean  // 是否反转颜色
  bounce?: boolean  // 是否启用弹跳动画
  shake?: boolean  // 是否启用抖动动画
  beat?: boolean  // 是否启用跳动动画
  fade?: boolean  // 是否启用淡入淡出动画
  beatFade?: boolean  // 是否启用跳动淡入淡出动画
  spinPulse?: boolean  // 是否启用脉冲旋转动画
  spinReverse?: boolean  // 是否启用反向旋转动画
  type?: 'primary' | 'success' | 'danger' | 'warning' | 'info'  // 图标类型
  color?: string  // 图标颜色
}
```

2. 主要代码

我们使用 Vue 3 的 `<script setup>` 语法来简化代码，并通过 `computed` 属性来处理图标的样式和属性

1. **模板部分**：
   - 使用 `<i>` 标签作为图标的容器，并根据 `type` 动态添加样式类。
   - 通过 `v-bind="$attrs"` 将父组件传递的所有属性绑定到 `<i>` 标签上。
   - 使用 `<fontAwesomeIcon>` 组件来渲染 Font Awesome 图标，并通过 `filterProps` 过滤掉不需要传递给它的属性。
2. **脚本部分**：
   - 使用 `defineProps` 定义组件的 Props，并确保它们符合 `FontAwesomeIconProps` 类型。
   - 使用 `computed` 属性 `filterProps` 来过滤掉不需要传递给 FontAwesomeIcon 的 Props（如 `type` 和 `color`）。
   - 使用 `computed` 属性 `CustomStyle` 来根据 `color` 属性生成自定义样式。

```vue
<template>
    <i class="si-icon" :class="{
        [`si-icon--${type}`]: type  // 根据 type 动态添加样式类
    }" :style="CustomStyle" v-bind="$attrs">  <!-- 绑定自定义样式和其他属性 -->
        <!-- 使用 FontAwesomeIcon 组件渲染图标 -->
        <fontAwesomeIcon v-bind="filterProps"/>
    </i>
</template>

<script setup lang="ts">
    import type { FontAwesomeIconProps } from "./types.ts";  // 导入类型定义
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';  // 导入 FontAwesomeIcon 组件
    import _ from 'lodash';  // 导入 lodash 工具库
    import { computed } from 'vue';  // 导入 Vue 的 computed 函数

    // 定义组件名称，并取消透传不必要的属性
    defineOptions({
        name: 'SiIcon',
        inheritAttrs: false
    })

    // 定义组件的 Props
    const props = defineProps<FontAwesomeIconProps>()

    // 过滤掉不需要传递给 FontAwesomeIcon 的 Props
    const filterProps = computed(() => {
       return _.omit(
        props,
        ['type', 'color']  // 过滤掉 type 和 color，因为它们用于自定义样式
    )
    })

    // 根据 color 属性生成自定义样式
    const CustomStyle = computed(()=>{
        return props.color ? { color: props.color } : { color: '' } 
    })
</script>
```

### 总结

通过这种方式，我们封装了一个灵活且易于使用的 Icon 组件。它不仅可以利用 Font Awesome 提供的丰富图标资源，还可以通过 `type` 和 `color` 等属性来自定义图标的样式和行为。这种封装方式使得在项目中使用图标变得更加简单和高效。

