<script lang="ts" setup>
import { ref } from 'vue'
import SiCollapse from '@/components/Collapse/Collapse.vue'
import SiCollapseItem from '@/components/Collapse/CollapseItem.vue'

const openValue = ref(['1'])
</script>

<template>
  <SiCollapse
    v-model="openValue"
  >
    <SiCollapseItem title="静夜思" name="1" accordion>
      <div>
        床前明月光，疑是地上霜。
      </div>
      <div>
        举头望明月，低头思故乡。
      </div>
    </SiCollapseItem>
    <SiCollapseItem title="春晓" name="2">
      <div>
        春眠不觉晓，处处闻啼鸟。
      </div>
      <div>
        夜来风雨声，花落知多少。
      </div>
    </SiCollapseItem>
    <SiCollapseItem title="登鹳雀楼" name="3">
      <div>
        黄河入海流
      </div>
      <div>
        欲穷千里目
      </div>
      <div>
        更上一层楼
      </div>
    </SiCollapseItem>
  </SiCollapse>
</template>
