const path = require('path');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

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

const HOT_PLUGINS = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];

module.exports = {
  entry: Object.assign({}, config.entry, {
    'hot-bootstrap': HOT_ENTRY,
  }),

  output: Object.assign(config.output, {
    chunkFilename: '[id].bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
  }),

  devtool: config.devtool,
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

  plugins: HOT_PLUGINS.concat(config.plugins.map(plugin => {
    if (plugin instanceof StaticSiteGeneratorPlugin) {
      return new StaticSiteGeneratorPlugin({
        entry: plugin.entry,
        crawl: plugin.crawl,
        paths: plugin.paths,
        globals: plugin.globals,
        locals: Object.assign({}, plugin.locals, {
          scripts: plugin.locals.scripts.concat([ 'hot-bootstrap' ]),
        }),
      });
    }
    return plugin;
  })),
};

