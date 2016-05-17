import {$, Vue} from 'vendor';
import Field from './ee.field';

export default Vue.component('ee-image', Field.extend({
    name: 'ImageField',
    
    data: function () {
        return {
            src: ''
        }
    },

    events: {
        'setModified': function () {
            this.fetchValue();
        }
    },

    created: function () {
        this.fetchValue = function () {
            this.src = this.getFragmentChild().filter('img').attr('src');
        }
    }
}));
