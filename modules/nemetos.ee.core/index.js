import {$} from 'libs';

export default {
    name: 'nemetos.ee.core',

    install: function () {
        require('./viewModels');
    },

    start: function () {
        $(window).load(function () {
            if (window.Sitecore) {
                require('./chromeTypes');
            }
        });
    }
};