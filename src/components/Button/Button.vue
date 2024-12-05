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
      'is-plain': plain
    }" :disabled="disabled" :autofocus="autofocus" :type="nativeType"
  >
      <span>
        <slot></slot>
      </span>
  </button>
</template>
<script setup lang="ts">
import type { buttonProps } from './types.ts'
import {ref} from 'vue'
withDefaults(defineProps<buttonProps>(),{
  nativeType: 'button'
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
