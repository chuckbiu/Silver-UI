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
    <Button  >
      success
    </Button>
    <Button  >
      info
    </Button>
    <Button  >
      warning
    </Button>
    <Button  ref="buttonRef">
      danger
    </Button>
  <br>
  <Button  ref="buttonRef" >
    default
  </Button>
  <Button  >
    primary
  </Button>
  <Button  >
    success
  </Button>
  <Button  >
    info
  </Button>
  <Button  >
    warning
  </Button>
  <Button  >
    danger
  </Button>
  <br>
  <Button   round>
    Round
  </Button>
  <Button  >
    primary
  </Button>
  <Button  >
    success
  </Button>
  <Button  >
    info
  </Button>
  <Button  >
    warning
  </Button>
  <Button  >
    danger
  </Button>
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
