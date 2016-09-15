/* eslint-disable */

var path = require('path');
var cooking = require('cooking');
var webpack = require('webpack');

cooking.set({
    entry: {
        app: './src/main.js',
        login: './src/login.js',
        vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', './src/polyfill']
    },
    dist: './dist',
    template: [{
        filename: 'index.html',
        template: 'src/template/index.html',
        chunks: ['common', 'vendor', 'app']
    }, {
        filename: 'login.html',
        template: 'src/template/login.html',
        chunks: ['common', 'vendor', 'login']
    }],
    externals: {
        'jQuery': 'jquery'
    },
    devServer: {
        port: 8080,
        publicPath: '/',
        clean: false,
        proxy: {
            // '/api/**': {
            //     target: 'http://localhost:3000/',
            //     secure: false,
            //     changeOrigin: true
            // }
        }
    },

    // production
    clean: true,
    hash: true,
    sourceMap: true,
    publicPath: '/',
    assetsPath: 'images',
    urlLoaderLimit: 10000,
    extractCSS: 'css/[name].[contenthash:7].css',
    extends: ['vue2', 'eslint', 'less', ]
});

cooking.add('resolve.alias', {
    'src': path.join(__dirname, 'src')
});

if (process.env.NODE_ENV === 'production') {
    cooking.add('output.filename', 'js/[name].[chunkhash].js')
    cooking.add('output.chunkFilename', 'js/[id].[chunkhash].js')
    cooking.add('plugin.CommonsChunk', new webpack.optimize.CommonsChunkPlugin({
        names: ["common", "vendor"]
    }))
}

module.exports = cooking.resolve()
