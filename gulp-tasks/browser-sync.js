/**
 * Created by BMcClure on 9/17/2016.
 */
var browserSync = require('browser-sync').create;

/**
 * Define a task to spawn Browser Sync.
 * Options are defaulted, but can be overridden within your config.js file.
 */
module.exports = function (gulp, config) {
  return function () {
    browserSync.init({
      port: config.browserSync.port,
      proxy: config.browserSync.hostname,
      open: config.browserSync.openAutomatically,
      reloadDelay: config.browserSync.reloadDelay,
      injectChanges: config.browserSync.injectChanges
    });
  }
};
