/**
 * Created by alexconway on 21/07/15.
 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    filter = require('gulp-filter'),
    flatten  = require('gulp-flatten'),
    less = require('gulp-less'),
    mainBowerFiles = require('main-bower-files'),
    del = require('del');

/** Scripts **/
gulp.task('scripts', function() {
    return gulp.src(['app/**/*.js', '!app/**/*test.js', '!vendor', '!app/vendor/**', '!app/modernizr-2.8.3.min.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('scriptsDev', function() {
    return gulp.src(['app/**/*.js', '!app/**/*test.js', '!vendor', '!app/vendor/**', '!app/modernizr-2.8.3.min.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('vendorjs', function() {
    return gulp.src(mainBowerFiles())
        .pipe(filter('*.js'))
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('vendorjsDev', function() {
    return gulp.src(mainBowerFiles())
        .pipe(filter('*.js'))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build/js'));
});

/** CSS and LESS**/
gulp.task('moveVendorLess', function(){
    return gulp.src('app/vendor/bootstrap/less/**/*.*')
        .pipe(gulp.dest('build/less'))
});

gulp.task('moveLess', ['moveVendorLess'], function(){
    return gulp.src('app/less/bootstrap/variables.less')
        .pipe(filter('*.less'))
        .pipe(gulp.dest('build/less'))
});

gulp.task('compileLess', ['moveLess'], function(){
    return gulp.src('build/less/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest('build/less'))
});

gulp.task('css', function() {
    return gulp.src([ 'app/*.css', '!vendor', '!app/vendor/**'])
        .pipe(concat('app.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});

gulp.task('vendorcss', ['compileLess'], function(){
    return gulp.src(mainBowerFiles())
        .pipe(filter('*.css'))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('appendBootstrap', ['vendorcss'], function(){
    return gulp.src(['build/css/vendor.css', 'build/less/bootstrap.css'])
        .pipe(concat('vendor.css'))
	.pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});

/** Move Files **/
var resources = ['app/index.html',
        'app/img/**/*.*',
        'app/fonts/**/*.*'];

gulp.task('move', function(){
    gulp.src(resources, { base: 'app/'})
        .pipe(gulp.dest('build'))
});

gulp.task('partials', function(){
    gulp.src(['app/**/*.html', '!app/index.html', '!app/vendor/**/*.html'])
        .pipe(flatten())
        .pipe(gulp.dest('build/partials'))
});

gulp.task('moveModernizr', function(){
    gulp.src('app/modernizr-2.8.3.min.js')
        .pipe(gulp.dest('build/js'))
});

gulp.task('clean', function(cb){
    del(['build/'], cb)
});

/** Start Tasks **/
gulp.task('default', ['clean'], function(){
    gulp.start('vendorjs', 'vendorcss', 'appendBootstrap', 'scripts', 'css', 'move', 'partials', 'moveModernizr');
});

gulp.task('dev', ['clean'], function(){
    gulp.start('vendorjsDev', 'vendorcss', 'appendBootstrap', 'scriptsDev', 'css', 'partials', 'move', 'moveModernizr');
});
