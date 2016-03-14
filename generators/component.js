'use strict';

var _ = require('lodash');
var conflict = require('gulp-conflict');
var gulp = require('gulp');
var inquirer = require('inquirer');
var install = require('gulp-install');
var rename = require('gulp-rename');
var template = require('gulp-template');

module.exports = function(done) {
  var prompts = [
    {
      type: 'input',
      name: 'name',
      message: 'What would you like to call it? (example: ReactComponent)',
    },
    {
      type: 'input',
      name: 'description',
      message: 'How would you describe it?',
    },
    {
      type: 'input',
      name: 'author',
      message: 'What is your company/author name?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your company/author email?',
    },
    {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?',
    }
  ];

  //Ask
  inquirer.prompt(prompts, function (answers) {
    if (!answers.moveon) { return done(); }

    answers.slugifiedName = _.kebabCase(answers.name);
    answers.capitalizedAuthor = _.capitalize(answers.author);

    gulp.src(__dirname + '/../templates/component/**/*')
      .pipe(template(answers, {interpolate: /<\?\?(.+?)\?>/g}))
      .pipe(rename(function (file) {
        console.log(file);
        if (file.basename.indexOf('_') === 0) {
          file.basename = file.basename.replace('_', '.');
        }

        file.dirname = file.dirname.replace('slush_name', answers.name);
        file.basename = file.basename.replace('slush_name', answers.name);
        file.extname = file.extname.replace('slush_name', answers.name);

        file.dirname = file.dirname.replace('slush_slugifiedName', answers.slugifiedName);
        file.basename = file.basename.replace('slush_slugifiedName', answers.slugifiedName);
        file.extname = file.extname.replace('slush_slugifiedName', answers.slugifiedName);
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('end', function() { done(); });
  });
};
