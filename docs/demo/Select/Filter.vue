<script setup lang="ts">
import { ref } from 'vue'
import SiSelect from '@/components/Select/Select.vue'

const test = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<template>
  <SiSelect
    v-model="test"
    placeholder="可过滤 基础选择器"
    :options="options"
    filterable
  />
</template>
