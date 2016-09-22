/**
 * Created by BMcClure on 9/17/2016.
 */
var svgSprite = require('gulp-svg-sprite');
var svg2png = require('gulp-svg2png');
var replace = require('gulp-replace');
var del = require('del');
var notify = require('gulp-notify');
var size = require('gulp-size');
var gutil = require('gulp-util');
var path = require('path');

module.exports = function (gulp, config) {
    gulp.task('icons', ['icons:png-sprite']);

    gulp.task('icons:sprite', function () {
        if (!config.icons.enabled) {
            return;
        }

        var iconFiles = config.sources.icons || ['./src/icons/*.svg'];
        var iconDestination = config.icons.destination || "./";
        var pngPath = config.paths.iconsPng || "images/icons.png";
        var svgPath = config.paths.icons || "images/icons.svg";

        var spriteConfig = {
            shape: {
                dimension: {
                    maxWidth: 32,
                    maxHeight: 32
                },
                spacing: {
                    padding: 5
                }
            },
            mode: {
                css: {
                    dest: iconDestination,
                    layout: "diagonal",
                    sprite: svgPath,
                    //"prefix": config.icons.prefix || ".icon--%s",
                    //"mixin": config.icons.mixin || "icon-base",
                    bust: false,
                    //"common": config.icons.commonClass || "icon",
                    //"dimensions": true,
                    render: {
                        scss: {
                            dest: config.icons.cssFile || "src/scss/generated/_icons.scss",
                            template: config.icons.scssTemplate || path.join(path.dirname(__dirname), 'templates/sprite-template.scss')
                        }
                    }
                    //"example": {
                    //    "dest": config.icons.htmlPath || "docs/icons.html"
                    //}
                }
            },
            variables: {
                mapname: "icons",
                pngPath: pngPath,
                svgPath: svgPath
            }
        };

        return gulp.src(iconFiles)
            .pipe(svgSprite(spriteConfig))
            .pipe(gulp.dest(iconDestination))
            .pipe(notify({
                title: "Icon Sprite Generated",
                message: "The SVG icon sprite has been generated.",
                onLast: true
            }));

    });

    gulp.task('icons:png-sprite', ['icons:sprite'], function () {
        var iconDestination = config.icons.destination || "./";
        var icons = config.paths.icons || 'images/icons.svg';

        return gulp.src(path.join(iconDestination, icons))
            .pipe(svg2png())
            .pipe(size({
                showFiles: true
            }))
            .pipe(gulp.dest(config.paths.images || './images'))
    });
};
