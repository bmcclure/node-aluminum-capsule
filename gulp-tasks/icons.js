/**
 * Created by BMcClure on 9/17/2016.
 */
var appRootDir = require('app-root-dir').get();
var svgSprite = require('gulp-svg-sprites');
var replace = require('gulp-replace');
var merge = require('gulp-merge');

module.exports = function (gulp, config) {
    gulp.task('icons', function () {
        var iconFiles = config.sources.icons || [appRootDir + '/src/icons/*.svg'];
        var iconDestination = config.icons.destination || appRootDir + "/";
        var cssFile = config.icons.cssFile || "src/scss/generated/_icons.scss";
        var iconSelector = config.icons.selector || "icon-%f";
        var baseSize = config.icons.baseSize || 10;
        var mode = config.icons.mode || "sprite";
        var iconPath = config.paths.icons || "images/icons.svg";

        var icons = gulp.src(iconFiles)
            .pipe(svgSprite({
                "mode": mode,
                "selector": iconSelector,
                "cssFile": cssFile,
                "svgPath": "../images/%f",
                "pngPath": "../images/%f",
                "svg": {
                    "sprite": iconPath
                },
                "preview": {
                    "sprite": "icons.html"
                },
                "baseSize": baseSize
            }))
            .pipe(gulp.dest(iconDestination));

        if (config.sassImages.enabled) {
            var replaced = gulp.src(cssFile)
                .pipe(replace(/url\("..\/images\/([^)]+)"\)/g, 'image-url("$1")'))
                .pipe(gulp.dest(cssFile));

            return merge(icons, replaced);
        } else {
            return icons;
        }

    });
};
