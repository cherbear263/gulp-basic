var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var es = require('event-stream');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var autoprefix = require('gulp-autoprefixer');
var del = require('del');

gulp.task('styles', function() {
	return gulp.src('scss/**/*.scss')
	.pipe(sass({style: 'compressed' }))
	.pipe(concat('style.css'))
	.pipe(autoprefix('last 2 versions'))
	.pipe(minifyCss())
	.pipe(gulp.dest('css'));
});

gulp.task('scripts', function() {
	return gulp.src(['js/**/*.js'])
	.pipe(maps.init())
	.pipe(concat('scripts.js'))
	.pipe(uglify())
	.pipe(rename('scripts.min.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('js'));
});

gulp.task('automate', function() {
	gulp.watch('js/**/*.js', ['scripts']);
	gulp.watch('scss/**/*.scss', ['styles']);

});

gulp.task('clean', function() {
	del(['dist', 'css/style.css*', 'js/scripts*.*.js*']);
});

gulp.task("build", ['scripts', 'styles'], function() {
	return gulp.src(["css/style.css", "js/scripts.min.js", 'index.html',
					"img/**", "fonts/**"], {base: './'})
	.pipe(gulp.dest('dist'));

});

gulp.task('default', ["clean"], function() {
	gulp.start('build');
});




