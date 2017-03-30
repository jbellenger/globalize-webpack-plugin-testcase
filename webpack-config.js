const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GlobalizePlugin = require( 'globalize-webpack-plugin' );
const path = require('path');

const supportedLocales = [ 'en', 'zh', 'es' ];

const mkConfig = (label, ...extraPlugins) => ({
	entry: {
		main: './app/index.js',
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
		publicPath: '',
		chunkFilename: '[name].[chunkhash:16].js',
		filename: '[name].[chunkhash:16].js'
	},
	plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true
    }),
    new HtmlWebpackPlugin({
      production: true,
      template: './index-template.html'
    }),
		new GlobalizePlugin({
			production: true,
			developmentLocale: 'en',
			supportedLocales,
			messages: 'messages/[locale].json',
			output: 'i18n/[locale].[chunkhash].js'
		}),
		new webpack.optimize.CommonsChunkPlugin({
      name: [ 'vendor', 'manifest' ],
      minChunks: Infinity
    }),
    ...extraPlugins
  ]
});

module.exports = [
  // CommonsChunk can be used safely as long as minChunks is greater
  // than the number of i18n chunks
  mkConfig('good-CommonsChunk', new webpack.optimize.CommonsChunkPlugin({
    async: 'shared',
    children: true,
    minChunks: supportedLocales.length + 1,
  })),

  // CommonsChunk will break when minChunks <= supportedLocales
  mkConfig('bad-CommonsChunk', new webpack.optimize.CommonsChunkPlugin({
    async: 'shared',
    children: true,
    minChunks: supportedLocales.length
  })),
];
