var sourcemaps = require('gulp-sourcemaps')
var sassPlugin = require('gulp-sass')
var log = require('fancy-log')
var notify = require('gulp-notify')
var eyeglass = require('eyeglass')
var path = require('path')
var sassGlob = require('gulp-sass-glob')
var postcss = require('gulp-postcss')

function sassOptions(config) {
    var rootDir = path.resolve('.')

    return {
        includePaths: config.sass.includePaths,
        eyeglass: {
            root: rootDir,
            assets: {
                httpPrefix: config.sass.httpPrefix || path.relative('../../', './'),
                sources: [
                    {
                        directory: rootDir,
                        pattern: config.sass.assetsPattern
                    }
                ]
            }
        }
    }
}

/**
 * This task generates CSS from all SCSS files and compresses them down.
 */
module.exports = function (gulp, config) {
    function sass(done) {
        if (!config.sass.enabled) {
            done()
            return;
        }

        var presetEnvOptions = {}

        if (config.sass.browsers) {
            presetEnvOptions.browsers = config.sass.browsers
        }

        var processors = [
            require('postcss-import')(),
            require('postcss-url')(),
            require('postcss-preset-env')(presetEnvOptions),
            require('postcss-csso')(),
            require('postcss-reporter')(),
            require('postcss-browser-reporter')()
        ]

        return gulp.src(config.sources.scss)
            .pipe(sassGlob())
            .pipe(sourcemaps.init())
            .pipe(sassPlugin(eyeglass(sassOptions(config))).on('error', function (error) {
                log.error(error)
                notify().write(error)
                this.emit('end')
            }))
            .pipe(postcss(processors))
            .pipe(sourcemaps.write(config.paths.maps))
            .pipe(gulp.dest(config.paths.css))
            .pipe(notify({
                title: "SASS Compiled",
                message: "All SASS files have been recompiled to CSS.",
                onLast: true
            }))
    }

    gulp.task('sass', gulp.series('font-awesome', sass))
}
