var config = require('../config');
var webpack = require('webpack');
var merge = require('webpack-merge');
var utils = require('./utils');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
        }),
    },
    devtool: '#cheap-module-eval-source-map',
    // devtool: '#eval-source-map',
    // devtool: '#source-map',
    plugins: [
        new webpack.DefinePlugin({
            NAME: JSON.stringify(config.projectName),
            STATIC: JSON.stringify(`/${config.dev.assetsSubDirectory}`),
            ENV: JSON.stringify(config.dev.env.NODE_ENV),
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true
        }),
        new FriendlyErrorsPlugin(),
    ],
});
