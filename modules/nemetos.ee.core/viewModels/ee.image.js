import {$, Vue} from 'libs';
import Field from './ee.field';

var Image;

Image = Field.extend({
    data: function () {
        return {
            src: ''
        }
    },

    events: {
        'change': function () {
            this.updateValue();
        }
    },

    created: function () {
        this.updateValue = function () {
            this.src = this.getFragmentChild().filter('img').attr('src');
        }
    },

    compiled: function () {
        this.updateValue();
    }
});

Vue.component('ee-image', Image);

export default Image;