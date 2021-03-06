'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    bourbon = require('node-bourbon'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    reload = browsersync.reload;

var appRoot = './app',
    buildRoot = './build';

var dir = {
    html: '',
    htmlTmp: '/html-template',
    js: '/js',
    scss: '/stylesheets',
    css: '/css',
    images: '/images',
    fonts: '/fonts',
    libs: '/libs'
}

var appPaths = {
    html: appRoot + dir.html + '/*.html',
    htmlTmp: appRoot + dir.htmlTmp + '/*.html',
    js: appRoot + dir.js + '/*.js',
    jsLibs: appRoot + dir.js + '/libs/*.js',
    scss: appRoot + dir.scss + '/**/*.scss',
    images: appRoot + dir.images + '/**/*.*',
    fonts: appRoot + dir.fonts + '/**/*.*',
    libs: appRoot + dir.libs + '/**/*.*'
};

var buildPaths = {
    html: buildRoot + dir.html,
    js: buildRoot + dir.js,
    jsLibs: buildRoot + dir.js + '/libs',
    css: buildRoot + dir.css,
    images: buildRoot + dir.images,
    libs: buildRoot + dir.libs,
    fonts: buildRoot + dir.fonts
};

// Scss stylesheets
gulp.task('stylesheets', function() {
    return gulp.src(appPaths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            //loadPath: [appPaths.mainScss]
            outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        })).on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildPaths.css))
        .pipe(reload({
            stream: true
        }));
});


gulp.task('js', function() {

    gulp.start('jsLibs');

    return gulp.src(appPaths.js)
        .pipe(sourcemaps.init())
        //.pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildPaths.js))
        .pipe(reload({
            stream: true
        }));

});

gulp.task('jsLibs', function() {
    return gulp.src(appPaths.jsLibs)
        //.pipe(uglify())
        .pipe(gulp.dest(buildPaths.jsLibs))
        .pipe(reload({
            stream: true
        }));

});

gulp.task('libs', function() {
    return gulp.src(appPaths.libs)
        .pipe(gulp.dest(buildPaths.libs))
        .pipe(reload({
            stream: true
        }));
});

// Copy images
gulp.task('images', function() {
    gulp.src(appPaths.images)
        .pipe(gulp.dest(buildPaths.images))
});

gulp.task('html', function() {
    gulp.src(appPaths.html)
        .pipe(rigger())
        .pipe(gulp.dest(buildPaths.html))
        .pipe(reload({
            stream: true
        }));
});

// Copy fonts
gulp.task('fonts', function() {
    gulp.src(appPaths.fonts)
        .pipe(gulp.dest(buildPaths.fonts))
        .pipe(reload({
            stream: true
        }));
});

// Server
gulp.task('server', function() {
    browsersync.init({
        server: buildRoot,
        port: 8000,
        notify: false,
        open: true
    });
});


gulp.task('minifyimg', function() {
    return gulp.src(appPaths.images)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            une: [pngquant()]
        }))
        .pipe(gulp.dest(buildPaths.images))
});


gulp.task('build', [
    'html',
    'js',
    'stylesheets',
    'fonts',
    'images',
    'libs'
]);

gulp.task('finalbuild', [
    'html',
    'js',
    'stylesheets',
    'fonts',
    'minifyimg',
    'libs',
    'server'
]);

gulp.task('watch', function() {
    watch([appPaths.html], function(event, cb) {
        gulp.start('html');
    });
    watch([appPaths.htmlTmp], function(event, cb) {
        gulp.start('html');
    });
    watch([appPaths.scss], function(event, cb) {
        gulp.start('stylesheets');
    });
    watch([appPaths.jsLibs], function(event, cb) {
        gulp.start('jsLibs');
    });
    watch([appPaths.js], function(event, cb) {
        gulp.start('js');
    });
    watch([appPaths.images], function(event, cb) {
        gulp.start('images');
    });
    watch([appPaths.fonts], function(event, cb) {
        gulp.start('fonts');
    });
    watch([appPaths.libs], function(event, cb) {
        gulp.start('libs');
    });
});


// Run
gulp.task('default', [
    'build',
    'server',
    'watch'
]);