<script setup>
import { ref } from "vue";
import Select from "./Select.vue";
const test = ref("");
const states = [
  "Alsad",
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
];

const remoteFilter = (query) => {
  return new Promise((resolve) => {
    if (query) {
      setTimeout(() => {
        const options = states
          .filter((item) => {
            return item.toLowerCase().includes(query.toLowerCase());
          })
          .map((label) => {
            return { label, value: label };
          });
        resolve(options);
      }, 500);
    } else {
      resolve([]);
    }
  });
};
const handleFetch = (query) => {
  if (!query) return Promise.resolve([]);
  return fetch(`https://api.github.com/search/repositories?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      return items
        .slice(0, 10)
        .map((item) => ({ label: item.name, value: item.node_id }));
    });
};
</script>
<template>
  <Select
    v-model="test"
    placeholder="搜索远程结果"
    filterable
    remote
    :remoteMethod="handleFetch"
  ></Select>
</template>
