import {_, $, Vue} from 'libs';
import {mediator} from 'core';
import Chrome from './ee.chrome';

var Field;

Field = Chrome.extend({
    created: function () {
        this.syncMediator({
            namespace: 'field',
            events   : ['change']
        });

        this.getControlId = function () {
            var $openTag;

            $openTag = $(this.getFragmentChild()).filter('code[type="text/sitecore"][kind="open"]');

            if (!$openTag.length) {
                throw 'VUEEE: Failed to determine own opening ChromeTag';
            }

            return $openTag.attr('id').replace('_edit', '');
        };
    }
});

Vue.component('ee-field', Field);

export default Field;