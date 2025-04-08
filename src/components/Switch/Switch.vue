<template>
  <div
    class="si-switch"
    :class="{
      [`is-disabled`]: disabled,
      [`si-switch--${size}`]: size,
      'is-checked': checked,
    }"
    @click="switchvalue"
  >
    <input
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :id="id"
      class="si-switch__input"
      role="switch"
      @keydown.enter="switchvalue"
      ref="inputRef"
    />

    <!-- 底部矩形框 -->
    <div class="si-switch__core">

      <!-- acitve aricle border -->
      <div class="si-switch__core-action"></div>
      <!-- active text 文字部分 -->
      <div class="si-switch__core-inner">
          <span v-if="activeText || inactiveText" class="si-switch__core-inner-text">
            {{ checked ? activeText : inactiveText }}
          </span>
       </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch} from "vue";
import type { SwitchProps, SwitchEmits } from "./type";

defineOptions({
  name: "SiSwitch",
  inheritAttrs: false, // 关闭继承 自己控制所有属性
});

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false
});
const emits = defineEmits<SwitchEmits>();
// 代表未选择，选择
const innerValue = ref(props.modelValue);
/**
 * 使用一个计算属性 代表 是否被选中
 */
const checked = computed(() => innerValue.value === props.activeValue);
/**
 * input 对象
 */
const inputRef = ref<HTMLInputElement>();
/**
 * 切换按钮函数
 */
const switchvalue = () => {
  if (props.disabled) return;
  innerValue.value = !checked.value ? props.activeValue : props.inactiveValue;
  emits("change", innerValue.value);
  emits("update:modelValue", innerValue.value);
};
watch(checked, (newValue) => {
  inputRef.value!.checked = newValue
})
watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue
})
</script>
<style lang="css" scoped></style>
