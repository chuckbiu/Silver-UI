<script lang="ts" setup>
import { ref } from 'vue'
import SiInput from '@/components/Input/Input.vue'

const input = ref('')
</script>

<template>
  <div style="width: 240px;">
    <SiInput
      v-model="input"
      placeholder="Please input"
      disabled
    />
  </div>
</template>
