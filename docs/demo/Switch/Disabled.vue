<script lang="ts" setup>
import { ref } from 'vue'
import SiSwitch from '@/components/Switch/Switch.vue'

const SwitchValue1 = ref(true)
const SwitchValue2 = ref(false)
</script>

<template>
  <div>
    <SiSwitch v-model="SwitchValue1" disabled />
    <SiSwitch v-model="SwitchValue2" />
  </div>
</template>
