// 启动一个 服务, 用于开发调试

var config = require('../config');
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var ip = require('ip');
var opn = require('opn'); // 浏览器打开页面
var proxyMiddleware = require('http-proxy-middleware'); // 中间代理
var webpackConfig = require('./webpack.dev.conf');

var port = process.env.PORT || config.dev.port;
var autoOpenBrowser = !!config.dev.autoOpenBrowser;
var proxyTable = config.dev.proxyTable; // API 代理配置

var app = express();

var compiler = webpack(webpackConfig); // 编译

// 中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath, // cdn 路径
    quiet: true,
});

// 热更新
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
});

compiler.plugin('compilation', function (compilation) {
    // 编译完,插入 html 后
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 自动刷新
        hotMiddleware.publish({ action: 'reload' });
        cb();
    });
});

// 代理 API 请求
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
});

// 因为前端地址 是 H5 的 history, 刷新页面后,后端会找不到对应的渲染文件
app.use(require('connect-history-api-fallback')())

// 打包输出
app.use(devMiddleware);

// 热更新, 状态保留, 错误显示
app.use(hotMiddleware);

// 静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
// app.use(staticPath, express.static('./static'));
app.use(staticPath, express.static(config.assetsFolder));

// var uri = 'http://localhost:' + port;
const IP = ip.address(); // IP 地址
const projectName = config.projectName;
var uri = `http://${IP}:${port}/${projectName}`;

devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + uri + '\n')
});

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    if (autoOpenBrowser) {
        opn(uri);
    }
});
