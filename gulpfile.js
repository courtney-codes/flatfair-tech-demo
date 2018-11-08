"use strict";

const del          = require('del');
var   autoprefixer = require('gulp-autoprefixer');
var   browser      = require('browser-sync').create();
var   concat       = require('gulp-concat');
var   cssnano      = require('gulp-cssnano');
var   gulp         = require('gulp');
var   rename       = require('gulp-rename');
var   sass         = require('gulp-sass');
var   sourcemaps   = require('gulp-sourcemaps');
var   uglify       = require('gulp-uglify');

const paths = {
    styles: {
        src : './src/scss/**/*.scss',
        dist: './dist/css/'
    },
    scripts: {
        src: './src/js/**/*.js',
        dist: './dist/js/'
    },
    html: './**/*.html'
}

gulp.task('clean', function(done) {
    del('dist');
    done();
});

gulp.task('styles', function(done) {
    gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({ suffix:'.min' }))
        .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest(paths.styles.dist))
    .pipe(browser.reload({ stream: true }));

    done();
});

gulp.task('scripts', function(done) {
    gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(rename({ suffix: '.min'}))
        // .pipe(uglify())
        .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(browser.reload({stream: true}));

    done();
});

gulp.task('serve', function(){
    browser.init({
        server: '.',
        watch: true,
        notify: false
    });
    
    gulp.watch(paths.styles.src, gulp.series('styles'));
    gulp.watch(paths.html).on('change', browser.reload);
});

gulp.task('default', gulp.series('clean', gulp.parallel('styles', 'scripts'), 'serve'), function() {

});