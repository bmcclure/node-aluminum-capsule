var shell = require('gulp-shell')
var notify = require('gulp-notify')

function drushCommand(command, gulp, config, done) {
    if (!config.drush.enabled) {
        done()
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
    function drush_cc(done) {
        return drushCommand(config.drush.alias.cc, gulp, config, done)
    }

    function drush_cr(done) {
        return drushCommand(config.drush.alias.cr, gulp, config, done)
    }

    function drush_cex(done) {
        return drushCommand(config.drush.alias.cex, gulp, config, done)
    }

    function drush_cim(done) {
        return drushCommand(config.drush.alias.cim, gulp, config, done)
    }

    gulp.task('drush:cc', drush_cc)
    gulp.task('drush:cr', drush_cr)
    gulp.task('drush:cex', drush_cex)
    gulp.task('drush:cim', drush_cim)
}
