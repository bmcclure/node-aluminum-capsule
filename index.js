function gulpTask(name, gulp, config) {
    gulp = gulp || require('gulp')
    config = config || require('./lib/config')()

    require('./gulp-tasks/' + name)(gulp, config)
}

module.exports = {
    gulpTask: function (name, gulp, config) {
        gulpTask(name, gulp, config)
    },
    gulpTasks: function (gulp, config) {
        config = config || require('./lib/config')()

        tasks = config.gulp.tasks || [
                'drush',
                "font-awesome",
                "fonts",
                'icons',
                'sass',
                'scripts',
                'modernizr',
                'assets',
                'browser-sync',
                'build',
                'watch',
                'default'
            ]

        var excludeTasks = config.gulp.excludeTasks || []

        tasks.forEach(function (task) {
            if (excludeTasks.indexOf(task) === -1) {
                gulpTask(task, gulp, config)
            }
        })
    }
}
