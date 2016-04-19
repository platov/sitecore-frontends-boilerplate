var _ = require('lodash');
var webpack = require('webpack');
var baseConfig = require('./base');
var boilerplateConfig = require('../../config');

var config = _.merge({}, baseConfig);

config.output.publicPath  = boilerplateConfig.publicPath;

// Enable code compression
config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress : {
            warnings: false
        }
    })
);

config.plugins.push(new webpack.DefinePlugin({
    '_ENV_': `"production"`
}));

module.exports = config;