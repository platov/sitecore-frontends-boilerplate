import {$} from 'vendor';
import override from '../override';
import {mediator} from 'core';

const EVENT_PREFIX = `chrome:`;
const EVENT_BEFORE_EMPTY = `${EVENT_PREFIX}before-empty`;
const EVENT_EMPTY = `${EVENT_PREFIX}empty`;
const EVENT_BEFORE_REMOVE = `${EVENT_PREFIX}before-remove`;
const EVENT_REMOVE = `${EVENT_PREFIX}remove`;

var Chrome = Sitecore.PageModes.Chrome;


/**
 * Handle Emptying chrome behavior
 * */
override('empty', Chrome.prototype,
    function () {
        mediator.emit(EVENT_BEFORE_EMPTY, this);
    },
    function () {
        mediator.emit(EVENT_EMPTY, this);
    }
);

/**
 * Handle Remove chrome behavior
 * */
override('remove', Chrome.prototype,
    function () {
        mediator.emit(EVENT_BEFORE_REMOVE, this);
    },
    function () {
        mediator.emit(EVENT_REMOVE, this);
    }
);