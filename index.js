/**
 * @author bmcclure
 */
var config = {};
var gulp = require('gulp');

function gulpTask(task, sourceDir) {
    sourceDir = sourceDir || './gulp-tasks';

    var parts = task.split(':');
    var name = parts[0];
    var subtask = parts[1] || false;

    var module = require(sourceDir + '/' + name);

    if (subtask) {
        module = module[subtask];
    }

    gulp.task(task, module(gulp, config));
}

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
                'drush:cc',
                'drush:cr',
                'browser-sync',
                'watch'
            ];

        tasks.forEach(function (task) {
            gulpTask(task);
        });

        gulp.task('default', ['watch']);
    }
};
