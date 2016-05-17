var webpack = require('webpack');
var path = require('path');
var chalk = require('chalk');

switch (process.env.NODE_ENV) {
    case 'production':
        buildProd();
        break;
    case 'development':
    default:
        buildDev();
        break;
}

function buildProd() {
    var config   = require('./config/production.js'),
        compiler = webpack(config);

    compiler.run(function (err, stats) {
        if (err) {
            throw err;
        }

        console.log("[webpack]", stats.toString({
            colors : true,
            hash   : false,
            version: false,
            assets : false,
            chunks : false
        }));

        console.log(chalk.bold.blue(`Production build finished!`));
    });
}

function buildDev() {
    var config   = require('./config/development_watch.js'),
        compiler = webpack(config),
        callback = function () {
            console.log(chalk.bold.blue(`Development build finished!`));
            callback = () => void 0;
        };

    compiler.watch({}, function (err, stats) {
        if (err) {
            throw err;
        }

        console.log("[webpack]", stats.toString({
            colors : true,
            hash   : false,
            version: false,
            assets : false,
            chunks : false
        }));

        callback();

        console.log(chalk.bold.blue(`Watcher: sources rebuilded!`));
    });
}