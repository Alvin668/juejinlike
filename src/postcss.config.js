// postcss.config.js
module.exports = {
    plugins: {
        "postcss-pxtorem": {
            rootValue: 37.5, //与vant保持一致，所有单位以375尺寸的设计稿为准
            propList: ['*']
        }
    }
}