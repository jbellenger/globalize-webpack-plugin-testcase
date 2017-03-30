const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GlobalizePlugin = require( 'globalize-webpack-plugin' );
const path = require('path');

const supportedLocales = [ 'en', 'zh', 'es' ];

const mkConfig = (label, minChunks) => ({
	entry: {
		main: './app.js',
		vendor: [
			'globalize',
			'globalize/dist/globalize-runtime/number',
			'globalize/dist/globalize-runtime/currency',
			'globalize/dist/globalize-runtime/date',
			'globalize/dist/globalize-runtime/message',
			'globalize/dist/globalize-runtime/plural',
			'globalize/dist/globalize-runtime/relative-time',
			'globalize/dist/globalize-runtime/unit'
		]
	},
	output: {
		path: path.resolve(`./dist/${label}`),
		chunkFilename: '[name].[chunkhash:16].js',
		filename: '[name].[chunkhash:16].js'
	},
	plugins: [
    new HtmlWebpackPlugin({
      production: true,
      template: './index-template.html'
    }),
		new GlobalizePlugin({
			production: true,
			developmentLocale: 'en',
			supportedLocales: supportedLocales,
			messages: 'messages/[locale].json',
			output: 'i18n/[locale].[chunkhash].js'
		}),
		new webpack.optimize.CommonsChunkPlugin({
      name: [ 'vendor', 'manifest' ],
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'shared',
      children: true,
      minChunks: minChunks
    })
  ]
});

module.exports = [
  // CommonsChunk can be used safely as long as minChunks is greater
  // than the number of i18n chunks
  mkConfig('good', supportedLocales.length + 1),
  mkConfig('bad', supportedLocales.length)
];
