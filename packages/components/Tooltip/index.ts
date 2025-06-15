import type { App } from 'vue'
import Tooltip from './Tooltip.vue'

// button 插件化
Tooltip.install = (app: App) => {
  app.component(Tooltip.name as string, Tooltip)
}

export default Tooltip

// 导出类型文件
export * from './types'
