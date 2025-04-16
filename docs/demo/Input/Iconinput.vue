<script lang="ts" setup>
import { ref } from 'vue'
import SiInput from '@/components/Input/Input.vue'
import Icon from '@/components/Icon/Icon.vue'

const input3 = ref('')
const input4 = ref('')
</script>

<template>
  <div style="width: 240px;">
    <span>Using slots</span>
    <hr>
    <SiInput v-model="input3" placeholder="Pick a date">
      <template #suffix>
        <Icon icon="fa-calendar" />
      </template>
    </SiInput>
    <hr>
    <SiInput v-model="input4" placeholder="Type something">
      <template #prefix>
        <Icon icon="fa-magnifying-glass" />
      </template>
    </SiInput>
  </div>
</template>
