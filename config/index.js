var path = require('path');
var projectName = 'react' || process.env.npm_package_name;; // 项目名称 package.json name

module.exports = {
    build: {
        env: {
            NODE_ENV: '"production"',
        },
        index: path.resolve(__dirname, '../dist/index.html'), // 输出 index.html 文件路径
        assetsRoot: path.resolve(__dirname, '../dist'), // 资源路径
        assetsSubDirectory: projectName, // 静态资源路径
        assetsPublicPath: './', // cdn 路径
        productionSourceMap: false, // 浏览器调试
        extract: true, // 提取 css
        eslint: false, // 代码检查
        productionGzip: false, // gzip 压缩文件
        productionGzipExtensions: ['js', 'css'], // gzip 压缩类型
        bundleAnalyzerReport: process.env.npm_config_report, // 各个包之间的联系 `npm run build --report`
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        }, // 'development'
        port: 8080, // 默认端口
        autoOpenBrowser: true, // 自动打开浏览器
        assetsSubDirectory: 'static', // 静态资源路径
        assetsPublicPath: '/', // cdn 路径
        eslint: false, // 代码检查
        proxyTable: { // API 代理配置
            firstProxy: {
                target: 'http://localhost:8360/',
                filter: function (pathname, req) {
                    var isApi = pathname.indexOf('api') >= 0;
                    var ret = isApi;
                    console.log('pathname', pathname, 'ret', ret)
                    return ret;
                },
                changeOrigin: true,
            },
            // secondProxy: 'http://www.example2.org'
        },
        cssSourceMap: true, // css 调试
    },
    assetsFolder: 'assets', // 根目录下,资源文件夹名
    projectName: projectName, // 被用做前端的baseUrl, 和打包的 static 目录
};
