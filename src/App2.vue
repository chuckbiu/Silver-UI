<script setup lang="ts">
import Button from './components/Button/Button.vue'
import VNode from './VNode.tsx'

defineExpose({
  name: 'button',
})
</script>

<template>
  <div>
    <Button>button</Button>
    <div>
      <VNode msg="button" />
    </div>
  </div>
</template>
