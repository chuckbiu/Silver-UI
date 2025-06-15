import type { Options } from '@popperjs/core'

export interface TooltipProps {
  content?: string // 内容
  placement?: Placement // 偏移
  Strategy?: Strategy // 位置
  trigger?: 'hover' | 'click' // 触发方式
  manual?: boolean // 是否手动触发
  openDelay?: number
  closeDelay?: number
  popperOptions?: Partial<Options> // popper 参数
  transtion?: string // 动画
}
export interface TooltipEmits {
  (e: 'visibleChange', val: boolean): void // 点击事件
}
// 暴露出具有两个实例方法的实例
export interface TooltipInstance {
  show: () => void
  hide: () => void
}

type Placement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end'
type Strategy = 'absolute' | 'fixed'
