var svgSprite = require('gulp-svg-sprite')
var svg2png = require('gulp-svg2png')
var notify = require('gulp-notify')
var size = require('gulp-size')
var path = require('path')
var flatmap = require('gulp-flatmap')

module.exports = function (gulp, config) {
    gulp.task('icons', gulp.series('icons:png-sprites'))

    gulp.task('icons:sprites', function () {
        if (!config.icons.enabled) {
            return
        }

        var defaultScssTemplate = path.join(path.dirname(__dirname), 'templates/sprite-template.scss.mustache')

        return gulp.src(path.join(config.sources.icons, './*'), {base: config.sources.icons})
            .pipe(flatmap(function (stream, file) {
                var spriteName = path.basename(file)
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
                            sprite: path.normalize(path.join(config.paths.icons, './' + spriteName + '.svg')),
                            bust: config.icons.cacheBust,
                            render: {
                                scss: {
                                    dest: path.normalize(path.join(config.paths.iconsCss, './' + spriteName + config.icons.cssExt)),
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
                }

                return stream
                    .pipe(svgSprite(spriteConfig))
                    .pipe(gulp.dest(config.icons.destination))
            }))
            .pipe(notify({
                title: "Icon Sprites Generated",
                message: "All SVG icon sprites have been generated.",
                onLast: true
            }))
    })

    gulp.task('icons:png-sprites', gulp.series('icons:sprites', function () {
        return gulp.src(path.join(config.paths.icons, './**/*.svg'))
            .pipe(svg2png())
            .pipe(size({
                showFiles: true
            }))
            .pipe(gulp.dest(config.paths.images))
    }))
}
