<template>
  <div
    class="si-select"
    :class="{
      'is-disabled': disabled,
    }"
    @click="toggerDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      manual
      placement="bottom-start"
      trigger="click"
      ref="tooltipRef"
      :popper-options="propperOptions"
      @clickoutside-change="controlDropdown(false)"
    >
      <Input
        ref="InputRef"
        v-model="states.inputValue"
        class="si-select--input"
        :disabled="disabled"
        :placeholder="filteredPlacementHolder"
        :readonly="!filterable || !isDropdownShow"
        @input="debounceOnFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <!-- 清除 -->
          <Icon
            icon="circle-xmark"
            v-if="showClearIcon"
            class="si-input__clear"
            @click="onClear"
            @mousedown.prevent="NOOP"
          >
          </Icon>
          <!-- arrow-down -->
          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="[{ 'is-active': isDropdownShow }]"
          ></Icon>
        </template>
      </Input>
      <!-- parent template -->
      <template #content>
        <div class="si-select__loading" v-if="states.loading">
          <!-- 加载中 -->
          <Icon icon="spinner" spin></Icon>
        </div>
        <!-- black data -->
        <div
          class="si-select__nodata"
          v-else-if="filterable && filteredOptions.length === 0"
        >
          no data
        </div>
        <ul class="si-select__menu" v-else>
          <template v-for="(item, index) in filteredOptions" :key="item.value">
            <li
              class="si-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-highlighted': states.highlightIndex === index,
              }"
              @click.stop="itemSelect(item)"
              :id="item.value"
            >
              <RenderVode
                :v-node="renderLabel ? renderLabel(item) : item.label"
              >
                {{ item.label }}
              </RenderVode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import type { Ref } from "vue";
import _, { isFunction } from "lodash";
import type {
  SelectProps,
  SelectEmits,
  SelectOption,
  SelectStatus,
} from "./types";
import RenderVode from "@/hooks/RenderVnode";
import type { TooltipInstance } from "@/components/Tooltip/types";
import type { InputInstance } from "../Input/types";
import Input from "../Input/Input.vue";
import Tooltip from "../Tooltip/Tooltip.vue";
import Icon from "../Icon/Icon.vue";
defineOptions({
  name: "SiSelect",
});

/**
 * find options
 */
const findOption = (value: string) => {
  const option = props.options.find((item) => item.value === value);
  return option ? option : null;
};

const props = withDefaults(defineProps<SelectProps>(), {
  // 数组默认值 需要使用函数里面的getter
  options: () => [],
});
// 远程延时时间
const timeout = computed(() => (props.remote ? 300 : 0));
const emits = defineEmits<SelectEmits>();
/**
 * tooltip 实例对象
 */
const tooltipRef = ref() as Ref<TooltipInstance>;
/**
 * input 实例对象
 */
const InputRef = ref() as Ref<InputInstance>;
/**
 * 初始化 option
 */
const initialOption = findOption(props.modelValue);
/**
 * 根据 初始化 option 得到 回显结果
 */

// const innerModelvalue = ref(initialOption ? initialOption.label : "");
/**
 * 状态对象
 */
const states = reactive<SelectStatus>({
  inputValue: initialOption ? initialOption.label : "",
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
});

/**
 * 表示 下拉框是否 打开
 */
const isDropdownShow = ref(false);
/**
 * 清除图标展示 computed
 */
const showClearIcon = computed(() => {
  // hover 成功 && clearabled && Input 值不能为空 && selectedOption 存在
  return (
    props.clearable &&
    states.mouseHover &&
    states.selectedOption &&
    states.inputValue.trim() !== ""
  );
});

/**
 * 设置弹出框 一样的宽度
 */
const propperOptions: any = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 10],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
    },
  ],
};
/**
 * 过滤 类型
 */
const filteredOptions = ref(props.options);

watch(
  () => props.options,
  (newValue) => {
    filteredOptions.value = newValue;
  }
);

const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return;
  if (_.isFunction(props.filterMethod) && props.filterMethod) {
    filteredOptions.value = props.filterMethod(searchValue);
  } else if (
    props.remote &&
    props.remoteMethod &&
    isFunction(props.remoteMethod)
  ) {
    /**
     * 远程操作
     */
    states.loading = true;
    try {
      filteredOptions.value = await props.remoteMethod(searchValue);
    } catch (e) {
      console.error(e);
      filteredOptions.value = [];
    } finally {
      states.loading = false;
    }
  } else {
    filteredOptions.value = props.options.filter((option) =>
      option.label.includes(searchValue)
    );
  }
  states.highlightIndex = -1;
};
const onFilter = () => {
  generateFilterOptions(states.inputValue);
};
const debounceOnFilter = _.debounce(() => {
  onFilter();
}, timeout.value);

/**
 * 键盘按下操作
 */
const handleKeydown = (e: KeyboardEvent) => {
  // e.key 获取键盘按下的键
  switch (e.key) {
    case "Enter":
      // toggerDropdown();
      if (!isDropdownShow.value) {
        controlDropdown(true);
      } else {
        if (states.highlightIndex > -1 && filteredOptions.value[states.highlightIndex]) {
          itemSelect(filteredOptions.value[states.highlightIndex]);
        }
        else {
          controlDropdown(false);
        }
      }
      break;
    case "Escape":
      if (isDropdownShow.value) {
        controlDropdown(false);
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      if (filteredOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filteredOptions.value.length - 1;
        } else {
          // move up
          states.highlightIndex--;
        }
      }

      break;
    case "ArrowDown":
      e.preventDefault();
      if (filteredOptions.value.length > 0) {
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filteredOptions.value.length - 1
        ) {
          states.highlightIndex = 0;
        } else {
          // move up
          states.highlightIndex++;
        }
      }
      break;
    default:
      break;
  }
};
/**
 * 清空逻辑
 */
const onClear = () => {
  states.selectedOption = null;
  states.inputValue = "";
  emits("clear");
  emits("change", "");
  emits("update:modelValue", "");
};
/**
 * 过滤模式下的提示
 */
const filteredPlacementHolder = computed(() => {
  return props.filterable && states.selectedOption && isDropdownShow.value
    ? states.selectedOption.label
    : props.placeholder;
});
/**
 * 控制 是否 打开并且切换
 */
const controlDropdown = (show: boolean) => {
  if (show) {
    // filter 模式
    // 之前选择过对应的值
    if (props.filterable && states.selectedOption) {
      states.inputValue = "";
    }
    // 进行一次默认选项的生成
    if (props.filterable) {
      generateFilterOptions(states.inputValue);
    }
    tooltipRef.value?.show();
  } else {
    tooltipRef.value?.hide();
    // blur 时候 把之前的值回灌到 input中
    if (props.filterable) {
      states.inputValue = states.selectedOption
        ? states.selectedOption.label
        : "";
    }
    states.highlightIndex = -1;

  }
  isDropdownShow.value = show;
  emits("visible-change", show);
};
const NOOP = () => {};
/**
 * 切换 实际
 */
const toggerDropdown = () => {
  if (props.disabled) return;
  if (isDropdownShow.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
};
/**
 * 列表选择
 */
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emits("change", e.value);
  emits("update:modelValue", e.value);
  // 关闭
  controlDropdown(false);
  InputRef.value.ref.focus();
};
</script>
<style lang="css" scoped></style>
