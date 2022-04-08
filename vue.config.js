// vue.config.js
const path = require('path');
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        }
    },
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: 'less', //指定预处理器类型
            patterns: [
                path.resolve(__dirname, './src/assets/style/variables.less') //指定全局变量的位置
            ]
        }
    }
}