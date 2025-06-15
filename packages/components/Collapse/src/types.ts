import type { InjectionKey, Ref } from 'vue'

export type NameType = string | number
// 父组件属性
export interface CollapsedefineProps {
  modelValue: NameType[]
  // 是否打开手风琴模式
  accordion?: boolean
}
export interface CollapsedefineEmits {
  (e: 'update:modelValue', value: NameType[]): void
  (e: 'change', value: NameType[]): void
}
// 子组件属性
export interface CollapseItemProps {
  name: NameType
  disabled?: boolean
  title?: string
}
// 创建一个context
export interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleHeaderClick: (name: NameType) => void
}
// 创建key
export const collapseInjectionKey = Symbol() as InjectionKey<CollapseContext>
