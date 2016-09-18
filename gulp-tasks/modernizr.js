/**
 * Created by BMcClure on 9/17/2016.
 */
var modernizr = require('gulp-modernizr');
var appRootDir = require('app-root-dir').get();

module.exports = function (gulp, config) {
    gulp.task('modernizr', function () {
        if (!config.modernizr.enabled) {
            return;
        }

        var options = config.modernizr.options || {};

        var sources = config.modernizr.sources || [
                appRootDir + '/src/js/**/*.js',
                appRootDir + '/src/scss/**/*.scss',
                appRootDir + '/js/**/*.js',
                '!' + appRootDir + '/js/modernizr.js'
            ];

        var destination = config.modernizr.dest || appRootDir + '/js';

        gulp.src(sources)
            .pipe(modernizr(options))
            .pipe(gulp.dest(destination));
    });
};
