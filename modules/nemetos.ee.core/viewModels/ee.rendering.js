import {_, $, Vue} from 'vendor';
import {mediator} from 'core';
import Chrome from './ee.chrome';

var Rendering;

Rendering = Chrome.extend({
    created: function () {
        this.syncMediator({
            namespace: 'rendering',
            events   : ['update']
        });

        this.getControlId = function () {
            var $openTag;

            $openTag = $(this.$el.previousElementSibling);

            if (!$openTag.is('code[chrometype=rendering][kind=open]')) {
                throw 'VUEEE: Failed to determine own opening ChromeTag';
            }

            return $openTag.attr('id').replace('_edit', '');
        };

        /**
         * Destroy Vue instance before Placeholder removes Child Rendering
         * */
        this.$parent.$on('before-removeRendering', (placeholderChrome, renderingChrome) => {
            if (renderingChrome !== this._chrome) {
                return;
            }

            this.$destroy();
        });
    }
});

Vue.component('ee-rendering', Rendering);

export default Rendering;