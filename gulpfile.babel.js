import gulp from 'gulp';
import webpackTask from './gulp_tasks/webpack';

gulp.task('prod', webpackTask('production'));

gulp.task('server', webpackTask('development'));

gulp.task('default', webpackTask(process.env.NODE_ENV));


