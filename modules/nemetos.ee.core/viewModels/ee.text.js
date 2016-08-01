import {$, Vue} from 'vendor';
import {mediator} from 'core';
import Field from './ee.field';

export default Vue.component('ee-text', Field.extend({
    name: 'TextField',

    events: {
        'blur': function () {
            this.fetchValue();
        }
    },

    data: function () {
        return {
            value: ''
        }
    },

    created: function () {
        this.fetchValue = function () {
            var fragmentChildNodes = [].slice.call(this._fragment.childNodes);

            if (window.Sitecore && window.Sitecore.WebEditSettings && window.Sitecore.WebEditSettings.editing) {
                this.value = $(fragmentChildNodes).filter('.scWebEditInput').text();
            } else {
                this.value = $(fragmentChildNodes).text().trim();
            }
        };

        this.$watch('value', function () {
            if (!this._chrome) {
                return;
            }

            this._chrome.type.fieldValue.val(this.value);
            this._chrome.type.refreshValue();
        });
    },

    compiled: function () {
        if (this.map) {
            if (this.$parent.hasOwnProperty(this.map)) {
                console.warn(`[ee field mapping] Parent component already has field "${this.map}"`);
            }

            this.$watch('value', (value) => {
                Vue.set(this.$parent.$data, this.map, value);
            }, {immediate: true});

            this.$parent.$watch(this.map, (value)=> {
                this.value = value;
            });
        }
    }
}));