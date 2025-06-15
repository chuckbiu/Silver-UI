<script lang="ts" setup>
import SiDropdown from '@/components/Dropdown/Dropdown.tsx'
import type { MenuOption } from '@/components/Dropdown/types'
import SiButton from '@/components/Button/Button.vue'

const options: MenuOption[] = [
  { key: 1, label: 'The Action 1st' },
  { key: 2, label: 'The Action 2st' },
  { key: 3, label: 'The Action 3st' },
]
</script>

<template>
  <div class="position">
    <SiDropdown
      :menu-options="options"
      trigger="hover"
      placement="top-start"
    >
      <SiButton>topStart</SiButton>
    </SiDropdown>

    <SiDropdown
      :menu-options="options"
      trigger="hover"
      placement="top"
    >
      <SiButton>top</SiButton>
    </SiDropdown>
    <SiDropdown
      :menu-options="options"
      trigger="hover"
      placement="top-end"
    >
      <SiButton>topEnd</SiButton>
    </SiDropdown>
    <SiDropdown
      :menu-options="options"
      trigger="hover"
      placement="bottom-start"
    >
      <SiButton>bottomStart</SiButton>
    </SiDropdown>
    <SiDropdown
      :menu-options="options"
      trigger="hover"
      placement="bottom"
    >
      <SiButton>bottom</SiButton>
    </SiDropdown>
    <SiDropdown
      :menu-options="options"
      trigger="hover"
      placement="bottom-end"
    >
      <SiButton>bottomEnd</SiButton>
    </SiDropdown>
  </div>
</template>

<style>
.position {
  display: flex;
  justify-content: space-around;
}
</style>
