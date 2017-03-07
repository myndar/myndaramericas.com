'use strict';
const gulp = require('gulp');
const inject = require('gulp-inject');

// 'gulp inject:head' -- injects our style.css file into the head of our HTML
gulp.task('inject:head', () =>
  gulp.src('.tmp/src/_includes/head.html')
    .pipe(inject(gulp.src('.tmp/assets/stylesheets/*.css'), {ignorePath: '.tmp'}))
    .pipe(gulp.dest('.tmp/src/_includes'))
    .pipe(gulp.dest('src/_includes')) //  for cloud cannon
);

// 'gulp inject:footer' -- injects our index.js file into the end of our HTML
gulp.task('inject:footer', () =>
  gulp.src('.tmp/src/_layouts/default.html')
    .pipe(inject(gulp.src('.tmp/assets/javascript/*.js'), {ignorePath: '.tmp'}))
    .pipe(gulp.dest('.tmp/src/_layouts'))
    .pipe(gulp.dest('src/_layouts')) // for cloud cannon
);
