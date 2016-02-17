import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import boilerplateConfig from '../../config';
import chalk from 'chalk';

export default function (config) {
    var compiler = webpack(config);

    return new WebpackDevServer(compiler, {
        hot   : true,
        inline: true,
        noInfo: true,
        quiet : true
    }).listen(boilerplateConfig.devServer.port, boilerplateConfig.devServer.host, function () {
        console.log(
            chalk.bold.bgBlue.black(
                ` Done! Server started listening at`,
                chalk.underline.bold.bgBlue.black(`http://${boilerplateConfig.devServer.host}:${boilerplateConfig.devServer.port}`),
                ``
            )
        )
    });
}