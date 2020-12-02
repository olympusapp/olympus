const path = require('path')
const WebpackBar = require('webpackbar')
const WebpackMessages = require('webpack-messages')

module.exports = {
	mode: process.env.NODE_ENV,
	optimization: {
		minimize: true,
	},
	entry: {
		index: path.join(__dirname, 'src', 'index.ts'),
	},
	plugins: [
		new WebpackBar({
			name: 'Memoria',
		}),
		new WebpackMessages({
			name: 'Memoria',
			logger: str => console.log(`>> ${str}`)
		})
	],
	node: {
		__dirname: false,
	},
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
		extensions: ['.ts'],
		alias:{
			VerifyToken: path.resolve(__dirname, '..', '..', 'src', 'utils', 'verify_token'),
		}
	},
	target: 'node',
	externals:[
		'ws',
		'chokidar',
		'express',
		'fs-extra',
		'express-ws',
		'jsonwebtoken',
		'express-fileupload'
	],
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, '..','..','modules_dist', 'memoria'),
		libraryTarget: 'commonjs',
	}
}