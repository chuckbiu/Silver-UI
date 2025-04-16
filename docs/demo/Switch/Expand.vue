<script lang="ts" setup>
import { ref } from 'vue'
import SiSwitch from '@/components/Switch/Switch.vue'
import SiTooltip from '@/components/Tooltip/Tooltip.vue'

const value = ref('100')
</script>

<template>
  <div>
    <SiTooltip
      :content="`Switch value: ${value}`"
      placement="top"
    >
      <SiSwitch
        v-model="value"
        active-value="100"
        inactive-value="0"
      />
    </SiTooltip>
  </div>
</template>
