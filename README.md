# silver-ui

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

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
