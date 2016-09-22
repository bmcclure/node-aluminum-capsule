/**
 * Created by BMcClure on 9/17/2016.
 */
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');

function watchTask(gulp, config, files, task, conditionalTasks) {
    var propName = task.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    conditionalTasks = conditionalTasks || {};

    if (config[propName].enabled && config[propName].watch) {
        var tasks = [task];

        for (var conditional in conditionalTasks) {
            if (conditionalTasks.hasOwnProperty(conditional)) {
                if (config[conditional].enabled) {
                    tasks.push(conditionalTasks[conditional]);
                }
            }
        }

        gulp.watch(files, tasks);
    }
}

/**
 * Defines the watcher task.
*/
module.exports = function (gulp, config) {
    gulp.task('watch', function () {
        watchTask(gulp, config, config.sources.icons, "icons");
        watchTask(gulp, config, config.sources.fonts, "fonts");
        watchTask(gulp, config, config.sources.scss, "sass", { "drush": ["drush:cc"] });
        watchTask(gulp, config, config.sources.js, "scripts", { "drush": ["drush:cc"] });

        // If user has specified an override, rebuild Drupal cache
        if (config.twig.enabled && !config.twig.useCache && config.drush.enabled) {
            gulp.watch(config.sources.twig, ['drush:cr']);
        }
    });
};
