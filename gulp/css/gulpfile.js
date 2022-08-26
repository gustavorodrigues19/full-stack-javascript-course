const { parallel } = require('gulp')
const gulp = require('gulp')
const sass = require('gulp-sass')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

function transformCSS() {
    return gulp.src('src/sass/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifycss({ "uglyComments": true }))
        .pipe(concat('estilo.min.css'))
        .pipe(gulp.dest('build/css'))
}

function copyHtml() {
    return gulp.src('src/index.html')
                .pipe(gulp.dest('build'))
}

exports.default = parallel(transformCSS, copyHtml)