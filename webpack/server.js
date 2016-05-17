var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var boilerplateConfig = require('../config');
var config = require('./config/development_server');
var chalk = require('chalk');
var compiler = webpack(config);

return new WebpackDevServer(compiler, {
    hot        : true,
    inline     : true,
    noInfo     : true,
    quiet      : true,
    contentBase: './src'
}).listen(boilerplateConfig.devServer.port, boilerplateConfig.devServer.host, function () {
    console.log(chalk.bold.blue(`Done, Server listening at http://${boilerplateConfig.devServer.host}:${boilerplateConfig.devServer.port}`));
});