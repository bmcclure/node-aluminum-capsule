/**
 * Created by BMcClure on 9/16/2016.
 */
var fs = require("fs");
var shell = require('gulp-shell');
var notify = require('gulp-notify');

module.exports = {
  /**
   * Defines a task that triggers a Drush cache clear (css-js).
   */
  "cc": function (gulp, config) {
    return function () {
      if (!config.drush.enabled) {
        return;
      }

      var command = config.drush.alias.css_js || config.kbox
        ? "kbox drush cc css-js"
        : "drush cc css-js";

      return gulp.src('', {read: false})
        .pipe(shell([command]))
        .pipe(notify({
          title: "Drupsl Caches Cleared",
          message: "Drupal CSS/JS caches cleared.",
          onLast: true
        }));
    }
  },

  /**
   * Defines a task that triggers a Drush cache rebuild.
   */
  "cr": function (gulp, config) {
    return function () {
      if (!config.drush.enabled) {
        return;
      }

      return gulp.src('', {read: false})
        .pipe(shell([
          config.drush.alias.cr
        ]))
        .pipe(notify({
          title: "Drupal Cache Rebuilt",
          message: "Drupal cache rebuilt.",
          onLast: true
        }));
    }
  }
};
