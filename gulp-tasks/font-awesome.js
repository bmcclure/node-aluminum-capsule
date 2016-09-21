/**
 * Created by BMcClure on 9/19/2016.
 */
var rename = require('gulp-rename');

module.exports = function (gulp, config) {
    gulp.task('font-awesome:fonts', function () {
        if (!config.fontAwesome.enabled) {
            return;
        }

        var src = __dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.*';
        var fontsDir = config.fontAwesome.fontsDir || 'fonts';

        return gulp.src(src)
            .pipe(gulp.dest(fontsDir));
    });

    gulp.task('font-awesome:sass', ['font-awesome:fonts'], function () {
        if (!config.fontAwesome.enabled) {
            return;
        }

        var src = config.fontAwesome.src || __dirname + '/node_modules/font-awesome/css/font-awesome.css';
        var cssDir = config.fontAwesome.cssDir || 'src/scss/generated/';

        // TODO: Use actual font-awesome SASS and support variable overrides

        return gulp.src(src)
            .pipe(rename("_font-awesome.scss"))
            .pipe(gulp.dest(cssDir));
    });

    gulp.task('font-awesome', ['font-awesome:sass']);
};
