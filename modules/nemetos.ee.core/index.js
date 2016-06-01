import {$} from 'vendor';

export default {
    name: 'nemetos.ee.core',

    install: function () {
        require('./viewModels');
    },

    start: function () {
        $(window).load(function () {
            if (window.Sitecore && window.Sitecore.WebEditSettings && window.Sitecore.WebEditSettings.editing) {
                require('./chromeTypes');
            }
        });
    }
};