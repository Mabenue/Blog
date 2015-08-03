/**
 * Created by alexconway on 21/07/15.
 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    filter = require('gulp-filter'),
    mainBowerFiles = require('main-bower-files'),
    del = require('del');

gulp.task('scripts', function() {
    return gulp.src(['app/**/*.js', '!app/**/*test.js', '!vendor', '!app/vendor/**', '!app/modernizr-2.8.3.min.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('vendorjs', function() {
    return gulp.src(mainBowerFiles())
        .pipe(filter('*.js'))
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('css', function() {
    return gulp.src(['app/*.css', '!vendor', '!app/vendor/**'])
        .pipe(concat('app.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});

gulp.task('vendorcss', function(){
    return gulp.src(mainBowerFiles())
        .pipe(filter('*.css'))
        .pipe(concat('vendor.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});

var filesToMove = ['app/index.html',
        'app/img/**/*.*',
        'app/fonts/**/*.*',
        'app/about/About.html',
        'app/contact/Contact.html',
        'app/home/Home.html',
        'app/login/Login.html',
        'app/signup/Signup.html',
        'app/post/Post.html',
        'app/modernizr-2.8.3.min.js'];

gulp.task('move', function(){
    gulp.src(filesToMove, { base: 'app/'})
        .pipe(gulp.dest('build'));
});

gulp.task('clean', function(cb){
    del(['build/'], cb)
});

gulp.task('default', ['clean'], function(){
    gulp.start('vendorjs', 'vendorcss', 'scripts', 'css', 'move');
});