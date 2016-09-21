/**
 * Created by BMcClure on 9/17/2016.
 */
var svgSprite = require('gulp-svg-sprite');
var replace = require('gulp-replace');
var del = require('del');
var notify = require('gulp-notify');

module.exports = function (gulp, config) {
    gulp.task('icons', ['icons:asset-urls']);

    gulp.task('icons:sprites', function () {
        if (!config.icons.enabled) {
            return;
        }

        var iconFiles = config.sources.icons || ['./src/icons/*.svg'];
        var iconDestination = config.icons.destination || "./";

        var spriteConfig = {
            "mode": {},
            "shape": {
                "dimensions": {
                    maxWidth: 640,
                    maxHeight: 640
                }
            }
        };

        spriteConfig.mode[config.icons.mode || "view"] = {
            "dest": iconDestination,
            "sprite": config.paths.icons || "images/icons.svg",
            "prefix": config.icons.prefix || ".icon--%s",
            "mixin": config.icons.mixin || "icon-base",
            "inline": false,
            "bust": false,
            "common": config.icons.commonClass || "icon",
            "render": {
                "scss": {
                    "dest": config.icons.cssFile || "./src/scss/generated/_icons.scss"
                }
            },
            "example": {
                "dest": config.icons.htmlPath || "docs/icons.html"
            }
        };

        return gulp.src(iconFiles)
            .pipe(svgSprite(spriteConfig))
            .pipe(gulp.dest(iconDestination))
            .pipe(notify({
                title: "Icon Sprites Generated",
                message: "All SVG icon sprites have been created.",
                onLast: true
            }));

    });

    gulp.task('icons:asset-urls', ['icons:sprites'], function () {
        var dir = "src/scss/generated";
        var cssFile = config.icons.cssFile || "src/scss/generated/_icons.scss";

        if (!config.icons.enabled || !config.sassImages.enabled) {
            return;
        }

        return gulp.src(cssFile)
            .pipe(replace(/url\(("images\/[^"]+")\)/g, 'asset-url($1)'))
            .pipe(gulp.dest(dir));
    });
};
