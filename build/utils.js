var path = require('path');;
var config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProduction = process.env.NODE_ENV === 'production';

// 静态资源路径下的 相对路径
exports.assetsPath = function (_path) {
    var assetsSubDirectory = isProduction ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
}

// css 加载器
exports.cssLoaders = function (options) {
    options = options || {};
    var styleLoader = {
        loader: 'style-loader',
    };
    // css 装载器
    var cssLoader = {
        loader: 'css-loader',
        options: {
            // 要 sourceMap 定位准确,必须设为 true , 生产环境要压缩
            minimize: options.sourceMap || isProduction,
            sourceMap: options.sourceMap,
        },
    };
    var postcssLoader = {
        loader: 'postcss-loader',
    };

    // 其他 (类 css 语法) 装载器 生成函数
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader, postcssLoader]; // 默认填充一个 css 语法
        if (loader) {
            // 找到对应的 语法装载器
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap,
                }),
            });
        }
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: styleLoader,
            });
        } else {
            return [styleLoader].concat(loaders);
        }
    }

    return {
        css: generateLoaders(),
        scss: generateLoaders('sass'),
    };
}

// vue 文件以外的 css 加载器
exports.styleLoaders = function (options) {
    var output = [];
    var loaders = exports.cssLoaders(options);
    for (var extension in loaders) {
        var loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader,
        });
    }
    return output;
}
