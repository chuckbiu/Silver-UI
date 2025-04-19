---
outline: deep
---

# 快速开始

本节将介绍如何在项目中使用 Sliver UI。

## 环境准备

首先确保正确安装以下开发环境：

- Node.js >= 20
- Vue >= 3.5
- TypeScript >= 5.0

## 安装

::: code-group

```bash [npm]
npm install @chuck1/silver-ui
```

```bash [pnpm]
pnpm add @chuck1/silver-ui
```

:::

## 用法

### 完整引入

```ts
import SiElement from '@chuck1/silver-ui'
import { createApp } from 'vue'
import App from './App.vue'
import '@chuck1/silver-ui/dist/si-element.css' // 样式
createApp(App).use(SiElement).mount('#app') // 组件挂载
```

### 特别说明

1. 下面组件实例均已全局注册，可忽略文档所写引入方式，直接书写即可
2. 特殊函数已存在于dist/types/hook 下面

