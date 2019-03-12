var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var notify = require('gulp-notify')

/**
 * This task minifies javascript in the js/js-src folder and places them in the js directory.
 */
module.exports = function (gulp, config) {
    function scripts(done) {
        if (!config.scripts.enabled) {
            done()
            return
        }

        return gulp.src(config.sources.js)
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write(config.paths.maps))
            .pipe(gulp.dest(config.paths.js))
            .pipe(notify({
                title: "JS Compiled",
                message: "All JS files in the theme have been compiled.",
                onLast: true
            }))
    }

    gulp.task('scripts', scripts)
}
