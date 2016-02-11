import gutil from 'gulp-util'
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import boilerplateConfig from '../../config';

module.exports = function (ENV) {
    return function (callback) {
        var config = require(`./config/${ENV}`),
            compiler = webpack(config);

        if(ENV === 'production') {
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
        } else if (ENV === 'development') {
            new WebpackDevServer(compiler, {
                hot        : true,
                inline     : true
            }).listen(boilerplateConfig.devServer.port, boilerplateConfig.devServer.host);
        } else {
            throw new gutil.PluginError("webpack", 'Unknown ENV variable');
        }
    }
};