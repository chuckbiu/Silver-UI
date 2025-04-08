## Tooltip 文字提示 （通用组件）

Dropdown, select 组件都可复用

#### 需求分析：

常用于展示鼠标 hover 时的提示信息。

触发区 生效区

触发方式：trigger

hover click 

属性

事件

用法

popper.js 第三方库

https://popper.js.org/docs/v2/

#### 开发计划：

1 最基本实现 完成

2 支持 click / hover 触发方式 

3 支持 clickoutside的 时候隐藏 

4 支持 手动触发 

5 支持 popper 参数 

6 动画-支持延迟演示-样式

#### 重难点：

动态事件：

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

defineExpose

```vue
<script>
    // 使用 <script setup> 的组件是默认关闭的——即通过模板引用或者 $parent 链获取到的组件的公开实例，不会暴露任何在 <script setup> 中声明的绑定。
	// 可以通过 defineExpose 编译器宏来显式指定在 <script setup> 组件中要暴露出去的属性
    defineExpose({
    })
</script>
```

工具函数

判断是否是 点击节点的目标节点子节点或者本身节点

```ts
import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue';
const useClickOutside = (elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) => {

    function handler(e: MouseEvent) {
        if (elementRef.value && e.target){
            // 包含 会自动寻找
           if(!elementRef.value.contains(e.target as HTMLElement)){
                callback(e)
           }            
        }
    }
    onMounted(()=>{
        document.addEventListener('click', handler)
    })
    onUnmounted(()=>{
        document.removeEventListener('click', handler)
    })
}
export default useClickOutside;
```



#### 代码：

Tooltip.vue

```vue
<template>
  <div class="si-tooltip" v-on="Tooltipevents" ref="TooltipNode">
    <div class="si-tooltip__trigger" ref="TNode" v-on="smallTooltipevents">
      <slot></slot>
    </div>
    <Transition name="fade">
      <div class="si-tooltip__popper" ref="PNode" v-if="isOpen">
        <slot name="content">
          {{ props.content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>
<script lang="ts" setup>

import { debounce } from 'lodash-es';
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./type.ts";
import { createPopper } from "@popperjs/core";
import { reactive, ref, watch, computed, onUnmounted } from "vue";
import type { Instance } from "@popperjs/core";
import useClickOutside from "../../hooks/useClickOutside.ts";
// 父组件传进来的值
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
  openDelay: 0,
  closeDelay: 0
});
// 创建节点
const TooltipNode = ref<HTMLElement | undefined>(undefined);
// 子组件触发事件
const emits = defineEmits<TooltipEmits>();
// 创建两个node节点
const TNode = ref<HTMLElement | null>(null);
const PNode = ref<HTMLElement | null>(null);
let propperInstance: null | Instance = null;
// 弹窗是否展示
const isOpen = ref(false);
let openTimes = 0;
let closeTimes = 0;
const popperOptions = computed(() => {
  return {
    placements: props.placement,
    ...props.popperOptions,
    modifiers: [
      {
        name: 'offset',
          options: {
          offset: [0, 10],
        },
      }
    ]
  };
});
// hover
const open = () => {
    openTimes++
    console.log('open times', openTimes);
    isOpen.value = true;
    emits("visible-change", true);
};
const close = () => {
    closeTimes++
    console.log('close times', closeTimes);
    isOpen.value = false;
    emits("visible-change", false);
};
const opendebounce = debounce(open, props.openDelay)
const closedebounce = debounce(close, props.closeDelay)

const openFinal = () => {
  closedebounce.cancel()
  opendebounce()
}
const closeFinal = () => {
  opendebounce.cancel()
  closedebounce()
}
// 组件触发点击
const triggerClick = () => {
  // isOpen.value = !isOpen.value;
  // emits("visible-change", isOpen.value);
  if (isOpen.value){
    closeFinal()
  } else {
    openFinal()
  }
};
// 定义事件监听器
let Tooltipevents: Record<string, any> = reactive({});
let smallTooltipevents: Record<string, any> = reactive({});

// 组件初次渲染 开始注册事件
const attachEvents = () => {
  if (props.trigger === "click") {
    smallTooltipevents["click"] = triggerClick;
  } else if (props.trigger === "hover") {
    smallTooltipevents["mouseenter"] = openFinal;
    Tooltipevents["mouseleave"] = closeFinal;
  }
};

if (!props.manual){
  attachEvents()
}



useClickOutside(TooltipNode, () => {
  // if (isOpen.value && PNode.value) {
  //   isOpen.value = !isOpen.value;
  // }
  if (isOpen.value && props.trigger === 'click' && !props.manual) {
    close()
  }
});

watch(() => props.manual, (isManual) => {
  if (isManual){
    Tooltipevents = {};
    smallTooltipevents = {};
  } else {
    attachEvents()
  }
})

watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (TNode.value && PNode.value) {
        // 根据两个节点都存在创建对应实例
        propperInstance = createPopper(TNode.value, PNode.value, {
          ...popperOptions.value,
        });
      }
    } else {
      // 没有显示就销毁对应实例
      propperInstance?.destroy();
    }
  },
  {
    flush: "post",
  }
);
//选项期望接受一个对象，其中键是需要侦听的响应式组件实例属性
watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      Tooltipevents = {};
      smallTooltipevents = {};
      attachEvents();
    }
  }
);
// 组件卸载执行
onUnmounted(()=>{
  Tooltipevents = {};
  smallTooltipevents = {};
})

// 暴露出实例

defineExpose<TooltipInstance>({
  'show': open,
  'hide': close
})
</script>
<style scoped></style>

```

type.ts

```ts
import type { Placement } from "@popperjs/core";
import type { Options } from "@popperjs/core";
export interface TooltipProps {
    trigger?: 'hover' | 'click';
    placement?: Placement,
    content?: string,
    // modifiers?:  
    // strategy?: string
    // 使用Partial 变成可选参数
    popperOptions?: Partial<Options>,
    openDelay?: number, // 打开延迟
    closeDelay?: number // 关闭延迟
    manual?: boolean // 是否手动关闭
}
export interface TooltipEmits {
    (e: 'visible-change', value: boolean): void;
}
export interface TooltipInstance {
    show: () => void;
    hide: () => void;
}
```

style.css

```css
.si-tooltip {
  --si-popover-bg-color: var(--si-bg-color-overlay);
  --si-popover-font-size: var(--si-font-size-base);
  --si-popover-border-color: var(--si-border-color);
  --si-popover-padding: 12px;
  --si-popover-border-radius: 4px;
  display: inline-block;
}

.si-tooltip {
  .si-tooltip__popper {
    background: var(--si-popover-bg-color);
    border-radius: var(--si-popover-border-radius);
    border: 1px solid var(--si-popover-border-color);
    padding: var(--si-popover-padding);
    color: var(--si-text-color-regular);
    line-height: 1.4;
    text-align: justify;
    font-size: var(--si-popover-font-size);
    box-shadow: var(--si-box-shadow-light);
    word-break: break-all;
    box-sizing: border-box;
    z-index: 1000;
    #arrow,
    #arrow::before {
      position: absolute;
      width: 8px;
      height: 8px;
      box-sizing: border-box;
      background: var(--si-popover-bg-color);
    }
    #arrow {
      visibility: hidden;
    }
    #arrow::before {
      visibility: visible;
      content: "";
      transform: rotate(45deg);
    }
    &[data-popper-placement^='top'] > #arrow {
      bottom: -5px;
    }
    
    &[data-popper-placement^='bottom'] > #arrow {
      top: -5px;
    }
    
    &[data-popper-placement^='left'] > #arrow {
      right: -5px;
    }
    
    &[data-popper-placement^='right'] > #arrow {
      left: -5px;
    }
    &[data-popper-placement^="top"] > #arrow::before {
      border-right: 1px solid var(--si-popover-border-color);
      border-bottom: 1px solid var(--si-popover-border-color);
    }
    &[data-popper-placement^="bottom"] > #arrow::before {
      border-left: 1px solid var(--si-popover-border-color);
      border-top: 1px solid var(--si-popover-border-color);
    }
    &[data-popper-placement^="left"] > #arrow::before {
      border-right: 1px solid var(--si-popover-border-color);
      border-top: 1px solid var(--si-popover-border-color);
    }
    &[data-popper-placement^="right"] > #arrow::before {
      border-left: 1px solid var(--si-popover-border-color);
      border-bottom: 1px solid var(--si-popover-border-color);
    }
  }  

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity var(--si-transition-duration);
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
```

