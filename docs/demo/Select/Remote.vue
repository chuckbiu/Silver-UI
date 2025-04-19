<script setup lang="ts">
import { ref } from 'vue'
import SiSelect from '@/components/Select/Select.vue'

const test = ref('')
const states = [
  'Alsad',
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
]

function remoteFilter(query: any) {
  return new Promise((resolve) => {
    if (query) {
      setTimeout(() => {
        const options = states
          .filter((item) => {
            return item.toLowerCase().includes(query.toLowerCase())
          })
          .map((label) => {
            return { label, value: label }
          })
        resolve(options)
      }, 500)
    } else {
      resolve([])
    }
  })
}

</script>

<template>
  <SiSelect
    v-model="test"
    placeholder="搜索远程结果"
    filterable
    remote
    :remote-method="remoteFilter"
  />
</template>
