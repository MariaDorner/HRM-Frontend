/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  devServer: {
    hot: true,
    allowedHosts: ['localhost'], // Add your allowed hosts here
    historyApiFallback: true,
    open: true,
    static: {
      directory: path.resolve(__dirname, '')
    }
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Admin Dashboard Template',
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
