'use strict';

var gulp = require('gulp');

// load generators
gulp.task('default', ['component']);
gulp.task('generate', require('./generators/component'));
