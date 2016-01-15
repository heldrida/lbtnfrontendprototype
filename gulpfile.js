var config = require('./config');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var bowerSrc = require('gulp-bower-src');
var htmlReplace = require('gulp-html-replace');
var replace = require('gulp-replace');
var gulpFilter = require('gulp-filter');
var DiffDeployer = require('ftp-diff-deployer');

gulp.task('sass', function () {
	return gulp.src('src/sass/**/*.scss')
			.pipe(plumber())
			.pipe(sass())
			.pipe(gulp.dest('./app/css'));
});

gulp.task('watch', function () {
	gulp.watch('./src/js/**/*.js', ['browserify']);
	gulp.watch('./src/sass/**/*.scss', ['sass']);
	gulp.watch('./app/css/*.css', ['reload']);
	gulp.watch("./app/index.html", ['reload']);
	gulp.watch("./app/js/**/*.js", ['reload']);
});

gulp.task('browserify', function () {
	return browserify('./src/js/app.js')
			.bundle()
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('./app/js'));
});

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('serve', ['watch'], function () {

	browserSync.init({
		server: {
			baseDir: "./app",
			routes: {
				"/bower_components": "./bower_components"
			}
		}
	});

});

// build
gulp.task('build', ['bowerSrc'], function() {
	gulp.src('./app/**/*')
		.pipe(gulp.dest('./build'));
});

gulp.task('bowerSrc', function () {
	bowerSrc()
		.pipe(gulp.dest('./build/bower_components'));
});

gulp.task('deploy', function () {

	var deployer = new DiffDeployer({
		host: '216.70.112.70',
		auth: {
			username: config.ftp.username,
			password: config.ftp.password
		},
		src: 'app',
		dest: '/clv4',
		memory: 'ftp-diff-deployer-memory-file.json',
		exclude: ['node_modules']
	});

	deployer.deploy(function (err) {
		if (err) {
			console.error('Something went wrong!');
			console.error(err);
		} else {
			console.log('Everything went fine!');
		}
	});

});

gulp.task('default', ['serve']);