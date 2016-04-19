module.exports = {
    publicPath: '/',
    distPath  : 'dist',

    entries: {
        home: ['./styles/home.scss']
    },

    devServer: {
        host: 'localhost',
        port: '8080'
    }
};