import type { App } from 'vue'
import Icon from './Icon.vue'

// icon 插件化

Icon.install = (app: App) => {
  app.component(Icon.name as string, Icon)
}

export default Icon

// 导出类型文件

export * from './types'
