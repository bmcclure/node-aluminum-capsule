/**
 * Created by BMcClure on 9/16/2016.
 */
var fs = require("fs");
var shell = require('gulp-shell');
var notify = require('gulp-notify');

function drushCommand(command) {
    var result = "";

    if (config.kbox.enabled) {
        result += "kbox ";
    }

    return result + "drush " + command;
}

module.exports = function (gulp, config) {
    gulp.task('drush:cc', function () {
        if (!config.drush.enabled) {
            return;
        }

        var command = config.drush.alias.cc || drushCommand("cc css-js");

        return gulp.src('', {read: false})
            .pipe(shell([command]))
            .pipe(notify({
                title: "Drupsl Caches Cleared",
                message: "Drupal CSS/JS caches cleared.",
                onLast: true
            }));
    });

    gulp.task('drush:cr', function () {
        if (!config.drush.enabled) {
            return;
        }

        var command = config.drush.alias.cr || drushCommand("cr");

        return gulp.src('', {read: false})
            .pipe(shell([command]))
            .pipe(notify({
                title: "Drupal Cache Rebuilt",
                message: "Drupal cache rebuilt.",
                onLast: true
            }));
    });
};
