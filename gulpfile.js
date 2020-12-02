const gulp = require('gulp')
const webpack = require('webpack-stream')
const serverConfig = require('./webpack.config.js')
const memoriaConfig = require('./modules/memoria/webpack.config.js')

function watchServer(){

	const webpackInstance = webpack({
		...serverConfig,
		watch: true
	})

	gulp.src('src/index.ts')
		.pipe(webpackInstance)
		.pipe(gulp.dest('dist/'))
}

function watchMemoria(){

	const webpackInstance = webpack({
		...memoriaConfig,
		watch: true
	})

	gulp.src('modules/memoria/src/index.ts')
		.pipe(webpackInstance)
		.pipe(gulp.dest('modules_dist/memoria'))
}

gulp.task('default', function() {
	return new Promise(async () => {
		watchServer()
		watchMemoria()
	})
})
