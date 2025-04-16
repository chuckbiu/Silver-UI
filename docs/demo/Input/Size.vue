<script lang="ts" setup>
import { ref } from 'vue'
import SiInput from '@/components/Input/Input.vue'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
</script>

<template>
  <div style="width: 240px;">
    <SiInput
      v-model="input1"
      size="large"
      placeholder="Please Input"
    />
    <hr>
    <SiInput
      v-model="input2"
      placeholder="Please Input"
    />
    <hr>
    <SiInput
      v-model="input3"
      size="small"
      placeholder="Please Input"
    />
  </div>
</template>
