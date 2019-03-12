var changed = require('gulp-changed')
var count = require('gulp-count')

module.exports = function (gulp, config) {
    function assets_copy(done) {
        for (var dest in config.assets) {
            if (config.assets.hasOwnProperty(dest)) {
                if (config.assets[dest].length > 0) {
                    gulp.src(config.assets[dest])
                        .pipe(changed(dest))
                        .pipe(gulp.dest(dest))
                        .pipe(count({
                            message: "<%= files %> installed to " + dest,
                            logEmpty: "<%= files %> installed to " + dest
                        }))
                }
            }
        }

        done()
    }

    /**
     * This task copies assets from other locations if they're different than what's already in the destination
     */
    gulp.task('assets:copy', assets_copy)

    gulp.task('assets', gulp.series('assets:copy'))
}
