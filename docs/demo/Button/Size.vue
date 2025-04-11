<script lang="ts" setup>
import SiButton from '@/components/Button/Button.vue'
</script>

<template>
  <div>
    <div class="button-row">
      <SiButton size="large">
        Large
      </SiButton>
      <SiButton>Default</SiButton>
      <SiButton size="small">
        Small
      </SiButton>
    </div>
    <div class="button-row">
      <SiButton size="large" type="primary">
        Large
      </SiButton>
      <SiButton type="primary">
        Default
      </SiButton>
      <SiButton size="small" type="primary">
        Small
      </SiButton>
    </div>
    <div class="button-row">
      <SiButton size="large" type="primary" round>
        Large
      </SiButton>
      <SiButton type="primary" round>
        Default
      </SiButton>
      <SiButton size="small" type="primary" round>
        Small
      </SiButton>
    </div>
  </div>
</template>

<style>
.button-row {
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
