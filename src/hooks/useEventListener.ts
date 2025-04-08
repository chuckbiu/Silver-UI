import { onBeforeUnmount, onMounted, isRef, watch, unref} from "vue";
import type { Ref } from "vue";
// EventTarget 适用于 所以事件类型的类型 定义
export default function useEventListener(
  target:  Ref<EventTarget | null> | EventTarget,
  event: string, // 事件名称
  handler: (e: Event) => any
) {

  if (isRef(target)) {
    // 是的话，得watch一下， 因为一开始可能为null
    watch(target, (value, oldValue) => {
      oldValue?.removeEventListener(event, handler)
      value?.addEventListener(event, handler)
    })

  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }


  // 卸载之前就弄掉
  onBeforeUnmount(() => {
    // unref | 是ref类型则获取值， 不是则是 本身 target
    unref(target)?.removeEventListener(event, handler)
  })
}
