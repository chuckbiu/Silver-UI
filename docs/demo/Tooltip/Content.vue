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
      >
        <template #content>
          multiple lines<br>second line
        </template>
        <SiButton>top</SiButton>
      </SiTooltip>
    </div>
  </div>
</template>
