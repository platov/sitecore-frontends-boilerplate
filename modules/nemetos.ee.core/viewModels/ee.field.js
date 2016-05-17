import {_, $, Vue} from 'vendor';
import {mediator} from 'core';
import Chrome from './ee.chrome';

export default Vue.component('ee-field', Chrome.extend({
    name: 'Field',
    
    events: {
        'chromeAvailable': function () {
            this._chrome.element.bind("blur", () => this.$emit('blur'));
            this._chrome.element.bind("keydown", () => this.$emit('keydown'));
            this._chrome.element.bind("keyup", () => this.$emit('keyup'));
        }
    },

    created: function () {
        if (!window.Sitecore || !window.Sitecore.WebEditSettings.editing) {
            return;
        }

        this.syncMediator({
            namespace: 'field',
            events: ['setModified', 'persist']
        });

        this.fetchValue = function () {

        }
    },

    compiled: function () {
        this.fetchValue();
    }
}));