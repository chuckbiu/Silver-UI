<script lang="ts" setup>
import { reactive, ref } from 'vue'
import SiDropdown from '@/components/Dropdown/Dropdown.tsx'
import type { MenuOption } from '@/components/Dropdown/types'
import SiButton from '@/components/Button/Button.vue'
import type { Options } from '@/components/Tooltip/types'
import type { TooltipInstance } from '@/components/Tooltip/type.ts'

const dropdowRef = ref<TooltipInstance | null>(null)

const options: MenuOption[] = [
  { key: 1, label: 'Action 1' },
  { key: 2, label: 'Action 2', disabled: true },
  { key: 3, label: 'Action 3' },
  { key: 4, label: 'Action 4', divided: true },
]
const popperOptions: Partial<Options> = reactive({
  manual: true,
})
function showClick() {
  dropdowRef.value?.show()
}
function closeClick() {
  dropdowRef.value?.hide()
}
</script>

<template>
  <div>
    <div style="font-size: 14px">
      <p>open(close) the Dropdown list</p>
    </div>
    <div style="margin: 15px">
      <SiButton @click="showClick">
        show
      </SiButton>
      <SiButton @click="closeClick">
        hide
      </SiButton>
    </div>
    <SiDropdown
      ref="dropdowRef"
      :menu-options="options"
      trigger="hover"
      :popper-options="popperOptions"
    >
      <span class="si-dropdown-link">
        Dropdown List
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
