<script setup lang="ts">

import Button  from "@/components/Button/Button.vue";
import { onMounted, ref} from "vue";
import type {ButtonInstance} from "@/components/Button/types.ts";
const buttonRef = ref< ButtonInstance | null>(null)
onMounted(()=>{
    if (buttonRef.value) {
      console.log('app mounted', buttonRef.value.ref)
    }
})
</script>

<template>
    <Button  ref="buttonRef">
       default
    </Button>
    <Button  type="primary">
      primary
    </Button>
    <Button  type="success">
      success
    </Button>
    <Button  type="info">
      info
    </Button>
    <Button  type="warning">
      warning
    </Button>
    <Button  type="danger">
      danger
    </Button>
    <br>

  <br>
  <Button  ref="buttonRef" plain>
    default
  </Button>
  <Button  plain type="primary">
    primary
  </Button>
  <Button  plain type="success">
    success
  </Button>
  <Button  plain type="info">
    info
  </Button>
  <Button  plain type="warning">
    warning
  </Button>
  <Button plain type="danger" >
    danger
  </Button>
  <br>
  <br>

  <Button   round>
    Round
  </Button>
  <Button  round type="primary">
    primary
  </Button>
  <Button  round type="success">
    success
  </Button>
  <Button  round type="info">
    info
  </Button>
  <Button round type="warning" >
    warning
  </Button>
  <Button  round type="danger">
    danger
  </Button>
  <br>
  <br>

<!--  size-->
  <Button size="large">
    large
  </Button>
  <Button  >
    default
  </Button>
  <Button  size="small">
    small
  </Button>
</template>

<style scoped>

</style>
