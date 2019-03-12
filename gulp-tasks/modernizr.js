var modernizrPlugin = require('gulp-modernizr')
var notify = require('gulp-notify')
var uglify = require('gulp-uglify')
var fs = require('fs')
var path = require('path')

function generateModernizr(gulp, config) {
    return gulp.src(config.modernizr.sources)
        .pipe(modernizrPlugin(config.modernizr.options))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.js))
        .pipe(notify({
            title: "Modernizr Generated",
            message: "A custom Modernizr file has been generated.",
            onLast: true
        }))
}

module.exports = function (gulp, config) {
    function modernizr_generate(done) {
        if (!config.modernizr.enabled) {
            done()
            return
        }

        return generateModernizr(gulp, config)
    }

    function modernizr(done) {
        if (!config.modernizr.enabled) {
            done()
            return
        }

        return fs.stat(path.join(config.paths.js, './modernizr.js'), function(err, stat) {
            if(err) {
                generateModernizr(gulp, config)
            }
        })
    }

    gulp.task('modernizr:generate', modernizr_generate)

    gulp.task('modernizr', modernizr)
}
