import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],

  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  {
    // 取消单个单词组件语法检查
    rules: {
      'vue/multi-word-component-names': 'off'
    },

  },
  {
    files: ['postcss.config.*'], // 仅对 postcss 配置文件生效
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  }
]
