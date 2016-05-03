'use strict';

const babel  = require('gulp-babel') // also need babel-preset-es2015
    , concat = require('gulp-concat')
    , gulp   = require('gulp')
    , gutil  = require('gulp-util')
    , uglify = require('gulp-uglify');

gulp.task('default', ['build', 'watch']);

gulp.task('watch', function() {
  gulp.watch('src/*', ['build']);
});

gulp.task('build', function() {
  gulp.src('src/*.js')
    .pipe(concat('bundle.js'))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify())
    .pipe(gulp.dest(''))
    .on('error', gutil.log);
});
