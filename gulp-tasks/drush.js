var shell = require('gulp-shell')
var notify = require('gulp-notify')

function drushCommand(command, gulp, config) {
    if (!config.drush.enabled) {
        return
    }

    if (config.lando.enabled) {
        command = "lando " + command
    }

    return gulp.src('', {read: false})
        .pipe(shell([command]))
        .pipe(notify({
            title: "Drush Command",
            message: "Ran '" + command + "'",
            onLast: true
        }))
}

module.exports = function (gulp, config) {
    gulp.task('drush:cc', function () {
        return drushCommand(config.drush.alias.cc, gulp, config)
    })

    gulp.task('drush:cr', function () {
        return drushCommand(config.drush.alias.cr, gulp, config)
    })
}
