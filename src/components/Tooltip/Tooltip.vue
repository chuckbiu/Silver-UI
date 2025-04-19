<script lang="ts" setup>
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import { createPopper } from '@popperjs/core'
// 导出 实例类型
import type { Instance } from '@popperjs/core'
import { debounce } from 'lodash-es'
import useClickoutside from '../../hooks/useClickOutside'
import type { TooltipEmits, TooltipInstance, TooltipProps } from './types'

defineOptions({
  name: 'si-tooltip',
})

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  openDelay: 200,
  closeDelay: 200,
  transtion: 'fade',
})
const emit = defineEmits<TooltipEmits>()
const openDelay = ref(0)
const closeDelay = ref(0)

// 触发节点
const TooltipTriggerRef = ref<HTMLElement>()
// 展示节点
const TooltipPropperRef = ref<HTMLElement>()
// 总结点
const TooltipRef = ref<HTMLElement>()
// 触发实例
// const triggerInstance: Instance | null = null
// 展示实例
let propperInstance: Instance | null = null
// 弹窗是否显示
const Tooltipvisible = ref(false)
// 事件注册 Record<string, any>  限制对象里的 键值
let triggerEventListener: Record<string, any> = reactive({})
let tooltipEventListener: Record<string, any> = reactive({})
// popper 参数
const popperOptions = computed(() => {
  return {
    placement: props.placement,
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

// 当鼠标进入时触发
function open() {
  openDelay.value++
  // console.log('open', openDelay.value)
  Tooltipvisible.value = true
  // 派发出去对应事件;
  emit('visibleChange', true)
}

// 当鼠标离开时触发
function close() {
  closeDelay.value++
  // console.log('close', closeDelay.value)
  Tooltipvisible.value = false
  // 派发出去对应事件
  emit('visibleChange', false)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)
/**
 * 因为当你多次hover的时候，他会执行，因此我们希望hover目标盒子时，删除未调用的函数
 */
function openFinal() {
  closeDebounce.cancel()
  openDebounce()
}
function closeFinal() {
  openDebounce.cancel()
  closeDebounce()
}

// 对应取反 点击事件
function triggerPopper() {
  Tooltipvisible.value = !Tooltipvisible.value
  // 派发出去对应事件
  emit('visibleChange', Tooltipvisible.value)
  /**
   * if (Tooltipvisible.value){
   *    closeFinal()
   * } else {
   *    openFinal()
   * }
   */
}
useClickoutside(TooltipRef, () => {
  if (props.trigger === 'click' && Tooltipvisible.value && !props.manual) {
    closeFinal()
  }
})
function attachEvents() {
  // 当触发方式为点击时
  if (props.trigger === 'click') {
    // 动态添加 click 事件
    triggerEventListener.click = triggerPopper
  } else if (props.trigger === 'hover') {
    // mouseover
    triggerEventListener.mouseenter = openFinal
    triggerEventListener.mouseleave = (e: MouseEvent) => {
      // 如果鼠标进入了 Popper，就不关闭
      if (!TooltipPropperRef.value?.contains(e.relatedTarget as Node)) {
        closeFinal()
      }
    }

    // Popper 区域事件
    tooltipEventListener.mouseenter = openFinal // 鼠标进入 Popper 时保持显示
    tooltipEventListener.mouseleave = closeFinal // 鼠标离开 Popper 时才关闭
  }
}
if (!props.manual) {
  // 首次渲染
  attachEvents()
}
/** 观察 manual */
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      triggerEventListener = {}
      tooltipEventListener = {}
    } else {
      attachEvents()
    }
  },
)
watch(
  Tooltipvisible,
  (newValue) => {
    // 假如为true 显示得时候
    if (newValue) {
      // 两个节点都得存在
      if (TooltipPropperRef.value && TooltipTriggerRef.value) {
        propperInstance = createPopper(
          TooltipTriggerRef.value,
          TooltipPropperRef.value,
          popperOptions.value,
        )
      } else {
        // 隐藏得时候 需要实例销毁
        propperInstance?.destroy()
      }
    }
  },
  {
    // dom节点生成之后 调用
    flush: 'post',
  },
)
watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      // 两者不一样时
      triggerEventListener = {}
      tooltipEventListener = {}
      attachEvents()
    }
  },
)
onUnmounted(() => {
  propperInstance?.destroy()
})
// 暴露出实例 具有打开或控制
defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
})

// onMounted(() => {
//   attachEvents();
// });
</script>

<template>
  <div ref="TooltipRef" class="si-tooltip" v-on="tooltipEventListener">
    <div
      ref="TooltipTriggerRef"
      class="si-tooltip__trigger"
      v-on="triggerEventListener"
    >
      <!-- 外部 -->
      <slot />
    </div>
    <Transition :name="transtion">
      <div
        v-if="Tooltipvisible"
        ref="TooltipPropperRef"
        class="si-tooltip__popper"
      >
        <!-- 内容自定义 -->
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow />
      </div>
    </Transition>
  </div>
</template>
