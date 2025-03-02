<script setup lang="ts">
import { inject, computed } from "vue";
import type { CollapseItemProps } from "./types";
import { collapseInjectionKey } from "./types";
import Icon from "@/components/Icon/Icon.vue";

defineOptions({
  name: "siCollapseItem",
});
const props = defineProps<CollapseItemProps>();
const collapseContext = inject(collapseInjectionKey);
const isActived = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name);
});
const handleClick = () => {
  if (props.disabled) return;
  collapseContext?.handleHeaderClick(props.name);
};
/// 进入动画的初始状态
function onBeforeEnter(el: HTMLElement) {
    el.style.height = '0px';
    el.style.overflow = 'hidden';

}

function onEnter(el: HTMLElement) {
    el.style.height = el.scrollHeight + 'px';

}
function onAfterEnter(el: HTMLElement) {
    el.style.height = '';

}
// 离开动画的初始状态
function onAfterLeave(el: HTMLElement) {
    el.style.height = '';
    el.style.overflow = '';
}
function onBeforeLeave(el: HTMLElement) {
    el.style.height = el.scrollHeight + 'px';

    el.style.overflow = 'hidden';
}   
function onLeave(el: HTMLElement) {
    el.style.height = '0px';


}   
</script>

<template>
  <div
    class="si-collapse-item"
  >
    <div
      class="si-collapse-item__header"
      :id="`item-header-${name}`"
      @click="handleClick"
      :class="{
      'is-disabled': disabled,
       'is-active': isActived
    }"
    >
      <!-- 具名插槽 -->
      <slot name="title">{{ title }}</slot>
      <Icon icon="arrow-up"></Icon>

    </div>
    <Transition name="slide" 
        @before-enter="onBeforeEnter"
                @enter="onEnter"
  @after-enter="onAfterEnter"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  
    >
    <div class="si-collapse-item__wrapper" v-show="isActived">
        <div
        class="si-collapse-item__content"
        :id="`item-content-${name}`"
        
      >
        <slot></slot>
      </div>
    </div>
     
    </Transition>
  </div>
</template>

