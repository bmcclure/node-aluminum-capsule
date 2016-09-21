/**
 * Created by BMcClure on 9/17/2016.
 */
var modernizr = require('gulp-modernizr');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var fs = require('fs');
var path = require('path');

function generateModernizr(gulp, config) {
    var options = config.modernizr.options || {};

    var sources = config.modernizr.sources || [
            './src/js/**/*.js',
            './src/scss/**/*.scss',
            './js/**/*.js',
            '!./js/modernizr.js'
        ];

    var destination = config.modernizr.dest || './js';

    gulp.src(sources)
        .pipe(modernizr(options))
        .pipe(uglify())
        .pipe(gulp.dest(destination))
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

        var destination = config.modernizr.dest || './js';

        fs.stat(path.join(destination, './modernizr.js'), function(err, stat) {
            if(err == null) {
                // Modernizr already exists, skip automatic generation
            } else {
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
