/**
 * Created by BMcClure on 9/17/2016.
 */
var appRootDir = require('app-root-dir').get();
var svgSprite = require('gulp-svg-sprites');

module.exports = function (gulp, config) {
    gulp.task('icons', function () {
        var iconFiles = config.icons.iconFiles || [appRootDir + '/src/icons/*.svg'];
        var iconDestination = config.icons.destination || appRootDir + "/images";
        var cssFile = config.icons.cssFile || appRootDir + "/src/scss/components/_icons.scss";
        var iconSelector = config.icons.selector || "icon-%f";
        var baseSize = config.icons.baseSize || 10;
        var mode = config.icons.mode || "sprite";

        return gulp.src(iconFiles)
            .pipe(svgSprite({
                "mode": mode,
                "selector": iconSelector,
                "cssFile": cssFile,
                "svgPath": "../images/%f",
                "pngPath": "../images/%f",
                "svg": {
                    mode: "icons.svg"
                },
                "preview": {
                    mode: "icons.html"
                },
                "baseSize": baseSize
            }))
            .pipe(gulp.dest(iconDestination));
    });
};
