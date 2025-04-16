<script lang="ts" setup>
import { h } from 'vue'
import createMessage from '@/components/Message/method'
import SiButton from '@/components/Button/Button.vue'

function open() {
  createMessage({
    message: 'This is a message.',
  })
}

function openVn() {
  createMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}
</script>

<template>
  <div>
    <SiButton plain @click="open">
      Show message
    </SiButton>
    <SiButton plain @click="openVn">
      VNode
    </SiButton>
  </div>
</template>
