<script setup lang="ts">
import { reactive, ref } from 'vue'

import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'

const formRef = ref()

const model = reactive({
  account: '',
  password: '',
  test: '',
})
const rules = {
  account: [
    { required: true, message: '请输入Activity name', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符之间', trigger: 'input' },
  ],
  password: [
    { required: true, message: '请输入password', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符之间', trigger: 'blur' },
  ],
  test: [
    { required: true, message: '请输入Activity form', trigger: 'blur' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符之间', trigger: 'blur' },
  ],
}

async function submit() {
  try {
    await formRef.value.validate()
  } catch (error) {
    console.warn('验证失败', error)
  }
}
function reset() {
  formRef.value.resetFields()
}
</script>

<template>
  <div>
    <Form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-width="80px"
    >
      <FormItem label="Activity name" prop="account">
        <Input v-model="model.account" />
      </FormItem>
      <FormItem prop="password" label="password">
        <Input v-model="model.password" />
      </FormItem>
      <FormItem
        prop="test"
        label="Activity form"
      >
        <template #default>
          <Input
            v-model="model.test"
            type="textarea"
          />
        </template>
      </FormItem>
      <div style="margin-left: 100px;">
        <Button type="primary" @click.prevent="submit">
          Submit
        </Button>
        <Button @click.prevent="reset">
          Reset
        </Button>
      </div>
    </Form>
  </div>
</template>
