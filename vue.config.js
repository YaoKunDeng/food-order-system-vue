const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {//匹配所有以/api开头的路径
        target: 'http://localhost:8081',//代理目标的基础路径
        pathRewrite:{'^/api':''},//路径重写，匹配api开头的字符串，并把api替换为空字符串
        
        changeOrigin: true//请求来自于。即控制请求头中host数据。默认为true说谎:来自8080;false如实回答来自代理服务器8081
      }
    }
  }
})
