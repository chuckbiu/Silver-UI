<script lang="ts" setup>
import Icon from '@/components/Icon/Icon.vue'
</script>

<template>
  <div>
    <div class="icon-row">
      <Icon icon="fa-house" />
      <Icon icon="fa-circle-user" />
      <Icon icon="fa-user" />
      <Icon icon="fa-thumbs-up" />
      <Icon icon="fa-magnifying-glass" />
      <Icon icon="fa-arrow-right" />
      <Icon icon="fa-rotate-right" />
    </div>
    <div class="icon-row">
      <Icon icon="fa-house" type="primary" />
      <Icon icon="fa-circle-user" type="primary" />
      <Icon icon="fa-user" type="primary" />
      <Icon icon="fa-thumbs-up" type="primary" />
      <Icon icon="fa-magnifying-glass" type="primary" />
      <Icon icon="fa-arrow-right" type="primary" />
      <Icon icon="fa-rotate-right" type="primary" />
    </div>
  </div>
</template>

<style>
  .icon-row {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
}
</style>
