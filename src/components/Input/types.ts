export interface InputProps {
  size?: 'small' | 'large';
  type?: string;
  clearable?: boolean;
  showPassword?: boolean;
  prefix?: string;
  suffix?: string;
  prepend?: string;
  append?: string;
  disabled?: boolean;
  modelValue: string;
  placeholder?: string; // 提示名
  readonly?: boolean; // 可读
  autocomplete?: string; //
  autofocus?: boolean; // 自动聚焦
  form?: string; // 该输入与之相关的 <form> 元素（即其表单所有者）
}
export interface InputEmits {
  (e: 'update:modelValue', value: string): void;
  // input的 input事件是指值有变化就算
  (e: 'input', value: string): void;
  // input的 值有变化，并且 失去了focus也就是blur
  (e: 'change', value: string): void;
  (e: 'focus', value: FocusEvent): void;
  (e: 'blur', value: FocusEvent): void;
  (e: 'clear'): void;
}

export interface InputInstance {
  clear: () => void;
  ref: HTMLInputElement | HTMLTextAreaElement;
}
