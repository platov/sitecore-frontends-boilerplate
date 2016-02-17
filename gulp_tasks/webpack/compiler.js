import gutil from 'gulp-util'
import webpack from 'webpack';
import boilerplateConfig from '../../config';
import chalk from 'chalk';
import path from 'path';

export default function (config, callback) {
    var compiler = webpack(config);

    return compiler.run(function (err, stats) {
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

        console.log(chalk.bold.bgBlue.black(` Done! All sources processed to '${path.resolve(boilerplateConfig.distPath)}' folder `))
    });
}