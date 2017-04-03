/**
 * Created by BMcClure on 9/16/2016.
 */
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var util = require('gulp-util');
var notify = require('gulp-notify');
var eyeglass = require('eyeglass');
var path = require('path');
var sassGlob = require('gulp-sass-glob');
var postcss = require('gulp-postcss');
var bless = require('gulp-bless');

function sassOptions(config) {
    var rootDir = path.resolve('.');

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
    };
}

/**
 * This task generates CSS from all SCSS files and compresses them down.
 */
module.exports = function (gulp, config) {
    gulp.task('sass', ['font-awesome'], function () {
        if (!config.sass.enabled) {
            return;
        }

        var cssNextOptions = {};

        if (config.sass.browsers) {
            cssNextOptions.browsers = config.sass.browsers;
        }

        var processors = [
            require('postcss-import')(),
            require('postcss-url')(),
            require('postcss-cssnext')(cssNextOptions),
            require('postcss-csso')(),
            require('postcss-reporter')(),
            require('postcss-browser-reporter')()
        ];

        return gulp.src(config.sources.scss)
            .pipe(sourcemaps.init())
            .pipe(sassGlob())
            .pipe(sass(eyeglass(sassOptions(config))).on('error', function (error) {
                util.log(error);
                notify().write(error);
                this.emit('end');
            }))
            //.pipe(bless())
            .pipe(postcss(processors))
            .pipe(sourcemaps.write(config.paths.maps))
            .pipe(gulp.dest(config.paths.css))
            .pipe(notify({
                title: "SASS Compiled",
                message: "All SASS files have been recompiled to CSS.",
                onLast: true
            }));
    });
};
