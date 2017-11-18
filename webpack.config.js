const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { JSDOM } = require('jsdom');

const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDOM = require('react-router-dom');

module.exports = {
	entry: {
    entry: [
      'paramorph/entry',
    ],
  },

  output: {
    chunkFilename: '[id]-[contenthash].bundle.js',
    filename: '[name]-[hash].bundle.js',
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd',
  },

  target: 'web',

  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.markdown',
    ],
    alias: {
      'includes': path.resolve(__dirname, './_includes/'),
    }
  },

  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
    },
    'react-dom/server': {
      root: 'ReactDOMServer',
      commonjs: 'react-dom/server',
      commonjs2: 'react-dom/server',
    },
    'react-router-dom': {
      root: 'ReactRouterDOM',
      commonjs: 'react-router-dom',
      commonjs2: 'react-router-dom',
    },
  },

  module: {
    noParse: [
      require.resolve('react'),
      require.resolve('react-dom'),
      require.resolve('react-dom/server'),
      require.resolve('react-router-dom'),
    ],
    rules: [
      { test: require.resolve('./node_modules/paramorph/data/config'), use: 'val-loader' },
      { test: require.resolve('./node_modules/paramorph/data/requireContext'), use: 'val-loader' },
      { test: /\.tsx?$/, use: [ 'babel-loader', 'ts-loader' ] },
      { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },
      {
        test: /\.markdown$/,
        use: [
          'babel-loader',
          'paramorph/loaders/add-data-to-globals?data=includes',
          'paramorph/loaders/wrap-with-jsx?field=body',
          'paramorph/loaders/markdown?html=true&xhtmlOut=true&linkify=true&typographer=true',
          'json-loader',
          'front-matter-loader',
        ],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin(
      [
        '*.css',
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
    new StaticSiteGeneratorPlugin({
			crawl: true,

      paths: [
        '/',
        '/404',
      ],

      locals: {
        title: 'SztukaUniwersalna.pl',
        scripts: [
          'entry',
        ],
        externalScripts: [
          'https://unpkg.com/react@15/dist/react.js',
          'https://unpkg.com/react-dom@15/dist/react-dom.js',
          'https://unpkg.com/react-router-dom@4.1.2/umd/react-router-dom.js',
        ],
        externalStylesheets: [
          '/style.bundle.css',
        ],
      },

      globals: {
        self: new JSDOM().window,
        React: React,
        ReactDOM: ReactDOM,
        ReactDOMServer: ReactDOMServer,
        ReactRouterDOM: ReactRouterDOM,
        DISQUS: {
          reset: () => undefined,
        },
      },
    }),
  ],
};

