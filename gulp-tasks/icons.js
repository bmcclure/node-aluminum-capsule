/**
 * Created by BMcClure on 9/17/2016.
 */
var appRootDir = require('app-root-dir').get();
var svgSprite = require('gulp-svg-sprites');

module.exports = function (gulp, config) {
    gulp.task('icons', function () {
        var iconFiles = config.icons.iconFiles || [appRootDir + '/src/icons/*.svg'];
        var iconDestination = config.icons.destination || "images";
        var cssFile = config.icons.cssFile || "src/scss/_icons.scss";
        var iconSelector = config.icons.selector || "icon-%f";
        var baseSize = config.icons.baseSize || 10;

        return gulp.src(iconFiles)
            .pipe(svgSprite({
                "mode": "symbols",
                "selector": iconSelector,
                "svgId": "svg-%f",
                "cssFile": cssFile,
                "svgPath": "../images/%f",
                "pngPath": "../images/%f",
                "svg": {
                    "symbols": "icons.svg"
                },
                "preview": {
                    "symbols": "icons.html"
                },
                "baseSize": baseSize
            }))
            .pipe(gulp.dest(iconDestination));
    });
};
