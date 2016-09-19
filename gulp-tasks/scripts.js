/**
 * Created by BMcClure on 9/16/2016.
 */
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var appRootDir = require('app-root-dir').get();

/**
 * This task minifies javascript in the js/js-src folder and places them in the js directory.
 */
module.exports = function (gulp, config) {
    var sources = config.sources.js || appRootDir + '/src/js/*.js';
    var mapsDir = config.sources.jsMaps || appRootDir + '/js/maps';
    var destination = config.paths.js || appRootDir + '/js';

    gulp.task('scripts', function () {
        if (!config.scripts.enabled) {
            return;
        }

        return gulp.src(sources)
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write(mapsDir))
            .pipe(gulp.dest(destination))
            .pipe(notify({
                title: "JS Compiled",
                message: "All JS files in the theme have been compiled.",
                onLast: true
            }));
    });
};
