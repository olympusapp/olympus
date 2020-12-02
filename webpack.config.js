const NodemonPlugin = require('nodemon-webpack-plugin')
const path = require('path')
const WebpackBar = require('webpackbar')
const WebpackMessages = require('webpack-messages')

module.exports = {
	mode: process.env.NODE_ENV,
	optimization: {
		minimize: true,
	},
	entry: {
		index: './src/index.ts',
	},
	plugins: [
		new WebpackBar({
			name: 'Server',
		}),
		new NodemonPlugin(),
		new WebpackMessages({
			name: 'Server',
			logger: str => console.log(`>> ${str}`)
		})
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: path.resolve(__dirname, './node_modules'),
			},
		],
	},
	resolve: {
		extensions: ['.js', '.ts'],
		alias:{
			Controllers: path.resolve(__dirname, 'src', 'controllers'),
			Routes: path.resolve(__dirname, 'src', 'routes'),
			Middlewares: path.resolve(__dirname, 'src', 'middlewares')
		}
	},
	node: {
		__dirname: false,
	},
	target: 'node',
	externals:[
		'sqlite3',
		'ws',
		'chokidar',
		'express'
	],
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'commonjs',
	}
}