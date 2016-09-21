/**
 * Created by BMcClure on 9/17/2016.
 */
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var appRootDir = require('app-root-dir');

function watchTask(gulp, config, files, task, conditionalTasks) {
    var propName = task.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

    if (config[propName].enabled && config[propName].watch) {
        var tasks = [task];

        conditionalTasks = conditionalTasks || {};

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
    var sassFiles = config.sources.scss || [appRootDir + '/src/scss/**/*.scss'];
    var jsFiles = config.sources.js || [appRootDir + '/src/js/**/*.js'];
    var twigFiles = config.sources.twig || [appRootDir + '/templates/**/*.html.twig'];
    var fontFiles = config.sources.fonts || appRootDir + '/src/fonts/*.{ttf,otf}';
    var iconFiles = config.sources.icons || [appRootDir + '/src/icons/*.svg'];

    gulp.task('watch', function () {
        watchTask(gulp, config, iconFiles, "icons");

        watchTask(gulp, config, fontFiles, "fonts");

        // Watch scss for changes and clear Drupal theme cache on change
        watchTask(gulp, config, sassFiles, "sass", { "drush": ["drush:cc"] });

        // Watch js for changes and clear Drupal theme cache on change
        watchTask(gulp, config, jsFiles, "scripts", { "drush": ["drush:cc"] });

        // If user has specified an override, rebuild Drupal cache
        if (config.twig.enabled && !config.twig.useCache && config.drush.enabled) {
            gulp.watch(twigFiles, ['drush:cr']);
        }
    });
};
