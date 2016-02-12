# sitecore-frontends-boilerplate
This projects aims to be a starting point to making HTML markup for sitecore solution.

## Features
* [Sass](http://sass-lang.com/)
* EcmaScript 2015 support using [Babeljs](https://babeljs.io/)
* Bundling all sources using [Webpack](https://webpack.github.io/)
* [Dev-server](https://webpack.github.io/docs/webpack-dev-server.html) with `hot-module-replacement` plugin for Webpack
* Sources optiomization for production build

## Install
1. Clone this repositiory &mdash; `git clone https://github.com/platov/sitecore-frontends-boilerplate.git`
1. Install dependencies &mdash; `npm install`
1. Install Gulp globally &mdash; `npm install gulp-cli -g`

## Useage
`gulp` &mdash; build project with production or development settings related to host ```process.env.NODE_ENV``` variable  
`gulp prod` &mdash; build project with production settings  
`gulp dev` &mdash; build project with development settings 

## Production build
This task will optimize html and javascript source code using [html-minifier](https://github.com/kangax/html-minifier) and [uglifyJS2](https://github.com/mishoo/UglifyJS2), bundle and put to the distribution folder

## Development build
This task runs webpack-dev-server with hot-module-replacement plugin.  
  
“_The webpack-dev-server is a little node.js Express server, which uses the webpack-dev-middleware to serve a webpack bundle. It also has a little runtime which is connected to the server via Socket.IO. The server emits information about the compilation state to the client, which reacts to those events...”_  [read more](https://webpack.github.io/docs/webpack-dev-server.html) 
  
By default webpack-dev-server configured to listen on localhost:8080  
  
hot-module-replacement plugin allows you to see your code changes without refreshing the page. [read more](https://webpack.github.io/docs/hot-module-replacement.html)
