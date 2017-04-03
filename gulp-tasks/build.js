/**
 * Define a task to spawn Browser Sync.
 * Options are defaulted, but can be overridden within your config.js file.
 */
module.exports = function (gulp, config) {
    gulp.task('build', [
      'assets',
      'fonts',
      'icons',
      'modernizr',
      'sass',
      'scripts'
    ]);
};
