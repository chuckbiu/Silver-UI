module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // ✨ Features
        'fix', // 🐛 Bug Fixes
        'docs', // 📝 Documentation
        'style', // 💄 Styles
        'refactor', // ♻️ Refactors
        'perf', // ⚡️ Performance
        'test', // ✅ Tests
        'build', // 📦 Build System
        'ci', // 👷 Continuous Integration
        'chore', // 🔧 Chores
        'revert', // ⏪ Reverts
      ],
    ],
  },
}
