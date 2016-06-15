const path = require('path');

const webpackMerge = require('webpack-merge');
const commonConfig = require('./common');
const DefinePlugin = require('webpack').DefinePlugin;

const outputDir = path.join(path.dirname(__dirname), '/dev/');

writeHtmlEntryPoint();

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
    ],
});

function writeHtmlEntryPoint() {
  const fs = require('fs');
  const content = `
  <!doctype html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
      <title>Spells (dev mode)</title>
      <script src="polyfills.js"></script>
      <script src="vendor.js"></script>
      <script src="libs-free.js"></script>
  </head>
  <body>
      <app></app>
      <script src="index.js"></script>
  </body>
  </html>
  `;
  fs.writeFileSync(outputDir + 'index.html', content);
}
