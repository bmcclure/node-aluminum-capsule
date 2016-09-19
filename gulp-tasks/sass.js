/**
 * Created by BMcClure on 9/16/2016.
 */
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var util = require('gulp-util');
var notify = require('gulp-notify');
var appRootDir = require('app-root-dir').get();

/**
 * This task generates CSS from all SCSS files and compresses them down.
 */
module.exports = function (gulp, config) {
    var sources = config.sources.scss || appRootDir + '/src/scss/**/*.scss';
    var destination = config.paths.css || appRootDir + '/css';
    var mapsDir = config.paths.maps || appRootDir + '/maps';
    var loadPath = config.sass.loadPath || appRootDir + '/css/*';

    gulp.task('sass', function () {
        if (!config.sass.enabled) {
            return;
        }

        return gulp.src(sources)
            .pipe(sourcemaps.init())
            .pipe(sass({
                noCache: true,
                outputStyle: "compressed",
                lineNumbers: false,
                loadPath: loadPath,
                sourceMap: true
            })).on('error', function (error) {
                util.log(error);
                this.emit('end');
            })
            .pipe(sourcemaps.write(mapsDir))
            .pipe(gulp.dest(destination))
            .pipe(notify({
                title: "SASS Compiled",
                message: "All SASS files have been recompiled to CSS.",
                onLast: true
            }));
    });
};
