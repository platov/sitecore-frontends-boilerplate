import _ from 'lodash';
import path from 'path';
import boilerplateConfig from '../../../config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

var extractHtmlEntries = new ExtractTextPlugin(`[name].html`),
    baseEntries, configuredEntries, entry;

const DIST_PATH = path.resolve('dist');
const CONTEXT_PATH = path.resolve('src');
const EXTRACT = ExtractTextPlugin.extract();

baseEntries = {
    common: ['babel-polyfill', './scripts/common.js', './styles/common.scss']
};


configuredEntries = _.each(boilerplateConfig.entries, function (deps, name, obj) {
    if (!_.isArray(deps)) {
        deps = [];

        obj[name] = deps;
    }

    deps.unshift(`${EXTRACT}./${name}.html`);
});

entry = _.extend({}, baseEntries, configuredEntries);

module.exports = {
    context: CONTEXT_PATH,

    entry,

    output: {
        path         : path.resolve(boilerplateConfig.distPath),
        publicPath   : boilerplateConfig.publicPath,
        filename     : 'scripts/[name].bundle.js',
        chunkFilename: 'scripts/chunks/[id].js'
    },

    module: {
        loaders: [
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                exclude: /(node_modules)/,
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
        extractHtmlEntries
    ],

    resolve: {
        root: path.resolve('.'),

        extensions: ['', '.json', '.js', '.scss', '.html']
    }
};