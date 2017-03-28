require('shelljs/global'); // shell 命令 
process.env.NODE_ENV = 'production'

var path = require('path');
var config = require('../config')
var ora = require('ora'); // loading 样式
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.conf');

var spinner = ora('生产环境打包中...'); // loading
spinner.start();

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath); // 移除打包目录
mkdir('-p', assetsPath); // 创建打包目录

webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');
    console.log('  打包完成.\n');
    console.log(
        '  提示:\n' +
        '  打包好的文件只能跑在服务器上.\n' +
        '  直接打开 index.html 不会有效果.\n'
    );
});
