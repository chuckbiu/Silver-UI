<template>
  <div class="si-dropdown">
    <Tooltip
      :trigger="'click'"
      :popper-options="optionsTooltips"
      :open-delay="1000"
      :close-delay="1000"
      ref="tooltipRef"
      @visable-change="visibleChange"
    >
      <slot> </slot>
        <!-- 循环列表结构 -->
        <template v-slot:content>
          <ul class="si-dropdown_menu">

            <!-- template 可以生成空节点 -->
            <template v-for="item in props.menuOption" :key="item.key">

              <li
                v-if="item.divided"
                role="separator"
                class="divided-placeholder" ></li>
                <li
                class="si-dropdown__item"
                :class="{
                  'is-diabled': item.disabled,
                  'is-divided': item.divided
                }"
                @click="itemClick(item)"
                :id="`dropdown-item-${item.key}`"
              >
                <RenderVode :v-node="item.label"/>
              </li>
            </template>
          </ul>
        </template>
    </Tooltip>
  </div>
</template>
<script lang="ts" setup>
import type {
  DropdownProps,
  DropdownInstance,
  DropdownEmits,
  MenuOption,
} from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { Options } from "@popperjs/core";
// RenderVnode 
import RenderVode  from "@/hooks/RenderVnode";
import type { TooltipInstance } from "@/components/Tooltip/type.ts";
import { ref, reactive} from "vue";
import type { Ref } from 'vue';

// tooltipRef 实例
// 第一种写法
// const tooltipRef = ref<TooltipInstance | null>(null);
// 第二种写法
const tooltipRef = ref() as Ref<TooltipInstance>;

// props
const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
});
// emits
const emits = defineEmits<DropdownEmits>();
defineOptions({
  name: "dropdown",
});
const optionsTooltips: Partial<Options> = reactive({
  placement: "bottom",
  strategy: "fixed",
});
// 作为中间层传递作用
const visibleChange = (e: boolean) => {
  emits("visible-change", e);
};
const itemClick = (e: MenuOption) => {
  // 假如是否禁用
  if (e.disabled) {
    return;
  }
  emits("select", e);
  if (props.hideAfterClick){
    tooltipRef.value?.hide()
  }
};
defineExpose<DropdownInstance>({
  'show': tooltipRef.value?.show,
  'close': tooltipRef.value?.hide,
});
</script>
