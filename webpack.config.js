const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {
	entry: 'paramorph/entry.ts',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd',
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".yml", ".yaml", ".markdown"],
    alias: {
      'paramorph': path.resolve(__dirname, './__paramorph/'),
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
      { test: require.resolve('./__paramorph/data/requireContext.js'), loader: 'val-loader' },
      { test: /\.tsx?$/, use: 'ts-loader' },
      { enforce: "pre", test: /\.js$/, use: 'source-map-loader' },
      { test: /\.ya?ml$/, use: 'yml-loader' },
      {
        test: /\.markdown$/,
        use: [
          'babel-loader',
          'add-data-to-globals?data=includes',
          'wrap-with-jsx-loader?field=body',
          'markdown-loader?html=true&linkify=true&typographer=true',
          'json-loader',
          'front-matter-loader'
        ]
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

      locals: {
        title: 'SztukaUniwersalna.pl',
      },
    }),
  ]
};

