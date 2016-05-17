import {_, $} from 'vendor';
import override from '../override';
import {mediator} from 'core';

const EVENT_PREFIX = `field:`;
const EVENT_MODIFIED = `${EVENT_PREFIX}setModified`;
const EVENT_BEFORE_MODIFIED = `${EVENT_PREFIX}before-setModified`;
const EVENT_PERSIST = `${EVENT_PREFIX}persist`;
const EVENT_BEFORE_PERSIST = `${EVENT_PREFIX}before-persist`;

var Chrome = Sitecore.PageModes.ChromeTypes.Field;

/**
 * Handle Field modifications
 * */
override('setModified', Chrome.prototype,
    _.debounce(function () {
        mediator.emit(EVENT_BEFORE_MODIFIED, this.chrome);
    }, 0),
    _.debounce(function () {
        mediator.emit(EVENT_MODIFIED, this.chrome);
    }, 0)
);


override('persistValue', Chrome.prototype,
    function () {
        mediator.emit(EVENT_BEFORE_PERSIST, this.chrome);
    },
    function () {
        mediator.emit(EVENT_PERSIST, this.chrome);
    }
);