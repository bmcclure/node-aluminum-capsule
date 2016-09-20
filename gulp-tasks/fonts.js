/**
 * Created by BMcClure on 9/19/2016.
 */
var fontgen = require('gulp-fontgen');

module.exports = function (gulp, config) {
    gulp.task('fonts', function () {
        if (!config.fonts.enabled) {
            return;
        }

        var fontsSrc = config.sources.fonts || './src/fonts/*.{ttf,otf}';
        var fontsDir = config.sources.fontsDir || './fonts/';
        var cssPath = config.fonts.cssPath || './src/scss/generated/_fonts.scss';
        var cssFontPath = config.fonts.cssFontPath || '../fonts/';

        return gulp.src(fontsSrc)
            .pipe(fontgen({
                dest: fontsDir,
                css: cssPath,
                css_fontpath: cssFontPath
            }));
    });
};
