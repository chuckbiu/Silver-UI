<script lang="ts" setup>
import { ref } from 'vue'
import SiSwitch from '@/components/Switch/Switch.vue'

const SwitchValue = ref(false)
</script>

<template>
  <div>
    <SiSwitch
      v-model="SwitchValue"
      size="large"
    />
    <br>
    <SiSwitch v-model="SwitchValue" />
    <br>
    <SiSwitch
      v-model="SwitchValue"
      size="small"
    />
  </div>
</template>
