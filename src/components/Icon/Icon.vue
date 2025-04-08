<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import _ from 'lodash'
/* import font awesome icon component */
import { computed } from 'vue'
import type { FontAwesomeIconProps } from './types.ts'

defineOptions({
  name: 'si-icon',
  // 取消透传到跟组件
  inheritAttrs: false,
})
const props = defineProps<FontAwesomeIconProps>()

const filterProps = computed(() => {
  return _.omit(
    props,
    ['type', 'color'],
  )
})
const CustomStyle = computed(() => {
  return props.color ? { color: props.color } : { color: '' }
})
</script>

<template>
  <i
    class="si-icon"
    :class="{
      [`si-icon--${type}`]: type }"
    :style="CustomStyle"
    v-bind="$attrs"
  >
    <!-- Your icon content goes here -->
    <FontAwesomeIcon v-bind="filterProps" />
  </i>
</template>

<style scoped>
.icon {
  /* Your styles go here */
}
</style>
