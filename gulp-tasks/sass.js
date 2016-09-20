/**
 * Created by BMcClure on 9/16/2016.
 */
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var util = require('gulp-util');
var notify = require('gulp-notify');
var eyeglass = require('eyeglass');

/**
 * This task generates CSS from all SCSS files and compresses them down.
 */
module.exports = function (gulp, config) {
    var sources = config.sources.scss || './src/scss/**/*.scss';
    var destination = config.paths.css || './css';
    var mapsDir = config.paths.cssMaps || './maps';
    var loadPath = config.sass.loadPath || './css/*';
    var includePaths = config.sass.includePaths || [];
    includePaths.push('./css');

    var sassOptions = {
        includePaths: includePaths,
        noCache: true,
        outputStyle: "compressed",
        lineNumbers: false,
        loadPath: loadPath,
        eyeglass: {

        }
    };

    gulp.task('sass', function () {
        if (!config.sass.enabled) {
            return;
        }

        return gulp.src(sources)
            .pipe(sourcemaps.init())
            .pipe(sass(eyeglass(sassOptions))).on('error', function (error) {
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
