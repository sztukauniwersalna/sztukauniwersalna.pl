const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const { JSDOM } = require('jsdom');

const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDOM = require('react-router-dom');

module.exports = {
	entry: {
    bundle: [
      'paramorph/entry.ts',
    ],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd',
  },

  target: 'web',
  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.yml', '.yaml', '.markdown', '.scss'],
    alias: {
      'paramorph': path.resolve(__dirname, './__paramorph/'),
      'parrot-layout': path.resolve(__dirname, './_layouts/parrot/'),
    }
  },

  resolveLoader: {
    alias: {
      'markdown-loader': require.resolve('./__paramorph/loaders/markdown'),
      'wrap-with-jsx-loader': require.resolve('./__paramorph/loaders/wrap-with-jsx'),
      'add-data-to-globals': require.resolve('./__paramorph/loaders/add-data-to-globals'),
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
      { test: require.resolve('./__paramorph/data/requireContext.js'), use: 'val-loader' },
      { test: /\.tsx?$/, use: [ 'babel-loader', 'ts-loader' ] },
      { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },
      { test: /\.ya?ml$/, use: 'yml-loader' },
      {
        test: /\.markdown$/,
        use: [
          'babel-loader',
          'add-data-to-globals?data=includes',
          'wrap-with-jsx-loader?field=body',
          'markdown-loader?html=true&xhtmlOut=true&linkify=true&typographer=true',
          'json-loader',
          'front-matter-loader',
        ]
      },
      {
        test: /\.scss?$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          { loader: 'css-loader', options: { importLoaders: true, modules: true } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new StaticSiteGeneratorPlugin({
  		entry: 'bundle.js',

			crawl: true,

      paths: [
        '/',
        '/404',
      ],

      globals: {
        self: new JSDOM().window,
        React: React,
        ReactDOM: ReactDOM,
        ReactDOMServer: ReactDOMServer,
        ReactRouterDOM: ReactRouterDOM,
      },
      locals: {
        title: 'SztukaUniwersalna.pl',
        scripts: [
          'https://unpkg.com/react@15/dist/react.js',
          'https://unpkg.com/react-dom@15/dist/react-dom.js',
          'https://unpkg.com/react-router-dom@4.1.2/umd/react-router-dom.js',
          '/bundle.js',
        ],
        stylesheets: [
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        ],
      },
    }),
  ],
};

