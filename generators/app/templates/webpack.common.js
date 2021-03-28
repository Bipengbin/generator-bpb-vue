const path = require('path')
// 针对 webpack5 的重写，before require('vue-loader/lib/plugin')
const VueLoaderPlugin = require('vue-loader-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    index: './src/main.js',
  },
  output: {
    filename: 'bundle.[name][hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/', // 设置 webpack 引用资源路径
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 设置需要解析的文件
    alias: {
      '@': resolve('src'), // 设置 @ 为全局引用的解析
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
         //为了确保 JS 的转译应用到 node_modules 的 Vue 单文件组件，你需要通过使用一个排除函数将它们加入白名单
         exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // 编译器可以将某些属性，如 src 路径，转换为 require 调用，以便目标资源可以由 webpack 处理。
          transformToRequire: { img: 'src', image: 'xlink:href', video: 'src' },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 在 vue-loader v15 中，.vue 文件中 lang='less' 会把它当做一个 .less 文件解析，所以在外部添加解析
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|ico|ogm)$/,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 10240,
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
}
