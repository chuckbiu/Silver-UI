import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Silver UI',
  description: 'Silver UI 组件库文档',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/md/guide/quick-start' },
      { text: '组件', link: '/md/components/overview' },
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/md/guide/quick-start' },
        ],
      },
      {
        text: '组件',
        items: [
          { text: '总览', link: '/md/components/overview' },
          { text: 'Button 按钮', link: '/md/components/button' },
          { text: 'Icon 图标', link: 'md/components/icon' },
          { text: 'Collapse 折叠面板', link: 'md/components/collapse' },
          { text: 'Tooltip  折叠面板', link: 'md/components/tooltip' },
          { text: 'Dropdown  下拉菜单', link: 'md/components/dropdown' },
          { text: 'Message  消息提示', link: 'md/components/message' },

        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  vite: {
    server: {
      port: 3000,
    },
    plugins: [
      VueMacros.vite({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vueJsx: vueJsx() as any, // 强制类型断言,
        },
      }) as any,
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
      },
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
})
