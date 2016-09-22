/**
 * Created by BMcClure on 9/17/2016.
 */
var svgSprite = require('gulp-svg-sprite');
var svg2png = require('gulp-svg2png');
var replace = require('gulp-replace');
var del = require('del');
var notify = require('gulp-notify');
var size = require('gulp-size');
var path = require('path');

module.exports = function (gulp, config) {
    gulp.task('icons', ['icons:png-sprite']);

    gulp.task('icons:sprite', function () {
        if (!config.icons.enabled) {
            return;
        }

        var defaultScssTemplate = path.join(path.dirname(__dirname), 'templates/sprite-template.scss.mustache');

        var spriteConfig = {
            shape: {
                dimension: {
                    maxWidth: config.icons.maxWidth,
                    maxHeight: config.icons.maxHeight
                },
                spacing: {
                    padding: config.icons.padding
                }
            },
            mode: {
                css: {
                    dest: config.icons.destination,
                    layout: config.icons.layout,
                    sprite: config.paths.icons + '.svg',
                    bust: config.icons.cacheBust,
                    render: {
                        scss: {
                            dest: path.join(config.paths.generatedScss, config.icons.cssFile),
                            template: config.icons.scssTemplate || defaultScssTemplate
                        }
                    }
                    /* Removed until I get further along
                    ,
                     "common": config.icons.commonClass || "icon",
                     "dimensions": true,
                     "prefix": config.icons.prefix || ".icon--%s",
                     "mixin": config.icons.mixin || "icon-base",
                     "example": {
                         "dest": config.icons.htmlPath || "docs/icons.html"
                      }
                    */
                }
            },
            variables: {
                mapname: "icons",
                pngPath: config.paths.icons + '.png',
                svgPath: config.paths.icons + '.svg'
            }
        };

        return gulp.src(config.sources.icons)
            .pipe(svgSprite(spriteConfig))
            .pipe(gulp.dest(config.icons.destination))
            .pipe(notify({
                title: "Icon Sprite Generated",
                message: "The SVG icon sprite has been generated.",
                onLast: true
            }));

    });

    gulp.task('icons:png-sprite', ['icons:sprite'], function () {
        return gulp.src(path.join(config.icons.destination, config.paths.icons + '.svg'))
            .pipe(svg2png())
            .pipe(size({
                showFiles: true
            }))
            .pipe(gulp.dest(config.paths.images))
    });
};
