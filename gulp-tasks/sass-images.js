/**
 * Created by BMcClure on 9/18/2016.
 */
var sassImage = require('gulp-sass-image');
var appRootDir = require('app-root-dir');

module.exports = function (gulp, config) {
    gulp.task('sass-images', function () {
        if (!config.sassImages.enabled) {
            return;
        }

        var imagesPath = config.paths.images || 'images/';
        var targetFile = config.sassImages.targetFile  || '_image-helper.scss';
        var cssPath = config.sassImages.cssPath || 'css/';
        var imagesSrc = config.sources.images || appRootDir + '/images/**/*.+(jpeg|jpg|png|gif|svg)';
        var destination = config.sassImages.destination || appRootDir + '/src/scss/generated';

        return gulp.src(imagesSrc)
            .pipe(sassImage({
                targetFile: targetFile,
                css_path: cssPath,
                images_path: imagesPath,
                includeData: false
            }))
            .pipe(gulp.dest(destination));
    });
};
