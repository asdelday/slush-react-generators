'use strict';

var _ = require('lodash');
var conflict = require('gulp-conflict');
var gulp = require('gulp');
var inquirer = require('inquirer');
var install = require('gulp-install');
var mkdirp = require('mkdirp');
var rename = require('gulp-rename');
var template = require('gulp-template');

module.exports = function(done) {
  var prompts = [
    {
      name: 'name',
      message: 'What would you like to call it? (example: ReactComponent)',
    },
    {
      name: 'description',
      message: 'How would you describe it?',
    },
    {
      name: 'keywords',
      message: 'How would you describe it in comma seperated key words?',
    },
    {
      name: 'author',
      message: 'What is your company/author name?',
    },
    {
      name: 'email',
      message: 'What is your company/author email?',
    }
  ];

  //Ask
  inquirer.prompt(prompts, function (answers) {
    if (!answers.name) { return done(); }

    answers.slugifiedName = _.kebabCase(answers.name);
    answers.capitalizedAuthor = _.capitalize(answers.author);

    gulp.src(__dirname + '/../templates/component/**/*')
      .pipe(template(answers, {interpolate: /<\?\?(.+?)\?>/g}))
      .pipe(rename(function (file) {
        console.log(file);
        if (file.basename.indexOf('_') == 0) {
          file.basename = file.basename.replace('_', '.');
        }
        if (file.basename.indexOf('slushName') == 0) {
          file.basename = file.basename.replace('slushName', answers.name);
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('end', function() { done(); });
  });
};
