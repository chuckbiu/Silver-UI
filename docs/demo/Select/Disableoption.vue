<script lang="ts" setup>
import { ref } from 'vue'
import type { SelectOption } from '@/components/Select/types'

import SiSelect from '@/components/Select/Select.vue'

const selectoptions: SelectOption [] = [
  { value: '1', label: 'Action 1' },
  { value: '2', label: 'Action 2', disabled: true },
  { value: '3', label: 'Action 3' },
  { value: '4', label: 'Action 4' },
]
const Selectvalue = ref('')
</script>

<template>
  <div>
    <SiSelect v-model="Selectvalue" :options="selectoptions" placeholder="请选择" />
  </div>
</template>
