## Button

### 需求分析：

基本使用

![](assets/Snipaste_2025-03-13_18-16-24.png)

### 主要写法：

类型定义

```ts
type type = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' ;
type size = 'small' | 'large';
type NativeType = 'button' | 'submit' | 'reset'

export interface  buttonProps {
  type?: type,
  size?: size,
  disabled?: boolean, // 是否禁用
  plain?: boolean, // 是否朴素按钮
  round?: boolean, // 是否圆角按钮
  circle?: boolean, // 是否圆形按钮
  nativeType?: NativeType // button 的类型
  loading?: boolean, // 是否加载中状态
  icon?: string, // 图标类名
}
```

主要代码

```vue
<template>
  <button
    class="si-button"
    ref="_ref"
    :class="{
      [`si-button--${type}`]: true, // true
      [`si-button--${size}`]: size,
      'is-type': type,
      'is-size': size,
      'is-disabled': disabled,
      'is-round': round,
      'is-plain': plain,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :type="nativeType"
  >
    <Icon icon="fa-solid fa-spinner" v-if="loading" spin></Icon>
    <Icon :icon="icon" v-if="icon"></Icon>
    <span>
      <slot></slot>
    </span>
  </button>

</template>
<script setup lang="ts">
import type { buttonProps } from "./types.ts";
import { ref } from "vue";
import Icon from "../../components/Icon/Icon.vue";

withDefaults(defineProps<buttonProps>(), {
  nativeType: "button",
  //  disabled: true, // 设置默认值
  // loading: false, // 设置默认值
});
defineOptions({
  name: "SiButton",
});
const _ref = ref<HTMLButtonElement>();
defineExpose({
  ref: _ref,
});
</script>
<style scoped>
/* @import "./style.css"; */
</style>
```

## Icon

### 需求分析

利用第三方图标库封装 https://docs.fontawesome.com/web/setup/get-started

### 主要写法

类型定义：

取自 node_modules\@fortawesome\vue-fontawesome\index.d.ts

```ts
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface FontAwesomeIconProps {
  border?: boolean
  fixedWidth?: boolean
  flip?: 'horizontal' | 'vertical' | 'both'
  icon: object | Array<string> | string | IconDefinition
  mask?: object | Array<string> | string
  maskId?: object | Array<string> | string
  listItem?: boolean
  pull?: 'right' | 'left'
  pulse?: boolean
  rotation?: 90 | 180 | 270 | '90' | '180' | '270'
  swapOpacity?: boolean
  size?: '2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x'
  spin?: boolean
  transform?: object | string
  symbol?: boolean | string
  title?: string
  titleId?: string
  inverse?: boolean
  bounce?: boolean
  shake?: boolean
  beat?: boolean
  fade?: boolean
  beatFade?: boolean
  spinPulse?: boolean
  spinReverse?: boolean
  type?: 'primary' | 'success' | 'danger' | 'warning' | 'info' 
  color?: string
}
```

主要代码

```vue
<template>
    <i class="si-icon" :class="{
        [`si-icon--${type}`]: type    }" :style="CustomStyle" v-bind="$attrs">
        <!-- Your icon content goes here -->
         <fontAwesomeIcon v-bind="filterProps"/>
        
    </i>
</template>

<script setup lang="ts">
    import type { FontAwesomeIconProps } from "./types.ts";
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    import _ from 'lodash';
    /* import font awesome icon component */
    import { computed } from 'vue';
    defineOptions({
        name: 'SiIcon',
        // 取消透传到跟组件
        inheritAttrs: false
    })
    const props = defineProps<FontAwesomeIconProps>()

    const filterProps = computed(() => {
       return _.omit(
        props,
        ['type', 'color']
    )
    })
    const CustomStyle = computed(()=>{
        return props.color ? { color: props.color } : { color: '' } 
    })
</script>
```



## Collapse 

### 需求分析：

![](assets/Snipaste_2025-03-13_19-15-04.png)

功能：标题/内容 | 手风琴

```vue
// 方案一 传入数组形式
<Collapse :item="item"></Collapse>
const items = [{
	name: 'a', // key
	title: 'title a',
	content: '文本 vnode h2'
}]
// 复杂 vnode 等样式展示问题
// 方案二 语义化展示
<Collapse>
    <CollapseItem title="Title A" name="1-1" >
         <p> Consistent with real life: in line with the process and logic of real</p>
    </CollapseItem>
</Collapse>
```

思路分析

```js
// 维护一个可变化响应式数组，存在即是打开
ref(['a'])	
// 点击特定的item之后 进行添加或删除
['a'] | ['a', 'b'] | ['']
// 在组件内部，判断当前name是否存在数组中，进行是否打开
['a'].includes(props.title)
```

### 主要写法：

知识点：provide / inject | v-model | slots

1. 显示内容-html

types.ts 

```ts
type NameType = number | string 
export interface CollapseItemProps {
    name: NameType;
    title?: string;
    content: string
}
export interface CollapseProps {
    items?: Ref<NameType[]>,
    accordion?: boolean
}
```

Collapse.vue

```vue
<script setup lang="ts">
    import CollapseProps from "./types"
     defineProps<CollapseProps>()
</script>

<template>
   <div class="si-collapse">
       <slot></slot>
    </div>
</template>

<style scoped>
 
</style>

```

CollapseItem.vue

```vue
<script setup lang="ts">
  import type { CollapseItemProps } from './types';
  const props = defineProps<CollapseItemProps>()
 
</script>

<template>
 <div
    class="si-collapse-item"
  >
    <div class="si-collapse-item__header" >
      <slot name="title" > {{ props.title }}</slot>
    </div>
    <div class="si-collapse-item__content">
        {{ props.content}}
    </div>
  </div>
</template>

<style scoped>
 
</style>
```

App.vue

```vue
 <Collapse>
        <CollapseItem name="a" title="Title a" content="dasd www  ddd"> </CollapseItem>
        <CollapseItem name="a"  content="dasd www  ddd">
          <template v-slot:title>
            <!-- header 插槽的内容放这里 -->
             <h2> Title B</h2>
          </template>
        </CollapseItem>

    </Collapse>
```

2. 事件

types.ts

```ts
export type NameType = number | string 
import type { InjectionKey, Ref} from 'vue'

export interface CollapseItemProps {
    name: NameType;
    title?: string;
    content: string
}
export interface CollapseProps {
    items?: NameType[],
    accordion?: boolean
}
export interface ContextCollapseKey {
    activeItems: Ref<NameType[]>,
    handlerHeaderClick: (name: NameType) => void;
}
export const ContextCollapse =  Symbol() as InjectionKey<ContextCollapseKey>
```

collapse.vue

```vue
<script setup lang="ts">
    import { provide, ref} from "vue";
    import type { CollapseProps } from "./types"
    import type { NameType } from './types'
    import { ContextCollapse } from './types'
    const props = defineProps<CollapseProps>()
    // 外部传入进来的数组
    const activeItems  = ref<NameType[]>(props.items || [])
    // 子组件触发 
    const handlerHeaderClick = (name: NameType) => {
        // name 存在
        console.log(name)
        const index = activeItems.value.indexOf(name);
        console.log(index)
        if (index != -1){
            activeItems.value.splice(index, 1)
            console.log(activeItems.value)
        } else {
            // name 不存在
            activeItems.value.push(name)
        }
    }
    provide(ContextCollapse, {
        activeItems,
        handlerHeaderClick
    })
</script>

<template>
   <div class="si-collapse">
       <slot></slot>
    </div>
</template>
```

collapseItem.vue

```vue
<script setup lang="ts">
  import type { CollapseItemProps } from './types';
  import { ContextCollapse } from './types'
  import { computed, inject } from 'vue';
  const props = defineProps<CollapseItemProps>()
  const CollapseIteminject = inject(ContextCollapse)
  const handlerHeader = () => {
    CollapseIteminject?.handlerHeaderClick(props.name)
  }
  const isActive = computed(()=>{
    return CollapseIteminject?.activeItems.value.includes(props.name)
  })
</script>

<template>
 <div
    class="si-collapse-item"
  >
    <div class="si-collapse-item__header" @click="handlerHeader">
      <slot name="title" > {{ props.title }}</slot>
    </div>
    <div class="si-collapse-item__content" v-show="isActive">
        {{ props.content}}
    </div>
  </div>
</template>
```

3. 改为v-model 手风琴

types.ts

```ts
export type NameType = number | string 
import type { InjectionKey, Ref} from 'vue'

export interface CollapseItemProps {
    name: NameType;
    title?: string;
    content: string
}
export interface CollapseProps {
    // modelValue 
    modelValue: NameType[],
    accordion: boolean
}
export interface ContextCollapseKey {
    activeItems: Ref<NameType[]>,
    handlerHeaderClick: (name: NameType) => void;
}
// 定义collapse触发事件
export interface CollapseEmits {
    (e: 'update:modelValue', value: NameType[]): void
}
export const ContextCollapse =  Symbol() as InjectionKey<ContextCollapseKey>
```

collapse.vue

```vue
<script setup lang="ts">
    import { provide, ref} from "vue";
    import type { CollapseProps } from "./types"
    import type { NameType, CollapseEmits} from './types'
    import { ContextCollapse } from './types'
    const props = defineProps<CollapseProps>()
    // 外部传入进来的数组
    const activeItems  = ref<NameType[]>(props.modelValue || [])
    const emit = defineEmits<CollapseEmits>()
    // 子组件触发 
    const handlerHeaderClick = (name: NameType) => {
        if (props.accordion){
            if(activeItems.value[0] === name) {
                activeItems.value = ['']
            } else {
                activeItems.value = [name]
            }
        } else {
            // name 存在
            const index = activeItems.value.indexOf(name);
            if (index != -1){
                activeItems.value.splice(index, 1)
            } else {
                // name 不存在
                activeItems.value.push(name)
            }
        }
        
        emit('update:modelValue', activeItems.value)
    }
    provide(ContextCollapse, {
        activeItems,
        handlerHeaderClick
    })
</script>

<template>
   <div class="si-collapse">
       <slot></slot>
    </div>
</template>

```

collapseItem.vue

```vue
<script setup lang="ts">
  import type { CollapseItemProps } from './types';
  import { ContextCollapse } from './types'
  import { computed, inject } from 'vue';
  const props = defineProps<CollapseItemProps>()
  const CollapseIteminject = inject(ContextCollapse)
  const handlerHeader = () => {
    CollapseIteminject?.handlerHeaderClick(props.name)
  }
  const isActive = computed(()=>{
    return CollapseIteminject?.activeItems.value.includes(props.name)
  })
</script>

<template>
 <div
    class="si-collapse-item"
  >
    <div class="si-collapse-item__header" @click="handlerHeader">
      <slot name="title" > {{ props.title }}</slot>
    </div>
    <div class="si-collapse-item__content" v-show="isActive">
        {{ props.content}}
    </div>
  </div>
</template>

<style scoped>
 
</style>
```

