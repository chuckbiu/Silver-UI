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
  confirmPwd: '',
})
const rules = {
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符之间', trigger: 'input' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符之间', trigger: 'blur' },
  ],
  confirmPwd: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: (rule, value) => value === model.password, trigger: 'blur', message: '两次输入的密码不一致' },
  ],
}
async function submit() {
  try {
    await formRef.value.validate()
  } catch (error) {
    console.error('验证失败', error)
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
    >
      <FormItem label="account" prop="account">
        <Input v-model="model.account" />
      </FormItem>
      <FormItem prop="password" label="password">
        <Input v-model="model.password" />
      </FormItem>
      <FormItem prop="confirmPwd" label="confirm">
        <Input v-model="model.confirmPwd" show-password />
      </FormItem>
      <div style="margin-left: 80px;">
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
