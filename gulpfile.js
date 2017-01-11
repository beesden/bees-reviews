'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var sequence = require('gulp-sequence');
var del = require('del');
var gutil = require('gulp-util');
var ngTemplates = require('gulp-angular-templatecache');

var config = {
    dist: 'dist',
    script: "src/app/**/*.js",
    style: "src/app.css",
    template: "src/templates/**/*.html"
};

var catchError = function(error, graceful) {
    gutil.log(gutil.colors.magenta(stderr));
    if (graceful) {
        this.emit('end');
    }
};

/**
 * @task clean
 *
 * Delete previously built content
 */
gulp.task('clean', function() {
    return del(config.dist);
});

/**
 * @task bower
 *
 * Install all bower dependencies
 */
gulp.task('bower', function(cb) {
    var cmd = 'bower install -p';
    var exec = require('child_process').exec;

    return exec(cmd, function(err, stdout, stderr) {
        if (stderr) {
            catchError(error);
        }
        cb(err);
    });
});

/**
 * @task scripts
 *
 * Build the scripts
 */
gulp.task('scripts', function() {
    return gulp.src(config.script)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(config.dist));
});

/**
 * @task styles
 *
 * Build the styles
 */
gulp.task('styles', function() {
    return gulp.src(config.style)
        .pipe(gulp.dest(config.dist));
});

/**
 * @task templates
 *
 * Build the templates for the BB widget
 */
gulp.task('templates', function() {
    return gulp.src(config.template)
        .pipe(ngTemplates({
            module: 'app',
            moduleSystem: 'IIFE',
            //  standalone: true,
            transformUrl: function(url) {
                return '/templates/' + url;
            }
        }).on('error', catchError))
        .pipe(gulp.dest(config.dist));
});


/**
 * @task watch
 *
 * Watch for changes
 */
gulp.task('watch', function() {
    var watchConfig = {interval: 0.8};
    gulp.watch(config.script, watchConfig, ['scripts']);
    gulp.watch(config.style, watchConfig, ['styles']);
    gulp.watch(config.template, watchConfig, ['templates']);
});

/**
 * @task dist
 *
 * Complete build the dist BB widget
 */
gulp.task('default', ['clean'], function(cb) {
    return sequence.apply(this, [
        'bower',
        ['scripts', 'styles', 'templates'],
        cb
    ]);
});