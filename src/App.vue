<script setup lang="ts">
import { h, onMounted, reactive, ref } from 'vue'
import SiTooltip from './components/Tooltip/Tooltip.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import type { Options } from './components/Tooltip/types'
import type { MenuOption } from '@/components/Dropdown/types'
import SiButton from '@/components/Button/Button.vue'
import SiIcon from '@/components/Icon/Icon.vue'
import Button from '@/components/Button/Button.vue'
import type { ButtonInstance } from '@/components/Button/types.ts'
import type { TooltipInstance } from '@/components/Tooltip/type.ts'
import Dropdown from '@/components/Dropdown/Dropdown.tsx'
// button
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const openValue = ref(['1-1'])
const changeTrigger = ref('click')
// tooltips
const optionsTooltips: Partial<Options> = reactive({
  placement: 'bottom',
  strategy: 'fixed',
})
// dropdown
const options: MenuOption[] = [
  { key: 1, label: 'Action 1' },
  { key: 2, label: 'Action 2', disabled: true },
  { key: 3, label: 'Action 3' },
  { key: 4, label: 'Action 4', divided: true },
]
function open() {
  tooltipRef.value?.show()
}
function close() {
  tooltipRef.value?.hide()
}
function inlineConsole(...args: any) {
  console.log(...args)
}
onMounted(() => {
  // if (buttonRef.value) {
  //   console.log("app mounted", buttonRef.value.ref);
  // }
})
</script>

<template>
  <div>
    <div v-if="true">
      <!-- Add the style and icon you want using the Array format -->
      <Button ref="buttonRef" @click="open">
        default
      </Button>
      <Button type="primary" @click="close">
        primary
      </Button>
    </div>

    <div>
      <Dropdown
        ref="tooltipRef"
        :menu-options="options"
        :popper-options="optionsTooltips"
        trigger="hover"
        @visible-change="(e) => inlineConsole('visible change', e)"
        @select="(e) => inlineConsole('select', e)"
      >
        <span class="si-dropdown-link">
          Dropdown List
          <SiIcon icon="fa-chevron-down" class="si-icon--right" />
        </span>
      </Dropdown>
    </div>
  </div>
</template>

<style scoped>
.btn {
  width: 200px;
  display: block;
}
.si-dropdown-link {
  cursor: pointer;
  color: var(--si-color-primary);
  display: flex;
  align-items: center;
}
.si-icon--right {
  margin-left: 5px;
}
</style>
