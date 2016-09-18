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

  return module(gulp, config);
}

module.exports = {
  setConfig: function (setGulp, setConfig) {
    gulp = setGulp;
    config = setConfig;
  },
  gulpTask: function (name, subtask, sourceDir) {
    return gulpTask(name, subtask, sourceDir);
  },
  gulpTasks: function () {
    gulp.task('sass', gulpTask('sass'));
    gulp.task('scripts', gulpTask('scripts'));
    gulp.task('drush:cc', gulpTask('drush', 'cc'));
    gulp.task('drush:cr', gulpTask('drush', 'cr'));
    gulp.task('browser-sync', gulpTask('browser-sync'));
    gulp.task('watch', gulpTask('watch'));
    gulp.task('default', ['watch']);
  }
};
