import {_, $, Vue} from 'vendor';
import {mediator} from 'core';
import Chrome from './ee.chrome';

var Field;

Field = Chrome.extend({
    created: function () {
        this.syncMediator({
            namespace: 'field',
            events   : ['change']
        });
    }
});

Vue.component('ee-field', Field);

export default Field;