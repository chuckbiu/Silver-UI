import type { App } from 'vue'
import Button from './Button.vue'

// button 插件化
Button.install = (app: App) => {
  app.component(Button.name as string, Button)
}

export default Button

// 导出类型文件
export * from './types'
