<script lang="ts" setup>
import { ref } from 'vue'
import SiInput from '@/components/Input/Input.vue'
import Icon from '@/components/Icon/Icon.vue'

const input1 = ref('')
const input2 = ref('')
</script>

<template>
  <div style="width: 240px;">
    <SiInput v-model="input1" placeholder="Please input">
      <template #prepend>
        Http://
      </template>
    </SiInput>
    <hr>
    <SiInput v-model="input2" placeholder="Please input">
      <template #append>
        .com
      </template>
    </SiInput>
  </div>
</template>
