const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

const config = require('./webpack.config');

const HOT_ENTRY = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
];

const HOT_BABEL = {
  loader: 'babel-loader',
  options: {
    plugins: [ 'react-hot-loader/babel' ],
  },
};

module.exports = {
  entry: Object.assign({}, config.entry, {
    'hot-bootstrap': HOT_ENTRY,
  }),

  output: {
    chunkFilename: '[id].bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: path.resolve(__dirname, '/'),
    libraryTarget: 'umd',
  },

  devtool: config.devtool,
  target: config.target,
  resolve: config.resolve,
  resolveLoader: config.resolveLoader,
  externals: config.externals,

  module: {
    noParse: config.module.noParse,
    rules: config.module.rules.map(rule => {
      if (rule.use instanceof Array && rule.use[0] === 'babel-loader') {
        rule.use[0] = HOT_BABEL;
      } else if (rule.use === 'babel-loader') {
        rule.use = HOT_BABEL;
      }
      return rule;
    }),
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css'),
    new CopyWebpackPlugin(
      [
        '*.jpg',
        '*.png',
        '*.svg',
        '*.ttf',
        '*.eot',
        '*.woff',
        '*.woff2',
      ]
      .map(from => ({ context: './node_modules/parrot-layout', from }))
    ),
    new HtmlPlugin({
      template: 'test.html',
      filename: 'index.html',
      inject: true,
    }),
  ],
};

