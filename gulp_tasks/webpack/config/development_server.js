import _ from 'lodash';
import webpack from 'webpack';
import baseConfig from './base';
import boilerplateConfig from '../../../config';

var config = _.merge({}, baseConfig, {
    devtool: '#eval-cheap-module-source-map'
});

// Enable Hot Module Replacement for each entry
_.each(config.entry, (entry)=> {
    entry.unshift(`webpack-dev-server/client?http://${boilerplateConfig.devServer.host}:${boilerplateConfig.devServer.port}`, 'webpack/hot/dev-server');
});

config.plugins.push(new webpack.HotModuleReplacementPlugin());

config.plugins.push(new webpack.DefinePlugin({
    '_ENV_': `"development"`
}));

module.exports = config;