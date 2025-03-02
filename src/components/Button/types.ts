import type { PropType } from 'vue'
type type = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' ;
type size = 'small' | 'large';
type NativeType = 'button' | 'submit' | 'reset'

export interface  buttonProps {
  autofocus?: boolean,
  type?: type,
  size?: size,
  disabled?: boolean, // 是否禁用
  plain?: boolean, // 是否朴素按钮
  round?: boolean, // 是否圆角按钮
  circle?: boolean, // 是否圆形按钮
  nativeType?: NativeType
  loading?: boolean, // 是否加载中状态
  icon?: string, // 图标类名
}
export interface ButtonInstance{
  ref: HTMLButtonElement
}
