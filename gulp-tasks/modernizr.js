var modernizr = require('gulp-modernizr')
var notify = require('gulp-notify')
var uglify = require('gulp-uglify')
var fs = require('fs')
var path = require('path')

function generateModernizr(gulp, config) {
    return gulp.src(config.modernizr.sources)
        .pipe(modernizr(config.modernizr.options))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.js))
        .pipe(notify({
            title: "Modernizr Generated",
            message: "A custom Modernizr file has been generated.",
            onLast: true
        }))
}

module.exports = function (gulp, config) {
    gulp.task('modernizer:generate', function (done) {
        if (!config.modernizr.enabled) {
            done()
            return
        }

        return generateModernizr(gulp, config)
    })

    gulp.task('modernizr', function (done) {
        if (!config.modernizr.enabled) {
            done()
            return
        }

        return fs.stat(path.join(config.paths.js, './modernizr.js'), function(err, stat) {
            if(err) {
                generateModernizr(gulp, config)
            }
        })
    })
}
