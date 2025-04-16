<script lang="ts" setup>
import createMessage from '@/components/Message/method'
import SiButton from '@/components/Button/Button.vue'

function open() {
  createMessage({
    message: 'This is a message.',
    duration: 1000,
  })
}
</script>

<template>
  <div>
    <SiButton plain @click="open">
      Show duration
    </SiButton>
  </div>
</template>
