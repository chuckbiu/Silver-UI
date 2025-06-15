<script lang="ts" setup>
import SiDropdown from '@/components/Dropdown/Dropdown.tsx'
import type { MenuOption } from '@/components/Dropdown/types'
import Icon from '@/components/Icon/Icon.vue'

const options: MenuOption[] = [
  { key: 1, label: 'Action 1' },
  { key: 2, label: 'Action 2' },
  { key: 3, label: 'Action 3' },
  { key: 4, label: 'Action 4' },
]
</script>

<template>
  <div class="trigger-layout">
    <div>
      <div>
        <span>hover to trigger</span>
      </div>
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
    <div>
      <div>
        <span>click to trigger</span>
      </div>
      <SiDropdown
        :menu-options="options"
        trigger="click"
      >
        <span class="si-dropdown-link">
          Dropdown List
          <Icon icon="fa-chevron-down" class="si-icon--right" />
        </span>
      </SiDropdown>
    </div>
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
.trigger-layout {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  justify-items: center;
}
</style>
