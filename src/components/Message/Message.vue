<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { MessageProps } from './types'
import { getLastBottomOffset } from './method'
import RenderVode from '@/hooks/RenderVnode'
import useEventListener from '@/hooks/useEventListener'
// getCurrentInstance 拿到本身组件内部实例

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up',
})
// 是否显示
const isVisible = ref(false)
const MessageRef = ref<HTMLElement | null>(null)
/**
 * 计算偏移高度
 * 这个div高度
 */
const height = ref(0)
// 上一个实例的最下面的坐标数字， 第一个是 0
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 这个元素应该使用的 top
const topOffset = computed(() => props.offset + lastOffset.value)
// 这个元素为下一个元素预留的offset ,也就是 它最低端bottom的值
const bottomOffset = computed(() => height.value + topOffset.value)

const cssStyle = computed(() => ({
  top: `${topOffset.value}px`,
  zIndex: props.zIndex,
}))
let timer: any
function startTimer() {
  if (props.duration === 0)
    return
  timer = setTimeout(() => {
    isVisible.value = false
  }, props.duration)
}
function closeTimer() {
  clearTimeout(timer)
}
onMounted(async () => {
  isVisible.value = true
  // 在这里的时候 dom节点还未更新开始
  startTimer()
  // await nextTick();
  // 这时我们才拿到更新之后的height的值
  // Element.getBoundingClientRect() 方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置。
  // height.value = MessageRef.value!.getBoundingClientRect().height;
})
function keydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    isVisible.value = false
  }
}
useEventListener(document, 'keydown', keydown)

// watch(isVisible, (newValue) => {
//   console.log("isVisible changed:", newValue);
//   if (!newValue) {
//     console.log(props);
//     props.onDestory();
//   }
// });
function destoryComponent() {
  props.onDestory()
}
function updateHeight() {
  height.value = MessageRef.value!.getBoundingClientRect().height
}
// onUnmounted(() => {

// })
defineExpose({
  bottomOffset,
  isVisible,
})
</script>

<template>
  <!--  HTML 和 Web 开发中，
    role 是一个 ARIA（Accessible Rich Internet Applications） 属性，
    用于定义元素的角色或用途，帮助辅助技术（如屏幕阅读器）更好地理解页面内容，提升网页的可访问性。
    role="alert" 为元素赋予了明确的语义，告诉浏览器和辅助技术这是一个重要的通知区域。
    -->
  <Transition :name="props.transitionName" @after-leave="destoryComponent" @enter="updateHeight">
    <div
      v-show="isVisible"
      ref="MessageRef"
      class="si-message"
      role="alert"
      :class="[`si-message--${type}`, { ['is-close']: showclose }]"
      :style="cssStyle"
      @mouseleave="startTimer"
      @mouseenter="closeTimer"
    >
      <div class="si-message__content">
        <!-- {{ offset }} - {{ topOffset }} - {{ height }} - {{ bottomOffset }} -->
        <RenderVode v-if="message" :vnode="message" />
      </div>
      <div v-if="showclose" class="si-message__close">
        <Icon icon="xmark" @click.stop="isVisible = false" />
      </div>
    </div>
  </Transition>
</template>
