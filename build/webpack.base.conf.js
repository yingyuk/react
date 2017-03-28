var path = require('path');
var config = require('../config');
var utils = require('./utils');

var isProduction = process.env.NODE_ENV === 'production';

// 相对根目录的,相对路径 转换成 绝对路径
function resolve(dir) {
    return path.join(__dirname, '../', dir);
}

let rules = [{
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src')],
}, {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    query: {
        limit: 5000,
        name: utils.assetsPath('image/[name].[hash:7].[ext]'),
    }
}, {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
    },
}];

var useEslint = isProduction ? config.build.eslint : config.dev.eslint;

if (useEslint) {
    var eslint = {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src')],
        options: {
            formatter: require('eslint-friendly-formatter'),
        },
    };
    rules.unshift(eslint);
}

module.exports = {
    entry: {
        app: './src/entry-client.js', // 入口文件
    },
    output: {
        path: config.build.assetsRoot, // 资源路径
        publicPath: isProduction ? config.build.assetsPublicPath : config.dev.assetsPublicPath, // 静态资源转 cdn 的地址
        filename: '[name].js', // 输出文件名
    },
    externals: {
        'http': 'http',
        "react-dom": "ReactDOM",
        "react": "React",
        "react-router": "ReactRouter",
        'react-addons-css-transition-group': 'React.addons.CSSTransitionGroup',
    },
    resolve: {
        // modules: [
        //     "node_modules"
        // ],
        extensions: [".vue", ".js", ".json", ".jsx", ".css", ".scss"], // 可引入的 文件拓展名
        // fallback: [path.join(__dirname, '../node_modules')], // 依赖库 路径
        // [文件, 路径] 的简称
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': resolve('src'),
            'views': resolve('src/views'),
            'common': resolve('src/common'),
            'vendor': resolve('src/vendor'),
            'components': resolve('src/components'),
            'api': resolve('src/api'),
            'fonts': resolve('src/common/fonts'),
        },
    },
    // resolveLoader: {
    //     fallback: [path.join(__dirname, '../node_modules')],
    // },
    module: {
        rules: rules,
    },
};
