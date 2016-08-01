import {$} from 'vendor';

export default {
    /**
     * Module name
     * @type {string}
     * */
    name: 'nemetos.ee.core',

    /**
     * Install lifecycle hook
     * On application start all modules executes `install` hook function.
     * If `install` function returns Promise then all dependand modules
     * will wait for this Promise before call own `install` hook (async behavior).
     *
     * In this hook recommended to register components, directives, mixins and another thins
     *
     * @type {function}
     * @return {Promise|undefined}
     * */
    install: function () {
        require('./viewModels');
    },

    /**
     * Start lifecycle hook
     * When all modules finished work with `install` hooks then each module execute `start` hook function.
     * If `start` function returns Promise then all dependand modules
     * will wait for this Promise before call own `start` hook (async behavior).
     *
     * In this hook recommended to launch module functionality
     *
     * @type {function}
     * @return {Promise|undefined}
     * */
    start: function () {
        $(window).on('load', function () {
            if (window.Sitecore && window.Sitecore.WebEditSettings && window.Sitecore.WebEditSettings.editing) {
                require('./chromeTypes');
                Sitecore.PageModes.ChromeManager.resetChromes()
            }
        });
    }
};