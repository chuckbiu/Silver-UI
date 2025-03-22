<script setup lang="ts">
import type { Options } from "@popperjs/core";
import type { MenuOption } from "@/components/Dropdown/types";
import Button from "@/components/Button/Button.vue";
import Collapse from "@/components/Collapse/Collapse.vue";
import CollapseItem from "@/components/Collapse/CollapseItem.vue";
import { onMounted, reactive, ref, h } from "vue";
import type { ButtonInstance } from "@/components/Button/types.ts";
import type { TooltipInstance } from "@/components/Tooltip/type.ts";

import Tooltip from "@/components/Tooltip/Tooltip.vue";
import Dropdown from "@/components/Dropdown/Dropdown.tsx";
// button
const buttonRef = ref<ButtonInstance | null>(null);
const tooltipRef = ref<TooltipInstance | null>(null);
const openValue = ref(["1-1"]);
const changeTrigger = ref('click');
// tooltips
const optionsTooltips: Partial<Options> = reactive({
  placement: "bottom",
  strategy: "fixed",
});
// dropdown
const options: MenuOption[] = [
  { key: 1, label: h("b", "this a blod") },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" },
];
const open = () => {
  tooltipRef.value?.show();
};
const close = () => {
  tooltipRef.value?.hide();
};
const inlineConsole = (...args: any) => {
  console.log(...args);
};
onMounted(() => {
  // if (buttonRef.value) {
  //   console.log("app mounted", buttonRef.value.ref);
  // }
});
</script>

<template>
  <div v-if="true">
    <!-- Add the style and icon you want using the Array format -->
    <Button ref="buttonRef" @click="open"> default </Button>
    <Button type="primary" @click="close"> primary </Button>
    <Button type="primary" :loading="true"> test </Button>
    <Button type="success"> success </Button>
    <Button type="info"> info </Button>
    <Button type="warning"> warning </Button>
    <Button type="danger" :disabled="true"> danger </Button>
    <br />
    <br />
    <Button ref="buttonRef" plain> default </Button>
    <Button plain type="primary"> primary </Button>
    <Button plain type="success"> success </Button>
    <Button plain type="info"> info </Button>
    <Button plain type="warning"> warning </Button>
    <Button plain type="danger"> danger </Button>
    <br />
    <br />

    <Button round> Round </Button>
    <Button round type="primary"> primary </Button>
    <Button round type="success"> success </Button>
    <Button round type="info"> info </Button>
    <Button round type="warning"> warning </Button>
    <Button round type="danger"> danger </Button>
    <br />
    <br />

    <!--  size-->
    <Button size="large"> large </Button>
    <Button> default </Button>
    <Button size="small"> small </Button>

    <Collapse v-model="openValue" :accordion="true">
      <CollapseItem title="Title A" name="1-1">
        <p>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </p>
      </CollapseItem>
      <CollapseItem name="2-1">
        <template #title>
          <h2>Title B</h2>
        </template>
        <h2>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </h2>
      </CollapseItem>
      <CollapseItem name="2-2" :disabled="true">
        <template #title>
          <h2>Title C</h2>
        </template>
        <h2>headline title</h2>
        <div>this is content a aaa</div>
      </CollapseItem>
    </Collapse>
  </div>
  <div>
    <!-- <Tooltip :popper-options="optionsTooltips" :openDelay="10" :close-delay="10" :trigger="'click'" manual ref="tooltipRef">
      <button class="btn">test Tooltip</button>
      <template #content>
        <h1> Hello</h1>
      </template>
    </Tooltip> -->
  </div>
  <div>
    <Dropdown
      :menuOptions="options"
      placement="bottom"
      :trigger="changeTrigger"
      @visible-change="(e) => inlineConsole('visible change', e)"
      @select="(e) => inlineConsole('select', e)"
      manual
      ref="tooltipRef"
    >
      <button class="btn">test dropdown</button>
    </Dropdown>
  </div>
</template>

<style scoped>
.btn {
  width: 200px;
  display: block;
}
</style>
