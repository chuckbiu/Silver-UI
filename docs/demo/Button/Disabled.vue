<script lang="ts" setup>
import SiButton from '@/components/Button/Button.vue'
</script>

<template>
  <div>
    <div class="button-row">
      <SiButton disabled>
        Default
      </SiButton>
      <SiButton type="primary" disabled>
        Primary
      </SiButton>
      <SiButton type="success" disabled>
        Success
      </SiButton>
      <SiButton type="info" disabled>
        Info
      </SiButton>
      <SiButton type="warning" disabled>
        Warning
      </SiButton>
      <SiButton type="danger" disabled>
        Danger
      </SiButton>
    </div>
    <div class="button-row">
      <SiButton plain disabled>
        Plain
      </SiButton>
      <SiButton type="primary" plain disabled>
        Primary
      </SiButton>
      <SiButton type="success" plain disabled>
        Success
      </SiButton>
      <SiButton type="info" plain disabled>
        Info
      </SiButton>
      <SiButton type="warning" plain disabled>
        Warning
      </SiButton>
      <SiButton type="danger" plain disabled>
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
