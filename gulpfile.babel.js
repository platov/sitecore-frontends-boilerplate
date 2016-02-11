import gulp from 'gulp';
import webpackTask from './gulp_tasks/webpack';

gulp.task('prod', webpackTask('production'));

gulp.task('dev', webpackTask('development'));


