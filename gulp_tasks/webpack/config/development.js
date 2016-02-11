import _ from 'lodash';
import webpack from 'webpack';
import baseConfig from './base';
import boilerplateConfig from '../../../config';

var devConfig = _.merge({}, baseConfig);

// Enable source-maps
devConfig.devtool = 'eval-cheap-module-source-map';

// Enable Hot Module Replacement for each entry
_.each(devConfig.entry, (entry)=> {
    entry.unshift(`webpack-dev-server/client?http://${boilerplateConfig.devServer.host}:${boilerplateConfig.devServer.port}`, 'webpack/hot/dev-server');
});

devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = devConfig;