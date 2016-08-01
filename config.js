module.exports = {
    publicPath: '/',
    distPath  : 'dist',

    entries: {
        'home.html': ['./scripts/common', './styles/home']
    },

    devServer: {
        host: 'localhost',
        port: '8080'
    }
};