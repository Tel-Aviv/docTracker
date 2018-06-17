var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var jsName = 'bundle.js';

var BUILD_DIR = path.resolve(__dirname, 'public/assets');

var config = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './src/index.jsx')
  ],
  output: {
      path: BUILD_DIR,
      filename: 'bundle.js',
      publicPath: 'assets/',
      chunkFilename: '[name].bundle.js'
  },
  resolve: {
      extensions: ['.js', '.jsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            loader: 'css-loader',
            query: {
              modules: false
            }
          })
      },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader'
      // },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(gif|png|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images/'
        }
      }
    ]
  },
  node: {
   fs: "empty"
  },
 plugins: [
   new ExtractTextPlugin({
     filename: 'styles.css',
     allChunks: true
   })
 ]
};

module.exports = config;
