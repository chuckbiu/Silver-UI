### 架构 monorepo



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

#### 重难点：

​	v-model 

​	defineEmits

​	provide/reject 通信

### Icon

fortawesome 第三方库



### Tooltip 文字提示 （通用组件）

Dropdown, select 组件都可复用

#### 开发计划：

最基本实现 完成

支持 click / hover 触发方式 

支持 clickoutside的 时候隐藏 

支持 手动触发 

```vue
<script>
    // 使用 <script setup> 的组件是默认关闭的——即通过模板引用或者 $parent 链获取到的组件的公开实例，不会暴露任何在 <script setup> 中声明的绑定。
	// 可以通过 defineExpose 编译器宏来显式指定在 <script setup> 组件中要暴露出去的属性
    defineExpose({
    })
</script>
```

支持 popper 参数 

动画 

支持延迟显示 

样式 

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

### Dropdown 下拉菜单

需求分析

![](assets/Snipaste_2025-03-15_19-58-20.png)

#### 开发计划：

1 渲染页面：

2 支持 h 自定义节点渲染：

3 修改单文件组件变成tsx组件

​	渲染 slots 

​		vue 使用：

​			默认：<slot/>

​			具名：<slot name="footer" />

​		jsx 使用：

​			默认：{ slots.default() }

​			具名：{ slots.footer() }

​	传递 slots

​		 vue:

​			<MyComponent> Hello </MyComponent>

- ```vue
  <MyComponent>
  	<template #footer> footer </template>
  </MyComponent>
  ```

  ​	  jsx:

  ​		<MyComponent> {() => 'hello'} </MyComponent>

  ​		<MyComponents> {{

  ​				default: () => 'default slot',

  ​				footer: () => <div> foooter </div>

  ​		}}

  ​		</MyComponent>

  ​	expose 

  ​		vue - defineExpose

  ​		jsx - expose

#### 重难点：

##### 渲染函数 & JSX（h 函数语法糖）

虚拟DOM

虚拟 DOM (Virtual DOM，简称 VDOM) 是一种编程概念，意为将目标所需的 UI 通过数据结构“虚拟”地表示出来，保存在内存中，然后将真实的 DOM 与之保持同步。这个概念是由 [React](https://reactjs.org/) 率先开拓，随后被许多不同的框架采用，当然也包括 Vue。

> 挂载 -》 更新（比对， 协调） 

渲染管线

Vue组件 挂载时会发生下面几件事：

1.编译 2.挂载 3.更新

### Message 组件需求分析



### 优化

css