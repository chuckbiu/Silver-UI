import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
// Element: Ref<HTMLElement | undefined> 响应式节点 Ref 为 ref 的返回值
function useClickoutside(Element: Ref<HTMLElement | undefined>, callback: (e: MouseEvent) => void) {
  function handler(e: MouseEvent) {
    // e.target 当前点击节点
    if (e.target && Element.value) {
      // 不是该目标节点的后代就可以触发
      if (!Element.value.contains(e.target as HTMLElement)) {
        // 点击到外侧 就执行函数
        callback(e)
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickoutside
