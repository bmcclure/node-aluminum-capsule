var path = require('path')
var rename = require('gulp-rename')
var del = require('del')
var notifier = require('node-notifier')
var replace = require('gulp-replace')
var vinylPaths = require('vinyl-paths')

module.exports = function (gulp, config) {
    gulp.task('fonts:generate', function (done) {
        if (!config.fonts.enabled) {
            done()
            return
        }

        // Load fontgen here since it has strict system requirements that shouldn't be needed if the task is disabled.
        var fontgen = require('gulp-fontgen')

        return gulp.src(config.sources.fonts)
            .pipe(fontgen({
                dest: config.paths.fonts,
                css_fontpath: config.paths.fonts
            }))
    })

    gulp.task('fonts:sass', gulp.series('fonts:generate', function (done) {
        if (!config.fonts.enabled) {
            done()
            return
        }

        return gulp.src(path.join(config.paths.fonts, '*.css'))
            .pipe(vinylPaths(del))
            .pipe(replace(/(\s+)url\(([^)]+)\)/g, '$1asset-url($2)'))
            .pipe(rename({
                prefix: "_",
                extname: ".scss"
            }))
            .pipe(gulp.dest(config.paths.fontsCss))
    }))

    gulp.task('fonts', gulp.series('fonts:sass', function (done) {
        if (!config.fonts.enabled) {
            done()
            return
        }

        notifier.notify({
            title: "Web Fonts Generated",
            message: "All web fonts have been regenerated."
        })

        done()
    }))
}
