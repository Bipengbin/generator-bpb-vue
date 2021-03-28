const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: ['public'],
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': require('./config/prod.env'),
      BASE_URL: JSON.stringify('/'),
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
})
