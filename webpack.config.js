const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      '.js', '.markdown', '.css',
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
    'prop-types': {
      root: 'React.PropTypes',
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
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
      require.resolve('prop-types'),
      require.resolve('react-dom'),
      require.resolve('react-dom/server'),
      require.resolve('react-router-dom'),
    ],
    rules: [
      { test: require.resolve('./node_modules/paramorph/data/requireContext'), use: 'val-loader' },
      { test: require.resolve('./node_modules/paramorph/data/config'), use: 'val-loader' },
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
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ use: 'raw-loader' }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('style-[hash].bundle.css'),
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
    new StaticSiteGeneratorPlugin({
      paths: [
        '/',
      ],

      locals: {
        title: 'SztukaUniwersalna.pl',
        js: [
          'https://unpkg.com/react@15/dist/react.js',
          'https://unpkg.com/react-dom@15/dist/react-dom.js',
          'https://unpkg.com/react-router-dom@4.1.2/umd/react-router-dom.js',
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

