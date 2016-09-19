/**
 * Created by BMcClure on 9/18/2016.
 */
var sassImage = require('gulp-sass-image');
var notify = require('gulp-notify');

module.exports = function (gulp, config) {
    gulp.task('sass-images', function () {
        if (!config.sassImages.enabled) {
            return;
        }

        var imagesPath = config.paths.images || 'images/';
        var targetFile = config.sassImages.targetFile  || '_image-helper.scss';
        var cssPath = config.sassImages.cssPath || 'css/';
        var imagesSrc = config.sources.images || 'images/**/*.+(jpeg|jpg|png|gif|svg)';
        var destination = config.sassImages.destination || 'src/scss/generated';

        return gulp.src(imagesSrc)
            .pipe(sassImage({
                targetFile: targetFile,
                css_path: cssPath,
                images_path: imagesPath,
                includeData: false
            }))
            .pipe(gulp.dest(destination))
            .pipe(notify({
                title: "SASS Images Processed",
                message: "Theme images have been mapped in the generated SASS mixin.",
                onLast: true
            }));
    });
};
