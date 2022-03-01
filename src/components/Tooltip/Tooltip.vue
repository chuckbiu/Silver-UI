<template>
  <div class="is-tooltip" v-on="Tooltipevents" ref="TooltipNode">
    <div class="is-tooltip__trigger" ref="TNode" v-on="smallTooltipevents">
      <slot></slot>
    </div>
    <Transition name="fade">
      <div class="is-tooltip__popper" ref="PNode" v-if="isOpen">
        <slot name="content">
          {{ content }}
        </slot>
        {{ trigger }}
      </div>
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import type { TooltipProps, TooltipEmits } from "./type.ts";
import { createPopper } from "@popperjs/core";
import { reactive, ref, watch, computed } from "vue";
import type { Instance } from "@popperjs/core";
import useClickOutside from "../../hooks/useClickOutside.ts";
// 父组件传进来的值
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
});
// 创建节点
const TooltipNode = ref<HTMLElement | undefined>(undefined);
// 子组件触发事件
const emits = defineEmits<TooltipEmits>();
// 创建两个node节点
const TNode = ref<HTMLElement | null>(null);
const PNode = ref<HTMLElement | null>(null);
let propperInstance: null | Instance = null;
// 弹窗是否展示
const isOpen = ref(false);
const popperOptions = computed(() => {
  return {
    placements: props.placement,
    ...props.popperOptions,
  };
});
// hover
const open = () => {
  isOpen.value = true;
  emits("visible-change", true);
};
const close = () => {
  isOpen.value = false;
  emits("visible-change", false);
};

// 组件触发点击
const triggerClick = () => {
  isOpen.value = !isOpen.value;
  emits("visible-change", isOpen.value);
};
// 定义事件监听器
let Tooltipevents: Record<string, any> = reactive({});
let smallTooltipevents: Record<string, any> = reactive({});
// 组件初次渲染 开始注册事件
const attachEvents = () => {
  if (props.trigger === "click") {
    smallTooltipevents["click"] = triggerClick;
  } else if (props.trigger === "hover") {
    smallTooltipevents["mouseenter"] = open;
    Tooltipevents["mouseleave"] = close;
  }
};
attachEvents();

useClickOutside(TooltipNode, () => {
  if (isOpen.value && PNode.value) {
    isOpen.value = !isOpen.value;
  }
});

watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (TNode.value && PNode.value) {
        // 根据两个节点都存在创建对应实例
        propperInstance = createPopper(TNode.value, PNode.value, {
          ...popperOptions.value,
        });
      }
    } else {
      // 没有显示就销毁对应实例
      propperInstance?.destroy();
    }
  },
  {
    flush: "post",
  }
);
//选项期望接受一个对象，其中键是需要侦听的响应式组件实例属性
watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      Tooltipevents = {};
      smallTooltipevents = {};
      attachEvents();
    }
  }
);
</script>
<style scoped>

</style>
