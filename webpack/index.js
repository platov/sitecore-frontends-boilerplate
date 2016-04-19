var boilerplateConfig = require('../../config');
var gutil = require('gulp-util');
var webpack = require('webpack');
var server = require('./server');
var compiler = require('./compiler');
var chalk = require('chalk');
var path = require('path');

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === 'production' && process.argv)
switch (process.env.NODE_ENV) {
    case 'production':
        compiler(require(`./config/development_server.js`), false, function () {
            console.log(chalk.bold.bgBlue.black(` Done! All sources processed to '${path.resolve(boilerplateConfig.distPath)}' folder `));
        });
        break;

    case 'development':
        compiler(require(`./config/development_watch.js`), true, function () {
            console.log(chalk.bold.bgBlue.black(` Done! All sources, with 'watch' mode, processing to '${path.resolve(boilerplateConfig.distPath)}' folder `));
        });
        break;

    case 'development':
        server(config, behavior, function () {
            console.log(
                chalk.bold.bgBlue.black(
                    ` Done! Server started listening at`,
                    chalk.underline.bold.bgBlue.black(`http://${boilerplateConfig.devServer.host}:${boilerplateConfig.devServer.port}`),
                    ``
                )
            );
        });
        break;

    default:
        throw new gutil.PluginError("webpack", 'Unknown Behavior');
}