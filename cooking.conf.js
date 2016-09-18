/* eslint-disable */

var path = require('path');
var cooking = require('cooking');
var webpack = require('webpack');

var config = {
    entry: {
        app: './src/main.js',
        login: './src/login.js',
        vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', './src/polyfill']
    },
    dist: './dist/static',
    externals: {
        'jQuery': 'jquery'
    },
    devServer: {
        port: 8080,
        publicPath: '/',
        clean: false,
        proxy: {
            
        }
    },

    // production
    clean: true,
    hash: true,
    sourceMap: true,
    publicPath: '/static/',
    assetsPath: 'images',
    urlLoaderLimit: 10000,
    extractCSS: 'css/[name].[contenthash:7].css',
    extends: ['vue2', 'eslint', 'less', ]
}
if (process.env.NODE_ENV === 'production') {
    config.template = [{
        filename: '../index.html',
        template: 'src/template/index.html',
        chunks: ['common', 'vendor', 'app']
    }, {
        filename: '../login.html',
        template: 'src/template/login.html',
        chunks: ['common', 'vendor', 'login']
    }]
} else {
    config.template = [{
        filename: 'index.html',
        template: 'src/template/index.html',
        chunks: ['vendor', 'app']
    }, {
        filename: 'login.html',
        template: 'src/template/login.html',
        chunks: ['vendor', 'login']
    }]
}

cooking.set(config);

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
