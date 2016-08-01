var _ = require('lodash'),
    path = require('path'),
    webpack = require('webpack'),
    boilerplateConfig = require('../../config'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),

    extractHtmlEntriesPlugin = new ExtractTextPlugin(`[name].html`),
    extractHtmlEntriesString = ExtractTextPlugin.extract(),

    entry;


entry = _.reduce(boilerplateConfig.entries, function (result, value, key) {
    value.unshift('babel-polyfill', '../core/_init.js');

    if (/\.html$/.test(key)) {
        value.unshift(`${extractHtmlEntriesString}./${key}`);
        key = key.match(/^(.+?)\.html$/)[1];
    }

    result[key] = value;

    return result;
}, {});


module.exports = {
    context: path.resolve('src'),

    entry,

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
                test  : /\.png|gif|jpe?g|eot|svg|ttf|otf|woff|woff2$/,
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
        extractHtmlEntriesPlugin,

        new webpack.optimize.CommonsChunkPlugin({
            name    : 'commons',
            filename: "scripts/chunks/commons.js"
        })
    ],

    resolve: {
        extensions: ['', '.json', '.js', '.scss', '.html'],

        alias: {
            vendor: path.resolve('vendor'),
            core  : path.resolve('core')
        }
    }
};