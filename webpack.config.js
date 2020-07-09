const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/scripts/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	performance: {
		hints: false
	},
	plugins: [new HtmlWebpackPlugin()],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
	    port: 1234,
		historyApiFallback: true
	}
};
