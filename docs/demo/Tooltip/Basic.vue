<script lang="ts" setup>
import SiTooltip from '@/components/Tooltip/Tooltip.vue'
import SiButton from '@/components/Button/Button.vue'
</script>

<template>
  <div>
    <div class="tooltip-base-box">
      <div class="row center">
        <SiTooltip
          class="box-item"
          content="Top Left prompts info"
          placement="top-start"
        >
          <SiButton>top-start</SiButton>
        </SiTooltip>
        <SiTooltip
          class="box-item"
          content="Top Center prompts info"
          placement="top"
        >
          <SiButton>top</SiButton>
        </SiTooltip>
        <SiTooltip
          class="box-item"
          content="Top Right prompts info"
          placement="top-end"
        >
          <SiButton>top-end</SiButton>
        </SiTooltip>
      </div>
      <div class="row">
        <SiTooltip
          class="box-item"
          content="Left Top prompts info"
          placement="left-start"
        >
          <SiButton>left-start</SiButton>
        </SiTooltip>
        <SiTooltip
          class="box-item"
          content="Right Top prompts info"
          placement="right-start"
        >
          <SiButton>right-start</SiButton>
        </SiTooltip>
      </div>
      <div class="row">
        <SiTooltip
          class="box-item"
          content="Left Center prompts info"
          placement="left"
        >
          <SiButton class="mt-3 mb-3">
            left
          </SiButton>
        </SiTooltip>
        <SiTooltip
          class="box-item"
          content="Right Center prompts info"
          placement="right"
        >
          <SiButton>right</SiButton>
        </SiTooltip>
      </div>
      <div class="row">
        <SiTooltip
          class="box-item"
          content="Left Bottom prompts info"
          placement="left-end"
        >
          <SiButton>left-end</SiButton>
        </SiTooltip>
        <SiTooltip
          class="box-item"
          content="Right Bottom prompts info"
          placement="right-end"
        >
          <SiButton>right-end</SiButton>
        </SiTooltip>
      </div>
      <div class="row center">
        <SiTooltip
          class="box-item"
          content="Bottom Left prompts info"
          placement="bottom-start"
        >
          <SiButton>bottom-start</SiButton>
        </SiTooltip>
        <SiTooltip
          class="box-item"
          content="Bottom Center prompts info"
          placement="bottom"
        >
          <SiButton>bottom</SiButton>
        </SiTooltip>
        <SiTooltip
          class="box-item"
          content="Bottom Right prompts info"
          placement="bottom-end"
        >
          <SiButton>bottom-end</SiButton>
        </SiTooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tooltip-base-box {
  width: 600px;
}
.row {
  display: flex;
  justify-content: space-between;
}
.center {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.box-item {
  margin: 10px 10px;
}
</style>
