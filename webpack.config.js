const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const externalReact = require('webpack-external-react');

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

  externals: externalReact.externals,

  module: {
    noParse: externalReact.noParse,
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
      .concat([
        {
          context: '.',
          from: 'googlec8e6fdafef950e07.html',
        },
        {
          context: '.',
          from: 'logo-gradient.png',
        },
      ])
    ),
    new StaticSiteGeneratorPlugin({
      paths: [
        '/',
      ],

      locals: {
        title: 'SztukaUniwersalna.pl',
        js: [
          'https://unpkg.com/react@15/dist/react.js',
          'https://unpkg.com/prop-types@15.6.0/prop-types.min.js',
          'https://unpkg.com/react-dom@15/dist/react-dom.js',
          'https://unpkg.com/react-dom@15.6.1/dist/react-dom-server.min.js',
          'https://unpkg.com/react-router-dom@4.1.2/umd/react-router-dom.js',
          'https://www.googletagmanager.com/gtag/js?id=UA-110945340-1',
        ],
        meta: [
          {
            property: 'fb:app_id',
            content: '1679148002129886',
          },
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

