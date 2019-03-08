var browserSync = require('browser-sync').create

/**
 * Define a task to spawn Browser Sync.
 * Options are defaulted, but can be overridden within your config.js file.
 */
module.exports = function (gulp, config) {
    gulp.task('browser-sync', function (done) {
        if (!config.browserSync.enabled) {
            return
        }

        browserSync.init({
            port: config.browserSync.port,
            proxy: config.browserSync.hostname,
            open: config.browserSync.openAutomatically,
            reloadDelay: config.browserSync.reloadDelay,
            injectChanges: config.browserSync.injectChanges
        })

        done()
    })
}
