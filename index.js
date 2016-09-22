/**
 * @author bmcclure
 */
var fs = require('fs');

var params = {
    config: require('./lib/config'),
    gulp: require('gulp')
};

function gulpTask(name, gulp, config) {
    gulp = gulp || params.gulp;
    config = config || params.config;

    require('./gulp-tasks/' + name)(gulp, config);
}

module.exports = {
    setConfig: function (gulp, config) {
        params.gulp = gulp;
        params.config = config;
    },
    gulpTask: function (name, gulp, config) {
        gulpTask(name, gulp, config);
    },
    gulpTasks: function (gulp, config) {
        gulp = gulp || params.gulp;
        config = config || params.config;

        tasks = config.gulp.tasks || [
                'drush',
                "font-awesome",
                "fonts",
                'icons',
                'sass',
                'scripts',
                'modernizr',
                'browser-sync',
                'watch',
                'default'
            ];

        var excludeTasks = config.gulp.excludeTasks || [];

        tasks.forEach(function (task) {
            if (excludeTasks.indexOf(task) == -1) {
                gulpTask(task, gulp, config)
            }
        });
    }
};
