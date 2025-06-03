<script setup lang="ts">
import { ref } from 'vue'
import Form from './components/Form/Form.vue'
import FormItem from './components/Form/FormItem.vue'
import Input from './components/Input/Input.vue'
import Button from './components/Button/Button.vue'

const inputValue = ref('')
</script>

<template>
  <div style="text-align: center;">
    <Form>
      <FormItem label="account">
        <Input v-model="inputValue" />
      </FormItem>
      <FormItem>
        <template #label>
          <Button>password</Button>
        </template>
        <Input v-model="inputValue" />
      </FormItem>
    </Form>
  </div>
</template>
