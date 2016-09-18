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
    gulpTask: function (name, subtask, sourceDir) {
        return gulpTask(name, subtask, sourceDir);
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
            require('./gulp-tasks/' + task);
        });

        gulp.task('default', ['watch']);
    }
};
