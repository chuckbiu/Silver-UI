<script lang="ts" setup>
import { provide } from 'vue'
import type { ValidateFieldsError } from 'async-validator'
import { formContextKey } from './types'
import type { FormContext, FormInstance, FormITemContext, FormProps, FormValidateFailure } from './types'

defineOptions({
  name: 'si-form',
})
const props = defineProps<FormProps>()

const fields: FormITemContext[] = []

const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}
const removeField: FormContext['removeField'] = (field) => {
  if (field) {
    const index = fields.indexOf(field)
    if (index !== -1) {
      fields.splice(index, 1)
    }
  }
}
function resetFields(keys: string[] = []) {
  const filterArr = keys.length > 0 ? fields.filter((field) => keys.includes(field.prop)) : fields
  for (const field of filterArr) {
    field.resetField()
  }
}
function clearValidate(keys: string[] = []) {
  const filterArr = keys.length > 0 ? fields.filter((field) => keys.includes(field.prop)) : fields
  for (const field of filterArr) {
    field.clearValidate()
  }
}
async function validate() {
  let validationErrors: ValidateFieldsError = {}
  // console.log('validate', fields)

  for (const field of fields) {
    try {
      await field.validate('')
    } catch (e) {
      const error = e as FormValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields,
      }
    }
  }
  if (Object.keys(validationErrors).length > 0) {
    return Promise.reject(validationErrors)
  } else {
    console.log('Validation succeeded')
    return true
  }
}
provide(formContextKey, {
  ...props,
  addField,
  removeField,
})
defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate,
})
</script>

<template>
  <form class="si-form">
    <slot />
  </form>
</template>
