
const webpack = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
    // Entry points
    entry: {
        polyfills: './src/polyfills.ts',
        vendor: './src/vendor.ts',
        index: './src/index.ts',
        'libs-free': './src/libs-free.ts'
    },

    resolve: {
        extensions: ['', '.ts', '.js'],
        root: __dirname,
        modulesDirectories: ['node_modules']
    },

    module: {
        loaders: [
            // Sass / css / fonts
            { test: /\b(?!index)\w+\.scss$/,  loader: 'css?sourceMap!sass?sourceMap' },
            { test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file?name=fonts/[hash].[ext]' },
            { test: /\.otf$/, loader: 'file?name=fonts/[hash].[ext]' },
            { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file?name=fonts/[hash].[ext]' },
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file?name=fonts/[hash].[ext]' },
            { test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file?name=fonts/[hash].[ext]' },
            { test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file?name=fonts/[hash].[ext]' },
            { test: /\b(?!normalize)\w+\.css$/,   loader: 'raw'   },
            // Json / html / pegjs / ts
            { test: /\.json$/,  loader: 'json'  },
            { test: /\b(?!index)\w+\.html$/,  loader: 'url'   },
            { test: /\.fs$/,    loader: 'raw'   },
            { test: /\.vs$/,    loader: 'raw'   },
            { test: /\.ts$/,    loader: 'awesome-typescript', exclude: [/\.spec.ts$/] }
        ]
    },

    plugins: [
        new ForkCheckerPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills'],
            minChunks: Infinity
        }),
    ],

    node: {
        global: 'window',
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
