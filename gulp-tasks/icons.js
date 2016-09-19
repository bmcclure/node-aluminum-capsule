/**
 * Created by BMcClure on 9/17/2016.
 */
var appRootDir = require('app-root-dir').get();
var svgSprite = require('gulp-svg-sprites');
var replace = require('gulp-replace');
var del = require('del');

module.exports = function (gulp, config) {
    gulp.task('icons', ['icons:sass-images']);

    gulp.task('icons:sprites', function () {
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
        var htmlPath = config.icons.htmlPath || "docs/icons.html";

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
                    "sprite": htmlPath
                },
                "baseSize": baseSize
            }))
            .pipe(gulp.dest(iconDestination))
            .pipe(notify({
                title: "Icon Sprites Generated",
                message: "All SVG icon sprites have been created.",
                onLast: true
            }));

    });

    gulp.task('icons:del-css', ['icons:sprite'], function () {
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
