/**
 * Created by BMcClure on 9/19/2016.
 */
var rename = require('gulp-rename');
var path = require('path');
var resolvePkg = require('resolve-pkg');

function fontAwesomePath(subpath) {
    var modulePath = resolvePkg('font-awesome');
    return path.join(path.dirname(modulePath), subpath);
}

module.exports = function (gulp, config) {
    gulp.task('font-awesome:fonts', function () {
        if (!config.fontAwesome.enabled) {
            return;
        }

        return gulp.src(fontAwesomePath('fonts/fontawesome-webfont.*'))
            .pipe(gulp.dest(config.paths.fonts));
    });

    gulp.task('font-awesome:sass', ['font-awesome:fonts'], function () {
        if (!config.fontAwesome.enabled) {
            return;
        }

        // TODO: Use actual font-awesome SASS and support variable overrides

        return gulp.src(fontAwesomePath('css/font-awesome.css'))
            .pipe(rename(config.fontAwesome.cssFile))
            .pipe(gulp.dest(config.paths.generatedScss));
    });

    gulp.task('font-awesome', ['font-awesome:sass']);
};
