<script lang="ts" setup>
import { ref } from 'vue'
import SiSwitch from '@/components/Switch/Switch.vue'

const SwitchValue = ref(false)
</script>

<template>
  <div>
    <SiSwitch
      v-model="SwitchValue"
      active-text="是"
      inactive-text="否"
    />
  </div>
</template>
