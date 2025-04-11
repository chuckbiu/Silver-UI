<script lang="ts" setup>
import SiButton from '@/components/Button/Button.vue'
</script>

<template>
  <div>
    <div class="button-row">
      <SiButton>Default</SiButton>
      <SiButton type="primary">
        Primary
      </SiButton>
      <SiButton type="success">
        Success
      </SiButton>
      <SiButton type="info">
        Info
      </SiButton>
      <SiButton type="warning">
        Warning
      </SiButton>
      <SiButton type="danger">
        Danger
      </SiButton>
    </div>
    <div class="button-row">
      <SiButton plain>
        Plain
      </SiButton>
      <SiButton type="primary" plain>
        Primary
      </SiButton>
      <SiButton type="success" plain>
        Success
      </SiButton>
      <SiButton type="info" plain>
        Info
      </SiButton>
      <SiButton type="warning" plain>
        Warning
      </SiButton>
      <SiButton type="danger" plain>
        Danger
      </SiButton>
    </div>
    <div class="button-row">
      <SiButton round>
        Round
      </SiButton>
      <SiButton type="primary" round>
        Primary
      </SiButton>
      <SiButton type="success" round>
        Success
      </SiButton>
      <SiButton type="info" round>
        Info
      </SiButton>
      <SiButton type="warning" round>
        Warning
      </SiButton>
      <SiButton type="danger" round>
        Danger
      </SiButton>
    </div>
  </div>
</template>

<style>
.button-row {
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
}
</style>
