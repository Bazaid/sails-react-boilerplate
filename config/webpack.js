const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const destinationPath = path.resolve(__dirname, '../.tmp');
const publicPath = path.resolve(destinationPath, './public');

module.exports.webpack = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/js/index.js'),
  output: {
    path: publicPath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(ttf|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/index.html'),
        to: publicPath
      }
    ])
  ],
  parallelism: 4
};
