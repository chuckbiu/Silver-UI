<script lang="ts" setup>
import { debounce } from 'lodash-es'
import { createPopper } from '@popperjs/core'
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import type { Instance } from '@popperjs/core'
import useClickOutside from '../../hooks/useClickOutside.ts'
import type { TooltipEmits, TooltipInstance, TooltipProps } from './type.ts'
// 父组件传进来的值
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  openDelay: 0,
  closeDelay: 0,
})
// 子组件触发事件
const emit = defineEmits<TooltipEmits>()
// 创建节点
const TooltipNode = ref<HTMLElement | undefined>(undefined)
// 创建两个node节点
const TNode = ref<HTMLElement | null>(null)
const PNode = ref<HTMLElement | null>(null)
let propperInstance: null | Instance = null
// 弹窗是否展示
const isOpen = ref(false)
let openTimes = 0
let closeTimes = 0
const popperOptions = computed(() => {
  return {
    placements: props.placement,
    ...props.popperOptions,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  }
})
// hover
function open() {
  openTimes++
  console.log('open times', openTimes)
  isOpen.value = true
  emit('visibleChange', true)
}
function close() {
  closeTimes++
  console.log('close times', closeTimes)
  isOpen.value = false
  emit('visibleChange', false)
}
const opendebounce = debounce(open, props.openDelay)
const closedebounce = debounce(close, props.closeDelay)

function openFinal() {
  closedebounce.cancel()
  opendebounce()
}
function closeFinal() {
  opendebounce.cancel()
  closedebounce()
}
// 组件触发点击
function triggerClick() {
  // isOpen.value = !isOpen.value;
  // emit("visible-change", isOpen.value);
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}
// 定义事件监听器
let Tooltipevents: Record<string, any> = reactive({})
let smallTooltipevents: Record<string, any> = reactive({})

// 组件初次渲染 开始注册事件
function attachEvents() {
  if (props.trigger === 'click') {
    smallTooltipevents.click = triggerClick
  } else if (props.trigger === 'hover') {
    smallTooltipevents.mouseenter = openFinal
    Tooltipevents.mouseleave = closeFinal
  }
}

if (!props.manual) {
  attachEvents()
}

useClickOutside(TooltipNode, () => {
  // if (isOpen.value && PNode.value) {
  //   isOpen.value = !isOpen.value;
  // }
  if (isOpen.value && props.trigger === 'click' && !props.manual) {
    close()
  }
})

watch(() => props.manual, (isManual) => {
  if (isManual) {
    Tooltipevents = {}
    smallTooltipevents = {}
  } else {
    attachEvents()
  }
})

watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (TNode.value && PNode.value) {
        // 根据两个节点都存在创建对应实例
        propperInstance = createPopper(TNode.value, PNode.value, {
          ...popperOptions.value,
        })
      }
    } else {
      // 没有显示就销毁对应实例
      propperInstance?.destroy()
    }
  },
  {
    flush: 'post',
  },
)
// 选项期望接受一个对象，其中键是需要侦听的响应式组件实例属性
watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      Tooltipevents = {}
      smallTooltipevents = {}
      attachEvents()
    }
  },
)
// 组件卸载执行
onUnmounted(() => {
  Tooltipevents = {}
  smallTooltipevents = {}
})

// 暴露出实例

defineExpose<TooltipInstance>({
  show: open,
  hide: close,
})
</script>

<template>
  <div ref="TooltipNode" class="si-tooltip" v-on="Tooltipevents">
    <div ref="TNode" class="si-tooltip__trigger" v-on="smallTooltipevents">
      <slot />
    </div>
    <Transition name="fade">
      <div v-if="isOpen" ref="PNode" class="si-tooltip__popper">
        <slot name="content">
          {{ props.content }}
        </slot>
        <div id="arrow" data-popper-arrow />
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
