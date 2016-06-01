import {_, $, Vue} from 'vendor';
import {mediator} from 'core';
import Chrome from './ee.chrome';

export default Vue.component('ee-edit-frame', Chrome.extend({
    name: 'EditFrame',

    created: function () {
        if (!window.Sitecore || !window.Sitecore.WebEditSettings || !window.Sitecore.WebEditSettings.editing) {
            return;
        }

        this.syncMediator({
            namespace: 'editFrame',
            events: ['updateStart', 'updateEnd']
        });

        this.getControlId = function(){
            return $(this._fragmentStart).next();
        };

        this._linkChromeInstance = () => {
            var chromes, controlId;

            if (this._chrome) {
                return
            }

            chromes = Sitecore.PageModes.ChromeManager.chromes();
            controlId = this.getControlId();

            this._chrome = _.find(chromes, c => c.element[0] === controlId[0]);

            if (!this._chrome) {
                throw `VUEEE: can't find chrome`
            }

            this.$options.name = `${this._chrome.data.displayName} [${this._chrome.type.key()}]`;

            this.$emit('chromeAvailable', this._chrome);
        };
    }
}));