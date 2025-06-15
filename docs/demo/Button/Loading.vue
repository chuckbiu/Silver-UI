<script lang="ts" setup>
import SiButton from '@/components/Button/Button.vue'
</script>

<template>
  <div>
    <div class="button-row">
      <SiButton loading>
        Loading
      </SiButton>
      <SiButton type="primary" loading>
        Loading
      </SiButton>
      <SiButton type="success" loading>
        Loading
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
