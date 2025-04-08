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
      <div class="si-input__prepend" v-if="$slots.prepend">
        <!-- prepend slot -->
        <span >
          <slot name="prepend"></slot>
        </span>
      </div>

      <div class="si-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="si-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          class="si-input__inner"
          :type="
            showPassword ? (showPasswordVisible ? 'text' : 'password') : type
          "
          ref="inputRef"
          v-bind="attrs"
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
          v-model="modelValue"
        />
        <!-- suffix slot -->
        <!-- 有清除按钮 也需要展示 -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="si-input__suffix"
        >
          <slot name="suffix"></slot>
          <!-- 清除图标 -->
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="si-input__clear"
            @click="clear"
          ></Icon>
          <!-- 隐藏密码图标 -->
          <Icon
            icon="eye"
            v-if="showPasswordArea && showPasswordVisible"
            class="si-input__password"
            @click="togglePasswordVisible"
          ></Icon>
          <!-- 显示密码图标 -->
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !showPasswordVisible"
            class="si-input__password"
            @click="togglePasswordVisible"
          ></Icon>
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="si-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        ref="inputRef"
        class="si-textarea__wrappper"
        v-bind="attrs"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        :disabled="disabled"
        @input="inputclick"
        @focus="handleFocus"
        @blur="handleBlur"
        v-model="modelValue"
        @change="handleChange"
      >
      </textarea>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, useAttrs } from "vue";
import type { Ref } from "vue";
import type { InputProps, InputEmits } from "./types";
import Icon from "../Icon/Icon.vue";
defineOptions({
  name: "SiInput",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
});
const emits = defineEmits<InputEmits>();
const attrs = useAttrs();
/**
 * 组件实例
 */
const inputRef = ref() as Ref<HTMLElement>;
/**
 * 获取input的·值
 */
const modelValue = ref(props.modelValue);
/**
 * 是否focus
 */
const isFocus = ref(false);
/**
 * 是否展示密码显示图标
 */
const showPasswordVisible = ref(false);
/**
 * change 事件
 */
const handleChange = () => {
  emits("change", modelValue.value);
};
/**
 * input 事件
 */
const inputclick = () => {
  emits("update:modelValue", modelValue.value);
  emits("input", modelValue.value);
};
/**
 * Focus 事件
 */
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true;
  emits("focus", event);
};
/**
 * blur 事件
 */
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false;
  emits("blur", event);
};
/**
 * clear 点击清除按钮事件
 */
const clear = () => {
  modelValue.value = "";
  emits("update:modelValue", "");
  emits("clear");
  emits("input", "");
  emits("change", "");
};
/**
 * 密码icon toggle 切换
 */
const togglePasswordVisible = () => {
  showPasswordVisible.value = !showPasswordVisible.value;
};
/**
 * 是否展示清除 - 当input 进入focus 状态 && input 的值不为空 && 不禁用
 */
const showClear = computed(
  () =>
    props.clearable && !props.disabled && !!modelValue.value && isFocus.value
);
/**
 * 显示密码区域
 */
const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!modelValue.value
);
watch(
  () => props.modelValue,
  (newValue) => {
    modelValue.value = newValue;
  }
);
/**
 * 暴露实例
 */
defineExpose({
  ref: inputRef,
});
</script>
