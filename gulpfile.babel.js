import gulp from 'gulp';
import webpackTask from './gulp_tasks/webpack';

var webpackEnvBehavior = process.env.NODE_ENV === 'development' ? 'development:server' : 'production';

gulp.task('prod', webpackTask('production'));

gulp.task('server', webpackTask('development:server'));

gulp.task('watch', webpackTask('development:watch'));

gulp.task('default', webpackTask(webpackEnvBehavior));


