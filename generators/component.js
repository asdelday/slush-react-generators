'use strict';

var _ = require('underscore.string');
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

    answers.slugifiedName = _.slugify(answers.name);
    answers.humanizedName = _.humanize(answers.name);
    answers.capitalizedAuthor = _.capitalize(answers.author);

    gulp.src(__dirname + '/../templates/component/**/*')
      .pipe(template(answers, {interpolate: /<\?\?(.+?)\?>/g}))
      .pipe(rename(function (file) {
        console.log(file);
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1);
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('end', function() { done(); });
  });
};
