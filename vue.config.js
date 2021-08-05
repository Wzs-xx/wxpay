'use strict'

const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = 'CloudSchools Vant Template' // page title

module.exports = {
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/quickcharge',
    // eslint-loader 是否在保存的时候检查
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vant': 'vant',
            'axios': 'axios',
        },
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        devtool: 'source-map',

    },
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()
        // config
        //   // https://webpack.js.org/configuration/devtool/#development
        //   .when(process.env.NODE_ENV === 'development', config => config.devtool('source-map'))
    },
    devServer: {
        proxy: {
            '/api': {
                //target: 'http://mvc.apps.cloudschools.cn', //
                target: "https://testnewmvc.apps.cloudschools.cn",/// http://auth.apps.cloudschools.cn',
                changeOrigin: true
            },

        }
    }

}
