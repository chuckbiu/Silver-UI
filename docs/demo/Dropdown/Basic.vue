<script lang="ts" setup>
import SiDropdown from '@/components/Dropdown/Dropdown.tsx'
import type { MenuOption } from '@/components/Dropdown/types'
import Icon from '@/components/Icon/Icon.vue'

const options: MenuOption[] = [
  { key: 1, label: 'Action 1' },
  { key: 2, label: 'Action 2', disabled: true },
  { key: 3, label: 'Action 3' },
  { key: 4, label: 'Action 4', divided: true },
]
</script>

<template>
  <div>
    <SiDropdown
      :menu-options="options"
      trigger="hover"
    >
      <span class="si-dropdown-link">
        Dropdown List
        <Icon icon="fa-chevron-down" class="si-icon--right" />
      </span>
    </SiDropdown>
  </div>
</template>

<style>
.si-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #38bdf8;
}
.si-icon--right {
  margin-left: 5px;
}
</style>
