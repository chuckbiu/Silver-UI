/** @type {import('postcss-load-config').Config} */
// 使用 ES6 模块导入语法
let config;

config = {
  plugins: [
    require('postcss-each')()
  ]
};

module.exports = config
