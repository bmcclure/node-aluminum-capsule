/**
 * Created by BMcClure on 9/17/2016.
 */
var modernizr = require('gulp-modernizr');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var fs = require('fs');
var path = require('path');

function generateModernizr(gulp, config) {
    gulp.src(config.modernizr.sources)
        .pipe(modernizr(config.modernizr.options))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.js))
        .pipe(notify({
            title: "Modernizr Generated",
            message: "A custom Modernizr file has been generated.",
            onLast: true
        }));
}

module.exports = function (gulp, config) {
    gulp.task('modernizr', function () {
        if (!config.modernizr.enabled) {
            return;
        }

        fs.stat(path.join(config.paths.js, './modernizr.js'), function(err, stat) {
            if(err) {
                generateModernizr(gulp, config);
            }
        });
    });

    gulp.task('modernize:generate', function () {
        if (!config.modernizr.enabled) {
            return;
        }

        generateModernizr(gulp, config)
    });
};
