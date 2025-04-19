import type { VNode } from 'vue'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  // v-model
  modelValue: string
  disabled?: boolean // 禁用
  size?: 'large' | 'small'
  clearable?: boolean // 清除按钮
  // 选项
  options?: SelectOption[]
  // 提示
  placeholder?: string
  // 自定义模板
  renderLabel?: RenderLabelFunc
  // 过滤
  filterable?: boolean
  // 自定义过滤
  filterMethod?: CustomFilterFunc
  // 远程
  remote?: boolean
  // 远程事件
  remoteMethod?: CustomFilterRemoteFunc
}

export interface SelectEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  // 组件触发事件
  (e: 'visibleChange', value: boolean): void
  // 清空事件
  (e: 'clear'): void

}
/**
 * 选项状态
 */
export interface SelectStatus {
  inputValue: string
  selectedOption: null | SelectOption
  mouseHover: boolean
  loading: boolean
  highlightIndex: number
}
/**
 * 自定义模板 类型
 */
export type RenderLabelFunc = (option: SelectOption) => VNode
export type CustomFilterFunc = (value: string) => SelectOption[]
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>
