<script setup lang="ts">
import { ref } from 'vue'
import Icon  from 'sliver-ui'
import type { ButtonProps } from './types.ts'

defineOptions({
  name: 'si-button',
})
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
  // disabled: true, // 设置默认值
  // loading: false, // 设置默认值
})
const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref,
})
</script>

<template>
  <button
    ref="_ref"
    class="si-button"
    :class="{
      [`si-button--${type}`]: true,
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
    <Icon v-if="loading" icon="fa-solid fa-spinner" spin />
    <Icon v-if="icon" :icon="icon" />
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped>
/* @import "./style.css"; */
</style>
