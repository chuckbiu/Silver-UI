import type { App } from 'vue'
import Button from './components/Button/Button.vue'

const myPlugin = {
  install: (app: App) => {
    // 在这里编写插件代码
    // 注入一个全局可用的 $echo() 方法
    app.config.globalProperties.$echo = (name: string) => {
      return `heool ${name}`
    }
    // 全局组件
    app.component('SiButton', Button)
    // 全局依赖注入
    app.provide('test', { message: 'from plugin' })
  },
}
export default myPlugin
