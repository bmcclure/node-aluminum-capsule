/**
 * Created by BMcClure on 9/16/2016.
 */
var fs = require("fs");
var shell = require('gulp-shell');
var notify = require('gulp-notify');

function drushCommand(command, gulp, config) {
    if (!config.drush.enabled) {
        return;
    }

    if (config.kbox.enabled) {
        command = "kbox " + command;
    }

    return gulp.src('', {read: false})
        .pipe(shell([command]))
        .pipe(notify({
            title: "Drush Command",
            message: "Ran '" + command + "'",
            onLast: true
        }));
}

module.exports = function (gulp, config) {
    gulp.task('drush:cc', function () {
        return drushCommand(config.drush.alias.cc, gulp, config);
    });

    gulp.task('drush:cr', function () {
        return drushCommand(config.drush.alias.cr, gulp, config);
    });
};
