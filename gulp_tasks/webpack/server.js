import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import boilerplateConfig from '../../config';

export default function (config, behavior, callback) {
    var compiler = webpack(config);

    return new WebpackDevServer(compiler, {
        hot        : true,
        inline     : true,
        noInfo     : true,
        quiet      : true,
        contentBase: './src'
    }).listen(boilerplateConfig.devServer.port, boilerplateConfig.devServer.host, function () {
        callback();
    });
}