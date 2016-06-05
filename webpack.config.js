var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
	debug: true,
	devtool: 'inline-source-map',
	entry: './main.js',
	output: {
		filename: 'bundle.js',
		sourceMapFilename: 'bundle.js.map'
	},
	postcss: function () {
		return [precss, autoprefixer];
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react']
			}
		}, {
			test: /\.scss$/,
			loader: 'style!css!postcss-loader!sass!'
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}, {
			test: /\.(png|woff|woff2|eot|ttf|svg)$/,
			loader: 'url-loader?limit=100000'
		}]
	}
};
