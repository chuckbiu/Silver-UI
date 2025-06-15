import { h, render, shallowReactive } from 'vue'
import type { CreateMessageProps, MeassageContext } from './types'
import Message from './Message.vue'

let seed = 1
/**
 * 和 reactive() 不同，这里没有深层级的转换：一个浅层响应式对象里只有根级别的属性是响应式的。
 * 属性的值会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了。
 */
const instances: MeassageContext[] = shallowReactive([]) // 保存 该列表的数组
function createMessage(props: CreateMessageProps) {
  const id = `message_${seed++}`
  const divelement = document.createElement('div')

  const destory = () => {
    // 删除数组的实例
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx === -1)
      return
    instances.splice(idx, 1)
    // 不显示的时候需销毁
    render(null, divelement)
    divelement.remove()
  }
  /**
   * 手动调用删除，其实就是手动的调整组件中isVisible的值
   * isVisible 是通过 expose 传出来的
   */
  const manualDestory = () => {
    // find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      instance.vm.exposed!.isVisible.value = false
    }
  }
  const newProps = {
    ...props,
    id,
    zIndex: 2000,
    onDestory: destory,
  }
  // 组件节点
  const MessageconstructorVnode = h(Message, newProps)

  console.log(MessageconstructorVnode)
  // 渲染
  render(MessageconstructorVnode, divelement)

  // 使用一个非空断言
  document.body.appendChild(divelement)

  // 获取内部的实例
  const vm = MessageconstructorVnode.component!

  // 创建一个实例
  const instance = {
    id,
    vnode: MessageconstructorVnode,
    props: newProps,
    vm,
    destory: manualDestory,
  }
  // 插入数组
  instances.push(instance)
  return instance
}
// 获取数组最后一项
export function getLastInstance() {
  console.log(instances)
  return instances.at(-1) // 获取数组最后一项
}
export function getLastBottomOffset(id: string) {
  // 传入id
  /**
   * findIndex() 方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1。
   * @params findIndex(callbackFn, thisArg)
   *
   */
  const idx = instances.findIndex(instance => instance.id === id)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    // 这里的vm 获取到的是异步 得组件更新好之后 才能获取
    return prev.vm.exposed!.bottomOffset.value
  }
}
export default createMessage
