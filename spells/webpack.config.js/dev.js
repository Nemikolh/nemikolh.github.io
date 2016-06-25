const path = require('path');

const webpackMerge = require('webpack-merge');
const commonConfig = require('./common');
const DefinePlugin = require('webpack').DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputDir = path.join(path.dirname(__dirname), '/dev/');


module.exports = webpackMerge(commonConfig, {
    debug: true,
    devtool: 'source-map',
    devServer: {
        inline: true,
        colors: true,
        historyApiFallback: false,
        contentBase: 'dev/',
        publicPath: '/',
        port: 8003,
    },
    output: {
        path: outputDir,
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        sourceMapFilename: '[name].map.js'
    },
    plugins: [
        new DefinePlugin({
            VERSION: "1.0",
            IS_PRODUCTION: false,
        }),
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          chunksSortMode: 'dependency',
          inject: false,
          is_dev: true,
        }),
    ],
});
