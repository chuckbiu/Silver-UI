<template>
  <button
    class="si-button"
    ref="_ref"
    :class="{
      [`si-button--${type}`]: true,
      [`si-button--${size}`]: size,
      'is-type': type,
      'is-size': size,
      'is-disabled': disabled,
      'is-round': round,
      'is-plain': plain,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :type="nativeType"
  >
    <Icon icon="fa-solid fa-spinner" v-if="loading" spin></Icon>
    <Icon :icon="icon" v-if="icon"></Icon>
    <span>
      <slot></slot>
    </span>
  </button>

</template>
<script setup lang="ts">
import type { buttonProps } from "./types.ts";
import { ref } from "vue";
import Icon from "../../components/Icon/Icon.vue";

withDefaults(defineProps<buttonProps>(), {
  nativeType: "button",
  //  disabled: true, // 设置默认值
  // loading: false, // 设置默认值
});
defineOptions({
  name: "SiButton",
});
const _ref = ref<HTMLButtonElement>();
defineExpose({
  ref: _ref,
});
</script>
<style scoped>
/* @import "./style.css"; */
</style>
