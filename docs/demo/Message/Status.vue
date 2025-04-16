<script lang="ts" setup>
import createMessage from '@/components/Message/method'
import SiButton from '@/components/Button/Button.vue'

function open1() {
  createMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
function open2() {
  createMessage({
    message: 'Congrats, this is a warning message.',
    type: 'warning',
  })
}
function open3() {
  createMessage({
    message: 'Warning, this is a info message.',
    type: 'info',
  })
}
function open4() {
  createMessage({
    message: 'Congrats, this is a danger message.',
    type: 'danger',
  })
}
</script>

<template>
  <div>
    <SiButton plain @click="open2">
      warning
    </SiButton>
    <SiButton plain @click="open3">
      info
    </SiButton>
    <SiButton plain @click="open1">
      Success
    </SiButton>
    <SiButton plain @click="open4">
      danger
    </SiButton>
  </div>
</template>
