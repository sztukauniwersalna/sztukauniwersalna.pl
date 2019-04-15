
const path = require('path');
const webpack = require('webpack');

const IsomorphicHtmlPlugin = require('isomorphic-html-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const externalReact = require('webpack-external-react');

const React = require('react');
const PropTypes = require('prop-types');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');

// global.GA_TRACKING_ID must be set before loading parrot-layout/Root
const GA_TRACKING_ID = global.GA_TRACKING_ID = 'UA-110945340-1';
const Root = require('parrot-layout/Root').Root;

module.exports = {
	entry: {
    client: [
      'paramorph/entry/client',
    ],
    server: [
      'paramorph/entry/server',
    ],
    gtagConfig: [
      'parrot-layout/gtagConfig'
    ],
  },

  output: {
    chunkFilename: '[id]-[contenthash].bundle.js',
    filename: '[name]-[hash].bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    libraryTarget: 'umd',
  },

  mode: 'production',
  target: 'web',
  devtool: false,

  resolve: {
    extensions: [
      '.js', '.markdown', '.css', '.yml'
    ],
    alias: {
      '@website': path.resolve(__dirname),
    },
  },

  resolveLoader: {
    alias: {
      'config-loader': 'paramorph/loader/config',
      'markdown-loader': 'paramorph/loader/markdown',
    },
  },

  externals: externalReact.externals,

  module: {
    noParse: externalReact.noParse,
    rules: [
      {
        test: path.resolve(__dirname, './_config.yml'),
        loader: 'config-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.markdown$/,
        loader: 'markdown-loader',
      },
      {
        test: /\.css$/,
        loader: 'file-loader?name=style-[hash].bundle.css',
      },
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      GA_TRACKING_ID: JSON.stringify(GA_TRACKING_ID),
    }),
    new CopyWebpackPlugin(
      [ '*.ico', '*.jpg', '*.png', '*.svg', '*.ttf', '*.eot', '*.woff', '*.woff2' ]
      .map(from => ({ context: './node_modules/parrot-layout', from }))
      .concat([
        { context: '.', from: 'googlec8e6fdafef950e07.html' },
        { context: './_uploads', from: '*.jpg' },
        { context: '.', from: 'logo-gradient.png' },
        { context: '.', from: 'robots.txt' },
      ])
    ),

    new IsomorphicHtmlPlugin({
      entry: 'server',

      locals: {
        Root,
        title: 'SztukaUniwersalna.pl',
        js: [
          'https://unpkg.com/react@16.8.6/umd/react.production.min.js',
          'https://unpkg.com/prop-types@15.7.2/prop-types.min.js',
          'https://unpkg.com/react-dom@16.8.6/umd/react-dom.production.min.js',
          'https://unpkg.com/react-dom@16.8.6/umd/react-dom-server.browser.production.min.js',
        ],
      },

      globals: {
        React: React,
        PropTypes: PropTypes,
        ReactDOM: ReactDOM,
        ReactDOMServer: ReactDOMServer,
        DISQUS: {
          reset: () => undefined,
        },
      },
    }),

  ],

	optimization: {
    minimizer: [],

    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 1,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\/]node_modules[\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

