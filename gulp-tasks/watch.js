/**
 * Created by BMcClure on 9/17/2016.
 */
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var appRootDir = require('app-root-dir');

function watchTask(files, task, conditionalTasks) {
    if (config[task].enabled && config[task].watch) {
        var tasks = [task];

        conditionalTasks.forEach(function (cndTasks, conditional) {
            if (config[conditional].enabled) {
                tasks.push(cndTasks);
            }
        });

        gulp.watch(files, tasks);
    }
}

/**
 * Defines the watcher task.
*/
module.exports = function (gulp, config) {
    var imageFiles = config.sources.images || [appRootDir + '/images/**/*.+(jpeg|jpg|png|gif|svg)'];
    var sassFiles = config.sources.scss || [appRootDir + '/src/scss/**/*.scss'];
    var jsFiles = config.sources.js || [appRootDir + '/src/js/**/*.js'];
    var twigFiles = config.sources.twig || [appRootDir + '/templates/**/*.html.twig'];

    var deps = [];

    if (config.sassImages.enabled) {
        deps.push('sass-images');
    }

    gulp.task('watch', deps, function () {
        // Watch for image changes and regenerate image helper
        watchTask(imageFiles, "sass-images");

        // Watch scss for changes and clear Drupal theme cache on change
        watchTask(sassFiles, "sass", { "drush": ["drush:cc"] });

        // Watch js for changes and clear Drupal theme cache on change
        watchTask(jsFiles, "scripts", { "drush": ["drush:cc"] });

        // If user has specified an override, rebuild Drupal cache
        if (config.twig.enabled && !config.twig.useCache && config.drush.enabled) {
            gulp.watch(twigFiles, ['drush:cr']);
        }
    });
};
