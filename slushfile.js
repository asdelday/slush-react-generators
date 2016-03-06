'use strict';

var _ = require('underscore.string');
var conflict = require('gulp-conflict');
var gulp = require('gulp');
var inquirer = require('inquirer');
var install = require('gulp-install');
var mkdirp = require('mkdirp');
var rename = require('gulp-rename');
var template = require('gulp-template');

// load generators
gulp = require('./generators/component')(_, conflict, gulp, inquirer, install, mkdirp, rename, template);