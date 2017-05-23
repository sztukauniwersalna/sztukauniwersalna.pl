const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {
	entry: './src/entry.ts',

  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
    libraryTarget: 'umd',
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".yml", ".yaml", ".md", ".markdown"]
  },

  resolveLoader: {
    alias: {
      'ejs-loader': path.join(__dirname, "./src/ejsLoader.js")
    }
  },

  module: {
    rules: [
      { test: require.resolve('./src/requireContext.js'), loader: 'val-loader' },
      { test: /\.tsx?$/, use: 'ts-loader' },
      { enforce: "pre", test: /\.js$/, use: 'source-map-loader' },
      { test: /\.ya?ml$/, use: 'yml-loader' },
      { test: /\.markdown$/, use: [ 'ejs-loader', 'markdown-with-front-matter-loader' ] },
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

