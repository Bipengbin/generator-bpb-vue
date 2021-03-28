const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  devServer: {
    compress: true, // 开启 gzip 压缩
    contentBase: './public', // 所需静态文件地址
    publicPath: '/', // localhost 后文件地址，建议绝对路径
    contentBasePublicPath: '/', // 静态文件引用地址
    port: '8090', // 设置端口号
    hot: true, // 开启热重载，配合 webpack.HotModuleReplacementPlugin 使用
    overlay: { warnings: true, errors: true }, // 警告和错误全屏显示
  },
  plugins: [
    new webpack.DefinePlugin({
      // 设置全局变量
      'process.env': require('./config/dev.env'),
      BASE_URL: JSON.stringify('/'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
})
