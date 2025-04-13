<script setup lang="ts">
import Tooltip from './twocomponents/Tooltip/Tooltip.vue'
import SiButton from '@/components/Button/Button.vue'
</script>

<template>
  <div style="text-align: center;">
    <Tooltip placement="bottom" content="Btom">
      <SiButton>Default</SiButton>
    </Tooltip>
  </div>
</template>
