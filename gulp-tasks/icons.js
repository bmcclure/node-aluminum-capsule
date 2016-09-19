/**
 * Created by BMcClure on 9/17/2016.
 */
var appRootDir = require('app-root-dir').get();
var svgSprite = require('gulp-svg-sprites');
var replace = require('gulp-replace');
var del = require('del');

module.exports = function (gulp, config) {
    gulp.task('icons', function () {
        if (!config.icons.enabled) {
            return;
        }

        var iconFiles = config.sources.icons || [appRootDir + '/src/icons/*.svg'];
        var iconDestination = config.icons.destination || appRootDir + "/";
        var cssFile = config.icons.cssFile || "src/scss/generated/_icons.scss";
        var iconSelector = config.icons.selector || "icon-%f";
        var baseSize = config.icons.baseSize || 10;
        var mode = config.icons.mode || "sprite";
        var iconPath = config.paths.icons || "images/icons.svg";

        return gulp.src(iconFiles)
            .pipe(svgSprite({
                "mode": mode,
                "selector": iconSelector,
                "cssFile": cssFile,
                "svgPath": "../%f",
                "templates": { "scss": true },
                "svg": {
                    "sprite": iconPath
                },
                "preview": {
                    "sprite": "icons.html"
                },
                "baseSize": baseSize
            }))
            .pipe(gulp.dest(iconDestination));

    });

    gulp.task('icons:del-css', ['icons'], function () {
        var delFile = config.icons.delFile || "src/scss/generated/_icons.css";

        return del(delFile);
    });

    gulp.task('icons:sass-images', ['icons:del-css'], function () {
        var dir = "src/scss/generated";
        var cssFile = config.icons.cssFile || "src/scss/generated/_icons.scss";

        if (!config.icons.enabled || !config.sassImages.enabled) {
            return;
        }

        return gulp.src(cssFile)
            .pipe(replace(/url\("..\/images\/([^)]+)"\)/g, 'image-url("$1")'))
            .pipe(gulp.dest(dir));
    });
};
