import type { App } from 'vue'
import Collapse from './src/Collapse.vue'
import CollapseItem from './src/CollapseItem.vue'

Collapse.install = (app: App) => {
  app.component(Collapse.name, Collapse)
}
CollapseItem.install = (app: App) => {
  app.component(CollapseItem.name, CollapseItem)
}
export const SCollapse = Collapse
export const SCollapseItem = CollapseItem

export * from './src/types'
