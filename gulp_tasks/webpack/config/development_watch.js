import _ from 'lodash';
import webpack from 'webpack';
import baseConfig from './base';
import boilerplateConfig from '../../../config';

var config = _.merge({}, baseConfig, {
    devtool: 'eval-cheap-module-source-map',    // Enable source-maps
    watch: true
});

config.output.publicPath  = boilerplateConfig.publicPath;

config.plugins.push(new webpack.DefinePlugin({
    '_ENV_': `"development"`
}));

module.exports = config;