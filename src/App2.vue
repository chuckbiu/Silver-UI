<script setup lang="ts">
import { reactive, ref } from 'vue'

import Form from './components/Form/Form.vue'
import FormItem from './components/Form/FormItem.vue'
import Input from './components/Input/Input.vue'
import Button from './components/Button/Button.vue'

const formRef = ref()
const testItem = ref<InstanceType<typeof FormItem> | null>(null)

const model = reactive({
  account: '',
  password: '',
  test: '',
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
  test: [
    { required: true, message: '请输入测试值', trigger: 'blur' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符之间', trigger: 'blur' },
  ],
  confirmPwd: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: (rule, value) => value === model.password, trigger: 'blur', message: '两次输入的密码不一致' },
  ],
}
function testvalidate() {
  if (testItem.value) {
    testItem.value.validate()
  }
}
async function submit() {
  try {
    await formRef.value.validate()
    console.log('验证成功', model)
  } catch (error) {
    console.error('验证失败', error)
  }
}
const reset = () => {
  formRef.value.resetFields()
  console.log('表单已重置')
}
</script>

<template>
  <div style="text-align: center;">
    <Form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-width="80px"
    >
      <FormItem label="account" prop="account">
        <template #label="{ label }">
          <Button>{{ label }}</Button>
        </template>
        <Input v-model="model.account" />
      </FormItem>
      <FormItem prop="password">
        <template #label>
          <Button>password</Button>
        </template>
        <Input v-model="model.password" />
      </FormItem>
       <FormItem prop="confirmPwd" label="confirm password">
        <Input v-model="model.confirmPwd" />
      </FormItem>
      <FormItem ref="testItem" prop="test" label="test value">
        <template #default>
          <Input v-model="model.test" type="text" @blur="testvalidate" />
        </template>
      </FormItem>
      <div>
        <Button type="primary" @click.prevent="submit">
          Submit
        </Button>
        <Button @click.prevent="reset">Reset</Button>
      </div>
    </Form>
    <p>
      {{ model.account }} - {{ model.password }}
    </p>
  </div>
</template>
