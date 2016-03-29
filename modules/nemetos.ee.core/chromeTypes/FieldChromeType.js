import {_, $} from 'libs';
import override from '../override';
import {mediator} from 'core';

const EVENT_PREFIX = `field:`;
const EVENT_CHANGE = `${EVENT_PREFIX}change`;
const EVENT_BEFORE_CHANGE = `${EVENT_PREFIX}change`;


var Chrome = Sitecore.PageModes.ChromeTypes.Field;

/**
 * Handle Field modifications
 * */
override('setModified', Chrome.prototype,
    _.debounce(function () {
        mediator.emit(EVENT_BEFORE_CHANGE, this.chrome);
    }, 0),
    _.debounce(function () {
        mediator.emit(EVENT_CHANGE, this.chrome);
    }, 0)
);