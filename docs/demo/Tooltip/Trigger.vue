<script lang="ts" setup>
import SiTooltip from '@/components/Tooltip/Tooltip.vue'
import SiButton from '@/components/Button/Button.vue'
</script>

<template>
  <div>
    <div class="tooltip-base-box">
      <SiTooltip
        class="box-item"
        placement="top"
        trigger="click"
      >
        <template #content>
          multiple lines<br>second line
        </template>
        <SiButton>click me</SiButton>
      </SiTooltip>
    </div>
  </div>
</template>
