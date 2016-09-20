/**
 * @author bmcclure
 */
var fs = require('fs');

var params = {
    config: (fs.existsSync(__dirname + "/./config.json")) ? require("./config.json") : {},
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
        tasks = config.gulp.tasks || [
                'drush',
                "font-awesome",
                "fonts",
                'icons',
                'sass-images',
                'sass',
                'scripts',
                'modernizr',
                'browser-sync',
                'watch',
                'default'
            ];

        var excludeTasks = config.gulp.excludeTasks || [];

        tasks.forEach(function (task) {
            if (!excludeTasks.contains(task)) {
                gulpTask(task, gulp, config)
            }
        });
    }
};
