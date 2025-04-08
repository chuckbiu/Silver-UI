<script setup lang="ts">
import { ref} from "vue";
import Select from "./Select.vue";
const test = ref("");
const option2 = [
  { label: "hello", value: "1" },
  { label: "xyz2", value: "2" },
  { label: "testing", value: "3" },
  { label: "check", value: "4", disabled: true},
];

</script>
<template>
  <Select v-model="test" placeholder="可过滤 基础选择器" :options="option2" filterable></Select>
</template>
