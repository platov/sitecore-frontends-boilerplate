var _ = require('lodash');
var path = require('path');
var boilerplateConfig = require('../../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractHtmlEntriesPlugin, extractHtmlEntriesString, baseEntries, configuredEntries, entry;


extractHtmlEntriesPlugin = new ExtractTextPlugin(`[name].html`);
extractHtmlEntriesString = ExtractTextPlugin.extract();


baseEntries = {
    common: ['babel-polyfill', '../core/_init.js', './scripts/common.js', './styles/common.scss']
};


configuredEntries = _.each(boilerplateConfig.entries, function (deps, name, obj) {
    obj[name] = _.isArray(deps) ? deps : [];

    deps.unshift(`${extractHtmlEntriesString}./${name}.html`);
});


module.exports = {
    context: path.resolve('src'),

    entry: _.extend({}, baseEntries, configuredEntries),

    output: {
        path         : path.resolve(boilerplateConfig.distPath),
        filename     : 'scripts/[name].bundle.js',
        chunkFilename: 'scripts/chunks/[id].js'
    },

    module: {
        loaders: [
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                exclude: /node_modules|vendor\\(?!index\.js$)/,
                query  : {
                    presets: ['es2015', 'stage-0']
                }
            },

            {
                test   : /\.scss$/,
                exclude: /(node_modules)/,
                loader : 'style!css!sass'
            },

            {
                test   : /\.css$/,
                exclude: /(node_modules)/,
                loader : 'style!css'
            },

            {
                test  : /\.png|gif|jpe?g|eot|svg|ttf|woff|woff2$/,
                loader: 'file?name=[path][name].[ext]'
            },

            {
                test  : /\.html$/,
                loader: "html",
                query : {
                    interpolate: true,
                    minimize   : false
                }
            },

            {
                test  : /\.json/,
                loader: "json-loader"
            }
        ]
    },

    plugins: [
        extractHtmlEntriesPlugin
    ],

    resolve: {
        extensions: ['', '.json', '.js', '.scss', '.html'],

        alias: {
            vendor: path.resolve('vendor'),
            core: path.resolve('core')
        }
    }
};