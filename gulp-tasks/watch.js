/**
 * Created by BMcClure on 9/17/2016.
 */
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');

/**
 * Defines the watcher task.
 */
module.exports = function (gulp, config) {
  var sassDirs = config.watch.sass.dirs || ['src/scss/**/*.scss'];
  var jsDirs = config.watch.js.dirs || ['js-src/**/*.js'];

  return function () {
    // watch scss for changes and clear drupal theme cache on change
    if (config.watch.sass.enabled) {
      gulp.watch(sassDirs, ['sass', 'drush:cc']);
    }

    // watch js for changes and clear drupal theme cache on change
    if (config.watch.js.enabled) {
      gulp.watch(jsDirs, ['compress', 'drush:cc']);
    }

    // If user has specified an override, rebuild Drupal cache
    if (!config.twig.useCache) {
      gulp.watch(['templates/**/*.html.twig'], ['drush:cr']);
    }
  }
};
