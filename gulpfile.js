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

// distribution
gulp.task('dist', ['bowerSrc'], function() {
	gulp.src('./app/**/*')
		.pipe(gulp.dest('./dist'));
});

gulp.task('bowerSrc', function () {
	bowerSrc()
		.pipe(gulp.dest('./dist/bower_components'));
});

gulp.task('default', ['serve']);