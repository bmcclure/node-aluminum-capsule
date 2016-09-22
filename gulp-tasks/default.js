/**
 * Created by BMcClure on 9/17/2016.
 */

/**
 * Define a task to spawn Browser Sync.
 * Options are defaulted, but can be overridden within your config.js file.
 */
module.exports = function (gulp, config) {
    gulp.task('default', ['modernizr', 'watch']);
};
