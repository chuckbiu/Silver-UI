import type { App } from 'vue'
import Input from './Input.vue'

// input
Input.install = (app: App) => {
  app.component(Input.name as string, Input)
}

export default Input

// 导出类型文件
export * from './types'
