/**
 * Created by BMcClure on 9/17/2016.
 */
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');

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
    var sassFiles = config.sass.watchFiles || ['src/scss/**/*.scss'];
    var jsFiles = config.scripts.watchFiles || ['js-src/**/*.js'];
    var twigFiles = config.twig.watchFiles || ['templates/**/*.html.twig'];

    gulp.task('watch', function () {
        // watch scss for changes and clear drupal theme cache on change
        watchTask(sassFiles, "sass", { "drush": ["drush:cc"] });

        // watch js for changes and clear drupal theme cache on change
        watchTask(jsFiles, "scripts", { "drush": ["drush:cc"] });

        // If user has specified an override, rebuild Drupal cache
        if (config.twig.enabled && !config.twig.useCache && config.drush.enabled) {
            gulp.watch(twigFiles, ['drush:cr']);
        }
    });
};
