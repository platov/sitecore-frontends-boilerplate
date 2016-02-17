import gutil from 'gulp-util'
import server from './server';
import compiler from './compiler';

module.exports = function (ENV) {
    return function (callback) {
        var config = require(`./config/${ENV}`);

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