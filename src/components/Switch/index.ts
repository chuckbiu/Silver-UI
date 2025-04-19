import type { App } from 'vue'
import Switch from './Switch.vue'

// button 插件化
Switch.install = (app: App) => {
  app.component(Switch.name as string, Switch)
}

export default Switch

// 导出类型文件
export * from './type'
