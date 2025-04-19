# Silver-ui

This template should help get you started developing with Vue 3 in Vite.



## 项目安装

```shell
npm i @chuck1/silver-ui
```

## 项目使用

```ts
import SiElement from '@chuck1/silver-ui'
import { createApp } from 'vue'
import App from './App.vue'
import '@chuck1/silver-ui/dist/si-element.css' // 样式
createApp(App).use(SiElement).mount('#app') // 组件挂载
```

## 项目结构

```markdown
|--docs // 文档
|--packages
|  |--components // 组件
|  |  |--button // 按钮
|  |  |  |--src 
|  |  |  |  |--button.vue // 组件html
|  |  |  |  |--style.css // 组件样式
|  |  |  |  |--types.ts // 类型
|  |  |  |--__tests__ // 测试
|  |  |  |  |--button.spec.ts // 测试用例
|  |  |--index.ts // 导出组件
|  |--hooks // 钩子
|  |--types // 类型
|  |--play // 测试环境
|  |--sliver-ui // 组件库 用于发布
```

## TODO

- [x] 组件测试环境
- [x] 覆盖率测试
- [ ] 组件测试完善

- 样式在不同环境中的使用
- [x] 开发环境
- [x] 文档环境
- [x] 生产环境

- [x] 组件库文档准备
- [x] 组件库文档完善

- [x] 组件库打包
- [x] 发布到npm

1. monorepo架构

## 特色

\- 🌈 提供 10+ 个高质量通用组件

\- 🔥 使用 TypeScript 开发，提供完整的类型定义

\- 📦 开箱即用的高质量 Vue 组件

\- 🎨 支持主题定制，可配置设计规范

\- 🌍 国际化支持

\- ⚡️ 支持按需引入和 Tree Shaking

\- 🎯 使用 Vite 构建，开发体验极致