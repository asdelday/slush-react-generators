'use strict';

var gulp = require('gulp');

// load generators
gulp.task('default', ['component']);
gulp.task('component', require('./generators/component'));
gulp.task('app', require('./generators/app'));
