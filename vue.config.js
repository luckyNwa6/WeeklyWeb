const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'static', //打包配置文件
  parallel: false,
  publicPath: './',
  devServer: {
    port: 9094, //这是vue启动的端口
    proxy: {
      '/api': {
        target: 'http://localhost:9999/', //这是这是本地地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
