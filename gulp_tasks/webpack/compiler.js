import _ from 'lodash';
import gutil from 'gulp-util'
import webpack from 'webpack';
import boilerplateConfig from '../../config';
import path from 'path';
import chalk from 'chalk';

export default function (config, behavior, callback) {
    var compiler = webpack(config);

    if (behavior === 'development:watch') {

        callback = (native => function () {
            native();

            callback = function () {
                console.log(chalk.bold.bgBlue.black(` Watcher: sources rebuilded! `));
            }
        })(callback);

        compiler.watch({}, function (err, stats) {
            if (err) {
                throw new gutil.PluginError("webpack", err);
            }

            gutil.log("[webpack]", stats.toString({
                colors : true,
                hash   : false,
                version: false,
                assets : false,
                chunks : false
            }));

            callback();
        });
    } else {
        compiler.run(function (err, stats) {
            if (err) {
                throw new gutil.PluginError("webpack", err);
            }

            gutil.log("[webpack]", stats.toString({
                colors : true,
                hash   : false,
                version: false,
                assets : false,
                chunks : false
            }));

            callback();
        });
    }


    return compiler;
}