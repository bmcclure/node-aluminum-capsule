/**
 * @author bmcclure
 */
var config = {};
var gulp = require('gulp');

module.exports = {
    setConfig: function (setGulp, setConfig) {
        gulp = setGulp;
        config = setConfig;
    },
    gulpTask: function (name) {
        require('./gulp-tasks/' + task)(gulp, config);
    },
    gulpTasks: function (tasks) {
        tasks = tasks || [
                'icons',
                'sass',
                'scripts',
                'modernizr',
                'drush',
                'browser-sync',
                'watch'
            ];

        tasks.forEach(function (task) {
            require('./gulp-tasks/' + task)(gulp, config);
        });

        gulp.task('default', ['watch']);
    }
};
