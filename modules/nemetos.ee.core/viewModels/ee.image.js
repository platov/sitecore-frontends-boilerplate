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
    },

    compiled: function () {
        if (this.map) {
            if (this.$parent.hasOwnProperty(this.map)) {
                console.warn(`[ee field mapping] Parent component already has field "${this.map}"`);
            }

            this.$watch('src', (value) => {
                Vue.set(this.$parent.$data, this.map, value);
            }, {immediate: true});

            this.$parent.$watch(this.map, (value)=> {
                this.src = value;
            });
        }
    }
}));
