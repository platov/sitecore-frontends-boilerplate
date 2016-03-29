import {_, $, Vue} from 'libs';
import {mediator} from 'core';
import Chrome from './ee.chrome';

var Placeholder;

Placeholder = Chrome.extend({
    events: {
        'insert': function () {
            this.$compile(this.$el.parentNode);

            Sitecore.PageModes.ChromeManager.resetChromes();
        },

        'rendering:update': function (vm) {
            vm.$destroy();

            Vue.nextTick(() => {
                this.$compile(this.$el.parentNode);
                
                Sitecore.PageModes.ChromeManager.resetChromes();
            });
        }
    },

    created: function () {
        this.syncMediator({
            namespace: 'placeholder',
            events   : ['insert', 'move', 'pop', 'removeRendering']
        });

        this.getControlId = function () {
            var $openTag;

            if (this._isFragment) {
                $openTag = $(this.$el.nextElementSibling);
            } else {
                $openTag = $(this.$el).children(':first');
            }

            if (!$openTag.is('code[chrometype=placeholder][kind=open]')) {
                throw 'VUEEE: Failed to determine own opening ChromeTag';
            }

            return $openTag.attr('id').replace('_edit', '');
        };
    }
});

Vue.component('ee-placeholder', Placeholder);

export default Placeholder;