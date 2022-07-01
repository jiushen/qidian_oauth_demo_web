const { defineConfig } = require('@vue/cli-service')

module.exports = {
  devServer: {
    // server: {
    //   port: 3005, // default: 3000
    //   // host: '0.0.0.0', // 本地需要测试pwa的话，改成localhost,
    //   host: 'localhost',
    // },
    // axios: {
    //   proxy: true, // 表示开启代理
    //   prefix: '/proxyApi', // 表示给请求url加个前缀 /api
    //   credentials: true // 表示跨域请求时是否需要使用凭证
    //  },
    proxy: {
      '/api': {
        target: 'http://114.132.223.235:8082/',
        pathRewrite: {
          '^/api': '/', // 把 /api 替换成 /
          changeOrigin: true // 表示是否跨域
         } 
      },
    }
  }
}