import override from '../override';
import {mediator} from 'core';

const EVENT_PREFIX = `editFrame:`;
const EVENT_BEFORE_UPDATE_START = `${EVENT_PREFIX}before-updateStart`;
const EVENT_UPDATE_START = `${EVENT_PREFIX}updateStart`;
const EVENT_BEFORE_UPDATE_END = `${EVENT_PREFIX}before-updateEnd`;
const EVENT_UPDATE_END = `${EVENT_PREFIX}updateEnd`;

var Obj = Sitecore.PageModes.ChromeTypes.EditFrame;


/**
 * Handle Update Start behavior
 * */
override('updateStart', Obj.prototype,
    function () {
        mediator.emit(EVENT_BEFORE_UPDATE_START, this.chrome);
    },
    function () {
        mediator.emit(EVENT_UPDATE_START, this.chrome);
    }
);

/**
 * Handle Update End behavior
 * */
override('updateEnd', Obj.prototype,
    function () {
        mediator.emit(EVENT_BEFORE_UPDATE_END, this.chrome);
    },
    function () {
        mediator.emit(EVENT_UPDATE_END, this.chrome);
    }
);