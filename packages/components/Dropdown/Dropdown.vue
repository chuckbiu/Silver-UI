<script lang="ts" setup>
import type { Options } from '@popperjs/core'
import { reactive, ref } from 'vue'
import type { Ref } from 'vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import type {
  DropdownEmits,
  DropdownInstance,
  DropdownProps,
  MenuOption,
} from './types'
// RenderVnode
import RenderVode from '@/hooks/RenderVnode'
import type { TooltipInstance } from '@/components/Tooltip/type.ts'

defineOptions({
  name: 'si-dropdown',
})

// props
const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true,
})

// emits
const emit = defineEmits<DropdownEmits>()

// tooltipRef 实例
// 第一种写法
// const tooltipRef = ref<TooltipInstance | null>(null);
// 第二种写法
const tooltipRef = ref() as Ref<TooltipInstance>

const optionsTooltips: Partial<Options> = reactive({
  placement: 'bottom',
  strategy: 'fixed',
})
// 作为中间层传递作用
function visibleChange(e: boolean) {
  emit('visibleChange', e)
}
function itemClick(e: MenuOption) {
  // 假如是否禁用
  if (e.disabled) {
    return
  }
  emit('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}
defineExpose<DropdownInstance>({
  show: tooltipRef.value?.show,
  close: tooltipRef.value?.hide,
})
</script>

<template>
  <div class="si-dropdown">
    <Tooltip
      ref="tooltipRef"
      trigger="click"
      :popper-options="optionsTooltips"
      :open-delay="1000"
      :close-delay="1000"
      @visable-change="visibleChange"
    >
      <slot />
      <!-- 循环列表结构 -->
      <template #content>
        <ul class="si-dropdown__menu">
          <!-- template 可以生成空节点 -->
          <template v-for="item in props.menuOption" :key="item.key">
            <li
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            />
            <li
              :id="`dropdown-item-${item.key}`"
              class="si-dropdown__item"
              :class="{
                'is-diabled': item.disabled,
                'is-divided': item.divided,
              }"
              @click="itemClick(item)"
            >
              <RenderVode :v-node="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<style lang="css" scoped>
 .si-dropdown__menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
  .si-dropdown__item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    list-style: none;
    line-height: 22px;
    padding: 5px 16px;
    margin: 0;
    font-size: var(--si-font-size-base);
    color: var(--si-text-color-regular);
    cursor: pointer;
    outline: none;
    &:hover {
      background-color: var(--si-dropdown-menuItem-hover-fill);
      color: var(--si-dropdown-menuItem-hover-color);
    }
    &.is-disabled {
      color: var(--si-dropdown-menuItem-disabled-color);
      cursor: not-allowed;
      background-image: none;
    }
  }
  .divided-placeholder {
    margin: 6px 0;
    border-top: 1px solid var(--si-dropdown-menuItem-divided-color);
  }
}
</style>
