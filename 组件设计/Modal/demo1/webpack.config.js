var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './index.js'),
  devServer: {
    host: '0.0.0.0',
    port: 8081
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
      ,
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          }
        ]
      }, {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};