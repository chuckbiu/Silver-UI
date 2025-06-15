<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ButtonInstance } from 'sliver-ui'
import { SiButton, SiCollapse, SiCollapseItem, SIcon } from 'sliver-ui'

const buttonRef = ref<ButtonInstance | null>(null)
const openValue = ref(['1-1'])
onMounted(() => {
  if (buttonRef.value) {
    console.log('app mounted', buttonRef.value.ref)
  }
  // 当异步处理openValue
  setTimeout(() => {
    openValue.value = ['2-1', '1-1']
  }, 2000)
})
</script>

<template>
  <!-- Add the style and icon you want using the Array format -->
  <div>
    <SButton ref="buttonRef">
      default
    </SButton>
    <SButton type="primary" disabled>
      primary
    </SButton>

    <SButton type="primary" loading>
      loading
    </SButton>

    <SButton type="success">
      success
    </SButton>
    <SButton type="info">
      info
    </SButton>
    <SButton type="warning">
      warning
    </SButton>
    <SButton type="danger" disabled>
      danger
    </SButton>
    <br>
    <br>
    <SButton ref="buttonRef" plain>
      default
    </SButton>
    <SButton plain type="primary">
      primary
    </SButton>
    <SButton plain type="success">
      success
    </SButton>
    <SButton plain type="info">
      info
    </SButton>
    <SButton plain type="warning">
      warning
    </SButton>
    <SButton plain type="danger">
      danger
    </SButton>
    <br>
    <br>

    <SButton round>
      Round
    </SButton>
    <SButton round type="primary">
      primary
    </SButton>
    <SButton round type="success">
      success
    </SButton>
    <SButton round type="info">
      info
    </SButton>
    <SButton round type="warning">
      warning
    </SButton>
    <SButton round type="danger">
      danger
    </SButton>
    <br>
    <br>

    <!--  size -->
    <SButton size="large">
      large
    </SButton>
    <SButton>
      default
    </SButton>
    <SButton size="small">
      small
    </SButton>

    <br>

    <SCollapse v-model="openValue" accordion>
      <SCollapseItem title="Title A" name="1-1">
        <p>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </p>
      </SCollapseItem>
      <SCollapseItem name="2-1">
        <template #title>
          <h2>Title B</h2>
        </template>
        <h2>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </h2>
      </SCollapseItem>
      <SCollapseItem name="2-2" disabled>
        <template #title>
          <h2> Title C</h2>
        </template>
        <h2>headline title</h2>
        <div>
          this is content  a aaa
        </div>
      </SCollapseItem>
    </SCollapse>
  </div>
</template>
