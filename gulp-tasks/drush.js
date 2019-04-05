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
    function drush_cc() {
        return drushCommand(config.drush.alias.cc, gulp, config)
    }

    function drush_cr() {
        return drushCommand(config.drush.alias.cr, gulp, config)
    }

    function drush_cex() {
        return drushCommand(config.drush.alias.cex, gulp, config)
    }

    function drush_cim() {
        return drushCommand(config.drush.alias.cim, gulp, config)
    }

    gulp.task('drush:cc', drush_cc)
    gulp.task('drush:cr', drush_cr)
    gulp.task('drush:cex', drush_cex)
    gulp.task('drush:cim', drush_cim)
}
