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
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { enforce: "pre", test: /\.js$/, loader: 'source-map-loader' },
    ],
  },

  plugins: [
    new StaticSiteGeneratorPlugin({
  		entry: 'bundle.js',

			crawl: true,

      paths: [
        '/',
      ],

      locals: {
        title: 'SztukaUniwersalna.pl',
      },
    }),
  ]
};

