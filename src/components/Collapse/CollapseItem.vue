<script setup lang="ts">
import { computed, inject } from 'vue'
import Icon from '../../components/Icon/Icon.vue'
import type { CollapseItemProps } from './types'
import { collapseInjectionKey } from './types'

defineOptions({
  name: 'si-collapse-item',
})
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(collapseInjectionKey)
const isActived = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})
function handleClick() {
  if (props.disabled)
    return
  collapseContext?.handleHeaderClick(props.name)
}
/// 进入动画的初始状态
function onBeforeEnter(el: HTMLElement) {
  el.style.height = '0px'
  el.style.overflow = 'hidden'
}

function onEnter(el: HTMLElement) {
  el.style.height = `${el.scrollHeight}px`
}
function onAfterEnter(el: HTMLElement) {
  el.style.height = ''
}
// 离开动画的初始状态
function onAfterLeave(el: HTMLElement) {
  el.style.height = ''
  el.style.overflow = ''
}
function onBeforeLeave(el: HTMLElement) {
  el.style.height = `${el.scrollHeight}px`
  el.style.overflow = 'hidden'
}
function onLeave(el: HTMLElement) {
  el.style.height = '0px'
}
</script>

<template>
  <div
    class="si-collapse-item"
  >
    <div
      :id="`item-header-${name}`"
      class="si-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isActived,
      }"
      @click="handleClick"
    >
      <!-- 具名插槽 -->
      <slot name="title">
        {{ title }}
      </slot>
      <Icon icon="arrow-right" class="header-angle" />
    </div>
    <Transition
      name="slide"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <!-- bem 101 命名法 -->
      <div v-show="isActived" class="si-collapse-item__wrapper">
        <div
          :id="`item-content-${name}`"
          class="si-collapse-item__content"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>
