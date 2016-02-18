import gutil from 'gulp-util';
import webpack from 'webpack';
import server from './server';
import compiler from './compiler';

module.exports = function (ENV) {
    return function (callback) {
        var config = require(`./config/${ENV}`);

        config.plugins.push(new webpack.DefinePlugin({
            'NODE_ENV': `"${ENV}"`
        }));

        switch (ENV) {
            case 'production':
                compiler(config, callback);
                break;
            case 'development':
                server(config);
                break;
            default:
                throw new gutil.PluginError("webpack", 'Unknown ENV variable');
        }
    }
};