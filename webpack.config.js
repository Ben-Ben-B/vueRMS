// 导入html-webpack-plugin 包，用来根据模板自动生成index.html
var htmlwp = require('html-webpack-plugin');
var path = require('path');
module.exports = {
    entry: './src/main.js', // 1.0 定义打包的入口文件路径
    output: {
        path: path.join(__dirname, '/dist'), //打包以后的文件存放目录
        filename: 'build.js' // 打包以后生成的文件名称
    },
    module: {
        loaders: [{
                // 打包的时候碰到.css文件则被这个正则匹配
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 在使用npm安装的 node-sas s的时候会自动跑到github上去下载，会很慢，这时请使用 cnpm i node-sass sass-loader --save-dev
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            // 配置图片的正则表达式和loader
            {
                // 表示匹配.png,.jpg,.gif的任一一个
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
                // url-loader这种写法不管图片大小均以base64的形式打包到build.js中,那么如果图片很大的话，会导致
                //build.js文件也很大，性能低下
                // loader:['url-loader']  
                // 上述问题可以使用 limit=10240(Byte) （10K） 来限定如果超过这个值，则拷贝原图片，否则则打包到build.js中
                loader: ['url-loader?limit=10240']
            },
            // 配置 .vue文件的打包正则
            {
                // 匹配一个vue的组件页面
                test: /\.vue$/,
                loader: ['vue-loader']
            },
            // 如果使用的webpack1.0的话这个配置就会起作用
            {
                // es6语法通常是写在 .js文件中
                test: /\.js$/,
                loader: ['babel-loader'], //负责将es6转换成es5
                // 排除node_modules下面的所有js文件
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new htmlwp({
            filename: 'index.html',
            template: 'index1.html'
        })
    ]
}