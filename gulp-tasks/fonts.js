/**
 * Created by BMcClure on 9/19/2016.
 */
var fontgen = require('gulp-fontgen');
var path = require('path');

module.exports = function (gulp, config) {
    gulp.task('fonts', function () {
        if (!config.fonts.enabled) {
            return;
        }

        return gulp.src(config.sources.fonts)
            .pipe(fontgen({
                dest: config.paths.fonts,
                css: path.join(config.paths.generatedScss, config.fonts.cssFile),
                css_fontpath: config.paths.fonts
            }));
    });
};
