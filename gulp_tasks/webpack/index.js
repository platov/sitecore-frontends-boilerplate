import boilerplateConfig from '../../config';
import gutil from 'gulp-util';
import webpack from 'webpack';
import server from './server';
import compiler from './compiler';
import chalk from 'chalk';
import path from 'path';

module.exports = function (behavior) {
    return function (callback) {
        var config = require(`./config/${behavior.replace(':', '_')}`);

        switch (behavior) {
            case 'production':
                compiler(config, behavior, function () {
                    console.log(chalk.bold.bgBlue.black(` Done! All sources processed to '${path.resolve(boilerplateConfig.distPath)}' folder `));
                    callback();
                });
                break;

            case 'development:watch':
                compiler(config, behavior, function () {
                    console.log(chalk.bold.bgBlue.black(` Done! All sources, with 'watch' mode, processing to '${path.resolve(boilerplateConfig.distPath)}' folder `));
                    callback();
                });
                break;

            case 'development:server':
                server(config, behavior, function () {
                    console.log(
                        chalk.bold.bgBlue.black(
                            ` Done! Server started listening at`,
                            chalk.underline.bold.bgBlue.black(`http://${boilerplateConfig.devServer.host}:${boilerplateConfig.devServer.port}`),
                            ``
                        )
                    );
                    callback();
                });
                break;

            default:
                throw new gutil.PluginError("webpack", 'Unknown Behavior');
        }
    }
};