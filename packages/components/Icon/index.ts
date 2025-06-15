import type { App } from 'vue'
import Icon from './src/icon.vue'

// icon 插件化
Icon.install = (app: App) => {
  app.component(Icon.name as string, Icon)
}

export default Icon

export const SIcon = Icon

// 导出类型文件

export * from './src/types'
