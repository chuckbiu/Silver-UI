import type { App } from 'vue'
import Dropdown from './Dropdown.tsx'

// dropdown 插件化

Dropdown.install = (app: App) => {
  app.component(Dropdown.name as string, Dropdown)
}

export default Dropdown

// 导出类型文件

export * from './types'
