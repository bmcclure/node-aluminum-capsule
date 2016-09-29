/**
 * Created by BMcClure on 9/19/2016.
 */
var path = require('path');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var notifier = require('node-notifier');
var replace = require('gulp-replace');

module.exports = function (gulp, config) {
    gulp.task('fonts', ['fonts:sass'], function () {
        if (!config.fonts.enabled) {
            return;
        }

        notifier.notify({
            title: "Web Fonts Generated",
            message: "All web fonts have been regenerated."
        });
    });

    gulp.task('fonts:generate', function () {
        if (!config.fonts.enabled) {
            return;
        }

        // Load fontgen here since it has strict system requirements that shouldn't be needed if the task is disabled.
        var fontgen = require('gulp-fontgen');

        return gulp.src(config.sources.fonts)
            .pipe(fontgen({
                dest: config.paths.fonts,
                css_fontpath: config.paths.fonts
            }));
    });

    gulp.task('fonts:sass', ['fonts:generate'], function () {
        if (!config.fonts.enabled) {
            return;
        }

        return gulp.src(path.join(config.paths.fonts, '*.css'))
            .pipe(clean())
            .pipe(replace(/(\s+)url\(([^)]+)\)/g, '$1asset-url($2)'))
            .pipe(rename({
                prefix: "_",
                extname: ".scss"
            }))
            .pipe(gulp.dest(config.paths.fontsCss));
    });
};
