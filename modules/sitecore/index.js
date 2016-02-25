import mediator from './mediator';
import {$} from 'libs';


export default {
    name: 'nemetos.ee.chrometypes-wrapper',

    install: function () {

    },

    start: function () {
        $(function () {
            if (window.Sitecore) {
                frames[0].onload = function () {
                    frames[0].window.require(['/-/speak/v1/ExperienceEditor/ExperienceEditor.js'], function () {
                        require('./chromeTypes');
                    });
                }
            }
        });
    }
};