/**
 * 拓展点： modelValue 支持的不仅是boolean 还可以支持更多的类型：string 以及 number
 */
type valueType = boolean | string | number
export interface SwitchProps {
  modelValue: valueType; // 值
  size?: 'large' | 'small'; // 尺寸
  activeText?: string; // 设置开的文字描述
  inactiveText?: string; // 设置关的文字描述
  activeIcon?: string;  // 添加图标
  inactiveIcon?: string; // 添加图标
  activeValue?: valueType; // 扩展的 value 类型
  inactiveValue?: valueType;
  disabled?: boolean; // 禁用
  loading?: boolean;
  name?: string;
  id?: string;
}
export interface SwitchEmits {
  (e: 'change', value: valueType): void; // 切换函数
  (e: 'update:modelValue', value: valueType): void; // 支持v-model
}
