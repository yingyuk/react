// 正常打包, 给浏览器

var path = require('path');
var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');

var baseWebpackConfig = require('./webpack.base.conf');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

var env = config.build.env;

var webpackConfig = merge(baseWebpackConfig, {
    // 模块
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: config.build.extract,
        }),
    },
    // 浏览器调试
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    // 输出
    output: {
        // 资源路径
        path: config.build.assetsRoot,
        filename: utils.assetsPath('script/[name].[chunkhash].js'),
        // 附加的 分块模板
        chunkFilename: utils.assetsPath('script/[id].[chunkhash].js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        // 定义全局变量
        new webpack.DefinePlugin({
            NAME: JSON.stringify(config.projectName),
            STATIC: JSON.stringify(`/static/${config.build.assetsSubDirectory}/${config.assetsFolder}`),
            ENV: JSON.stringify(config.build.env.NODE_ENV),
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        // 压缩 js 文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: config.build.productionSourceMap,
        }),
        // 文件 id 分派上,保持一致
        new webpack.optimize.OccurrenceOrderPlugin(),
        (() => {
            if (config.build.extract) {
                // 独立生成 css 文件
                return new ExtractTextPlugin(utils.assetsPath('style/[name].[contenthash].css'))
            }
            return () => {}; // 空函数
        })(),
        // 插入 资源文件(含hash的名字) 到 index.html 
        new HtmlWebpackPlugin({
            filename: config.build.index, // 输出路径
            template: 'src/index.html', // 输入路径 
            inject: true, // 注入的位置 </body> 之前
            // 压缩 html
            minify: {
                removeComments: true, // 移除评论
                collapseWhitespace: true, // 移除标签内的 空白符, &nbsp; 除外
                removeAttributeQuotes: true, // 移除双引号
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // 依赖注入
            chunksSortMode: 'dependency'
        }),
        // 分离 vendor js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // 把从 node_modules 目录下的文件,提出出来,一起打包
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                );
            },
        }),
        // 自己的 vendor
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'my_vendor',
        //     minChunks: function(module, count) {
        //         // 把从 node_modules 目录下的文件,提出出来,一起打包
        //         return (
        //             module.resource &&
        //             /\.js$/.test(module.resource) &&
        //             module.resource.indexOf(
        //                 path.join(__dirname, '../src/vendor')
        //             ) === 0
        //         );
        //     },
        // }),
        // 防止 从 node_modules 目录下的依赖库重新生成新的 hash
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // 复制静态资源
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '..', config.assetsFolder),
            to: config.build.assetsSubDirectory + '/' + config.assetsFolder,
            ignore: ['.*'], // 忽略以点号 开头的文件 .gitkeep
        }]),
    ]
});

// 压缩文件
if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin');
    console.warn('使用 gzip 压缩文件 ');
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]', // 压缩名
            algorithm: 'gzip', // 算法
            // /\.(js|css)$/
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240, // 门槛
            minRatio: 0.8, // 最小比率
        })
    );
}
// 依赖 分析器
if (config.build.bundleAnalyzerReport) {
    console.warn('查看包关系');
    // https://github.com/th0r/webpack-bundle-analyzer
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
