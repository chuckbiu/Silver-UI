<script lang="ts" setup>
import { ref } from 'vue'
import SiInput from '@/components/Input/Input.vue'

const textarea = ref('')
</script>

<template>
  <div style="width: 240px;">
    <SiInput
      v-model="textarea"
      placeholder="Please input"
      type="textarea"
    />
  </div>
</template>
