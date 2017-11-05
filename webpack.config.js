const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const { JSDOM } = require('jsdom');

const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDOM = require('react-router-dom');

module.exports = {
	entry: {
    entry: [
      'paramorph/entry.ts',
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
    extensions: ['.ts', '.tsx', '.js', '.json', '.yml', '.yaml', '.markdown', '.scss'],
    alias: {
      'paramorph': path.resolve(__dirname, './__paramorph/'),
      'includes': path.resolve(__dirname, './_includes/'),
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
        test: /\.css?$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          { loader: 'css-loader', options: { importLoaders: true, modules: true } },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40 * 1024,
            },
          },
        ],
      },
    ],
  },

  plugins: [
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
          'https://fonts.googleapis.com/icon?family=Material+Icons|Andada|Roboto+Slab:300,400,700&amp;subset=latin-ext'
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

