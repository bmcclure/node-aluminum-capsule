/**
 * Created by BMcClure on 9/17/2016.
 */
var browserSync = require('browser-sync').create;
var notify = require('gulp-notify');

/**
 * Define a task to spawn Browser Sync.
 * Options are defaulted, but can be overridden within your config.js file.
 */
module.exports = function (gulp, config) {
    gulp.task('browser-sync', function () {
        if (!config.browserSync.enabled) {
            return;
        }

        browserSync.init({
            port: config.browserSync.port || 80,
            proxy: config.browserSync.hostname || "localhost",
            open: config.browserSync.openAutomatically || false,
            reloadDelay: config.browserSync.reloadDelay || 50,
            injectChanges: config.browserSync.injectChanges || true
        });
    });
};
