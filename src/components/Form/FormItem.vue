<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, provide, reactive } from 'vue'
import { isNil } from 'lodash'
import Schema from 'async-validator'
import { formContextKey, formItemContextKey } from './types'
import type { FormITemContext, FormItemProps, FormValidateFailure, ValidateStatusProp, FormItemInstance} from './types'
import { clear } from 'console'

const props = defineProps<FormItemProps>()

const formContext = inject(formContextKey)

const validateStatus: ValidateStatusProp = reactive({
  state: 'init',
  errorMsg: '',
  loading: false,
})

const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
})
// 初始化变量
let initialValue: any = null
const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})
// 清除函数
function clearValidate() {
  validateStatus.state = 'init'
  validateStatus.errorMsg = ''
  validateStatus.loading = false
}
// 恢复最初的值
const resetField = () => {
  clearValidate()
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue
  }
}
function getTriggerRules(trigger?: string) {
  const rules = itemRules.value
  if (rules) {
    return rules.filter((rule) => {
      if (!trigger || !rule.trigger) {
        return true
      } else {
        return rule.trigger && rule.trigger === trigger
      }
    })
  } else {
    return rules
  }
}
// 是否必填
const isRequired = computed(() => {
  const rules = itemRules.value
  return rules.some((rule) => rule.required)
})
// 验证函数
async function validate(trigger?: string) {
  const modelName = props.prop
  const triggeredRules = getTriggerRules(trigger)
  if (triggeredRules.length === 0) {
    return true
  }
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggeredRules,
    })
    validateStatus.loading = true
    return validator.validate({
      [modelName]: innerValue.value,
    }).then(() => {
      validateStatus.state = 'success'
    }).catch((e: FormValidateFailure) => {
      const { errors } = e
      validateStatus.state = 'error'
      validateStatus.errorMsg = (errors && errors.length > 0) ? errors[0].message || '' : ''
      return Promise.reject(e)
    }).finally(() => {
      validateStatus.loading = false
    })
  }
}
const context: FormITemContext = {
  validate,
  prop: props.prop || '',
  clearValidate,
  resetField,
}

provide(formItemContextKey, context)

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initialValue = innerValue.value
  }
})
onUnmounted(() => {
  if (props.prop) {
    formContext?.removeField(context)
  }
})
defineExpose<FormItemInstance>({
  validate,
  validateStatus,
  resetField,
  clearValidate,
})
</script>

<template>
  <div
    class="si-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired,
    }"
  >
    <label class="si-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="si-form-item__content">
      <slot />
      <div v-if="validateStatus.state === 'error'" class="si-form-item__error-msg">
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>
