module.exports = function(_, conflict, gulp, inquirer, install, mkdirp, rename, template){
    gulp.task('default', function (done) {
        var prompts = [{
            name: 'stack',
            type: 'list',
            message: 'What would you like to generate?',
            choices: [
                'React Component (example: ReactComponent)',
                'React + Redux App (example: ReactApp)',
            ]
        }, {
            name: 'name',
            message: 'What would you like to call it?',
        }, {
            name: 'description',
            message: 'How would you describe it?',
        }, {
            name: 'keywords',
            message: 'How would you describe it in comma seperated key words?',
        }, {
            name: 'author',
            message: 'What is your company/author name?',
        }];
        //Ask
        inquirer.prompt(prompts, function (answers) {
            if (!answers.name) { return done(); }

            answers.slugifiedName = _.slugify(answers.name);
            answers.humanizedName = _.humanize(answers.name);
            answers.capitalizedAuthor = _.capitalize(answers.author);

            var path;
            switch (answers.stack) {
                case 'React Component':
                    path = __dirname + '/../templates/component/**/*';
                    break;
                case 'React + Redux App':
                    // TODO
                    return done();
                    path = __dirname + '/../templates/app/**/*';
                    break;
                default:
                    path = __dirname + '/../templates/component/**/*';
                    break;
            }
            gulp.src(path)
                .pipe(template(answers, {interpolate: /<\?\?(.+?)\?>/g}))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function() {
                    done();
                });
        });
    });
    return gulp;
}