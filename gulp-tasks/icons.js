/**
 * Created by BMcClure on 9/17/2016.
 */
var svgSprite = require('gulp-svg-sprite');
var replace = require('gulp-replace');
var del = require('del');
var notify = require('gulp-notify');

module.exports = function (gulp, config) {
    gulp.task('icons', ['icons:sass-images']);

    gulp.task('icons:sprites', function () {
        if (!config.icons.enabled) {
            return;
        }

        var iconFiles = config.sources.icons || ['./src/icons/*.svg'];
        var iconDestination = config.icons.destination || "./";

        var spriteConfig = {
            "mode": {}
        };

        spriteConfig.mode[config.icons.mode || "symbol"] = {
            "dest": iconDestination,
            "sprite": config.paths.icons || "images/icons.svg",
            "prefix": config.icons.prefix || "icon--%s",
            "inline": true,
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
