<script lang="ts" setup>
import { ref } from 'vue'
import SiTooltip from '@/components/Tooltip/Tooltip.vue'
import SiButton from '@/components/Button/Button.vue'
import type { TooltipInstance } from '@/components/Tooltip/type.ts'

const tooltipRef = ref<TooltipInstance | null>(null)

function open() {
  tooltipRef.value?.show()
}
function close() {
  tooltipRef.value?.hide()
}
</script>

<template>
  <div>
    <div class="tooltip-base-box">
      <SiTooltip
        ref="tooltipRef"
        class="box-item"
        placement="top"
        manual
      >
        <template #content>
          multiple lines<br>second line
        </template>
        <SiButton>top</SiButton>
      </SiTooltip>
    </div>
    <div>
      <SiButton @click="open">
        open
      </SiButton>
      <SiButton @click="close">
        close
      </SiButton>
    </div>
  </div>
</template>

<style>
  .box-item {
  margin-bottom: 20px;
}
</style>
