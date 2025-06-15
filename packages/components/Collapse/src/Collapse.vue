<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import type { CollapsedefineEmits, CollapsedefineProps, NameType } from './types'
import { collapseInjectionKey } from './types'

defineOptions({
  name: 'si-collapse',
})
const props = defineProps<CollapsedefineProps>()
const emit = defineEmits<CollapsedefineEmits>()
// 当前激活的面板
const activeNames = ref<NameType[]>(props.modelValue || [])
if (props.accordion && activeNames.value.length > 1) {
  // 控制台发生警告
  console.warn('[siUI warn]: Collapse is in accordion mode, but multiple activeNames are detected.')
}
// 面板标题点击事件
function handleHeaderClick(name: NameType) {
  if (props.accordion) {
    // 手风琴模式
    activeNames.value = activeNames.value[0] === name ? [''] : [name]
  } else {
    const index = activeNames.value.indexOf(name)
    if (index > -1) {
      // 存在则删除对应的一项
      activeNames.value.splice(index, 1)
    } else {
      // 不存在则添加
      activeNames.value.push(name)
    }
  }

  emit('update:modelValue', activeNames.value)
  emit('change', activeNames.value)
}
// provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
provide(collapseInjectionKey, {
  activeNames,
  handleHeaderClick,
})
watch(() => props.modelValue, (val) => {
  activeNames.value = val
})
</script>

<template>
  <div class="si-collapse">
    <slot />
  </div>
</template>
