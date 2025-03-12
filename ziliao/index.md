### 测试框架Vitest 

Mocha / Jest / Vitest

https://cn.vitest.dev/

测试功能：

​	**断言** 

​		https://www.chaijs.com

组件测试框架：vue test utils / Testing Library

https://v1.test-utils.vuejs.org

####  Collapse 测试

​	Vnode 以及 Render Function 

​	文档地址：https://cn.vuejs.org/guide/extras/rendering-mechanism

​	

### Button

需求分析：

常用的操作按钮。

主要代码

```vue
<template>
  <button class="si-button"
          ref="_ref"
    :class="{
      [`si-button--${type}`]: type,
      [`si-button--${size}`]: size,
      'is-type': type,
      'is-size': size,
      'is-disabled': disabled,
      'is-round': round,
      'is-plain': plain,
      'is-loading': loading,
    }" :disabled="disabled || loading"  :type="nativeType"
  >
    <Icon icon="fa-solid fa-spinner" v-if="loading" spin></Icon>
    <Icon :icon="icon" v-if="icon"></Icon>
      <span>
        <slot></slot>
      </span>
  </button>
</template>
<script setup lang="ts">
import type { buttonProps } from './types.ts'
import {ref} from 'vue'
import Icon from "@/components/Icon/Icon.vue";


withDefaults(defineProps<buttonProps>(),{
  nativeType: 'button',
  //  disabled: false, // 设置默认值
  // loading: false, // 设置默认值
})
defineOptions({
  name: 'SButton'
})
const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref
})

</script>
<style scoped
>
@import './style.css';
</style>

```



### Collapse 

/kəˈlæps/



### Icon

fortawesome 第三方库



### Tooltip 文字提示 （通用组件）

Dropdown, select 组件都可复用

#### 需求分析：

常用于展示鼠标 hover 时的提示信息。

触发区 生效区

触发方式：

hover click trigger

属性

事件

用法：

popper.js 第三方库

https://popper.js.org/docs/v2/

#### 动态事件：

方式一：原生事件

```js
addEventListener("click", (event) => {});
addEventListener("mouseup", (event) => {});
```

方式二：v-on完成

@click = v-on:click

v-on 可接收一个Object作为参数， 对其中每一项都可以作为对应的事件回调

给元素绑定事件监听器。

用法：

```html
<!-- 对象语法 -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
```

### Dropdown 组件

### 优化

css