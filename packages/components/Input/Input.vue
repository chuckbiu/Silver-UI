<script setup lang="ts">
import { computed, inject, ref, useAttrs, watch } from 'vue'
import type { Ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import { formItemContextKey } from '../Form/types'
import type { InputEmits, InputProps } from './types'

defineOptions({
  name: 'si-input',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off',
})

const emit = defineEmits<InputEmits>()

const formItemContext = inject(formItemContextKey)

const attrs = useAttrs()
/**
 * 组件实例
 */
const inputRef = ref() as Ref<HTMLElement>
/**
 * 获取input的·值
 */
const modelValue = ref(props.modelValue)
/**
 * 是否focus
 */
const isFocus = ref(false)
/**
 * 是否展示密码显示图标
 */
const showPasswordVisible = ref(false)

function runValidation(trigger?: string) {
  formItemContext?.validate(trigger).catch((e) => {
    console.log(e.errors)
  })
}

/**
 * change 事件
 */
function handleChange() {
  emit('change', modelValue.value)
  runValidation('change')
}
/**
 * input 事件
 */
function inputclick() {
  emit('update:modelValue', modelValue.value)
  emit('input', modelValue.value)
  runValidation('input')
}
/**
 * Focus 事件
 */
function handleFocus(event: FocusEvent) {
  isFocus.value = true
  emit('focus', event)
}
/**
 * blur 事件
 */
function handleBlur(event: FocusEvent) {
  isFocus.value = false
  emit('blur', event)
  runValidation('blur')
}
/**
 * clear 点击清除按钮事件
 */
function clear() {
  console.log('clear')
  modelValue.value = ''
  emit('update:modelValue', '')
  emit('clear')
  emit('input', '')
  emit('change', '')
}
/**
 * 密码icon toggle 切换
 */
function togglePasswordVisible() {
  showPasswordVisible.value = !showPasswordVisible.value
}
/**
 * 是否展示清除 - 当input 进入focus 状态 && input 的值不为空 && 不禁用
 */
const showClear = computed(
  () =>
    props.clearable && !props.disabled && !!modelValue.value && isFocus.value,
)
/**
 * 显示密码区域
 */
const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!modelValue.value,
)
/**
 * 清除操作 特殊处理
 */
function NOOP() {}

watch(
  () => props.modelValue,
  (newValue) => {
    modelValue.value = newValue
  },
)
/**
 * 暴露实例
 */
defineExpose({
  ref: inputRef,
})
</script>

<template>
  <div
    class="si-input"
    :class="{
      [`si-input--${type}`]: type,
      [`si-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-prefix': $slots.prefix,
      'is-focus': isFocus,
    }"
  >
    <!-- input -->
    <template v-if="props.type !== 'textarea'">
      <div v-if="$slots.prepend" class="si-input__prepend">
        <!-- prepend slot -->
        <span>
          <slot name="prepend" />
        </span>
      </div>

      <div
        class="si-input__wrapper"
        :class="{
          'is-focus': isFocus,
        }"
      >
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="si-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          ref="inputRef"
          v-bind="attrs"
          v-model="modelValue"
          class="si-input__inner"
          :type="
            showPassword ? (showPasswordVisible ? 'text' : 'password') : type
          "
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          :disabled="disabled"
          @input="inputclick"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
        <!-- suffix slot -->
        <!-- 有清除按钮 也需要展示 -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="si-input__suffix"
        >
          <slot name="suffix" />
          <!-- 清除图标 -->
          <Icon
            v-if="showClear"
            icon="circle-xmark"
            class="si-input__clear"
            @click="clear"
            @mousedown.prevent="NOOP"
          />
          <!-- 隐藏密码图标 -->
          <Icon
            v-if="showPasswordArea && showPasswordVisible"
            icon="eye"
            class="si-input__password"
            @click="togglePasswordVisible"
          />
          <!-- 显示密码图标 -->
          <Icon
            v-if="showPasswordArea && !showPasswordVisible"
            icon="eye-slash"
            class="si-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="si-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        ref="inputRef"
        v-bind="attrs"
        v-model="modelValue"
        class="si-textarea__wrapper"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        :disabled="disabled"
        @input="inputclick"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
    </template>
  </div>
</template>
