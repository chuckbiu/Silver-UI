import type { InjectionKey } from 'vue'
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'

export interface FormItemProps {
  label?: string
  prop?: string
}
export type FormRules = Record<string, RuleItem[]>

export interface FormProps {
  model?: Record<string, any>
  rules?: Record<string, any>
}
export interface FormItemRule extends RuleItem {
  trigger?: string
}
export interface FormContext extends FormProps {
  addField?: (field: FormITemContext) => void
  removeField?: (field: FormITemContext) => void
}

export interface ValidateStatusProp {
  state: 'init' | 'success' | 'error'
  errorMsg?: string
  loading?: boolean
}

// 定义错误类型 Record
export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}
export interface FormITemContext {
  prop: string
  validate: (trigger?: string) => Promise<any>
  resetField: () => void
  clearValidate: () => void
}
export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormITemContext> = Symbol('formItemContextKey')
// 定义 Form 实例接口
export interface FormInstance {
  validate: () => Promise<any>
  resetFields: (props?: string[]) => void
  clearValidate: (props?: string[]) => void
}
// 定义 FormItem 实例接口
export interface FormItemInstance {
  validate: (trigger?: string) => Promise<any>
  resetField: () => void
  clearValidate: () => void
  validateStatus: ValidateStatusProp
}
