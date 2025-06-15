<script setup lang="ts">
import { h, ref } from 'vue'
import Select from './Select.vue'
import type { SelectOption } from './types'

const test = ref('')
const option2 = [
  { label: 'hello', value: '1' },
  { label: 'xyz2', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true },
]
function customRender(option: SelectOption) {
  return h('div', { className: 'xyz' }, [h('b', option.label), h('span', option.value)])
}
</script>

<template>
  <Select
    v-model="test"
    placeholder="基础选择器"
    :options="option2"
    :render-label="customRender"
  />
</template>
