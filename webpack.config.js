const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const { JSDOM } = require('jsdom');

module.exports = {
	entry: {
    bundle: [
      'paramorph/entry.ts',
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd',
  },

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

  module: {
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
      },
      locals: {
        title: 'SztukaUniwersalna.pl',
        scripts: [ '/bundle.js' ]
      },
    }),
  ]
};

