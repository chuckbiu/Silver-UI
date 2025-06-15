<script setup lang="ts">
import { reactive } from 'vue'
import type { SelectOption } from '@/components/Select/types'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
import SiSelect from '@/components/Select/Select.vue'

const selectoptions: SelectOption [] = [
  { value: '1', label: 'Action 1' },
  { value: '2', label: 'Action 2' },
]

const model = reactive({
  account: '',
  password: '',
  select: '',
})

function submit() {
  console.log('submit!')
}
</script>

<template>
  <div>
    <Form
      :model="model"
      label-width="120px"
    >
      <FormItem label="account" prop="account">
        <Input v-model="model.account" />
      </FormItem>
      <FormItem prop="password" label="password">
        <Input v-model="model.password" />
      </FormItem>
      <FormItem prop="select" label="Select">
        <SiSelect v-model="model.select" :options="selectoptions" placeholder="请选择" />
      </FormItem>
      <div style="margin-left: 100px;">
        <Button type="primary" @click="submit">
          Create
        </Button>
        <Button>
          Cancel
        </Button>
      </div>
    </Form>
  </div>
</template>
