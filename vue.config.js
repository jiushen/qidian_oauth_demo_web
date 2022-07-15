const { defineConfig } = require('@vue/cli-service')
//本地访问域名: http://localhost:8080/

module.exports = {
      devServer: {
        open: true,
        host: 'localhost',
        port: '8080',
        https: false,
        proxy: {
            '/proxyApi': {
                target: 'https://114.132.223.235:8082/',
                pathRewrite: {'^/proxyApi': ''}, // 下面这个配置的作用是, 把`/api/api地址`转发给服务器的只有`api地址`, 去掉`/api`
                // ws: true, //  websocket 用于支持websocket,不写也默认true
                changeOrigin: true, //不写也默认true,用于控制请求头中的host值
            }
        }
    }
}
