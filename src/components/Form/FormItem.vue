<script lang="ts" setup>
import type { FormItemProps } from './types'

defineProps<FormItemProps>()
</script>

<template>
  <div class="si-form-item">
    <label class="si-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="si-form-item__content">
      <slot />
    </div>
  </div>
</template>
