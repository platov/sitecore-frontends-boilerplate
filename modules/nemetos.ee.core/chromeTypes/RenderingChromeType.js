import {$} from 'vendor';
import override from '../override';
import {mediator} from 'core';

const EVENT_PREFIX = `rendering:`;
const EVENT_BEFORE_UPDATE = `${EVENT_PREFIX}before-update`;
const EVENT_UPDATE = `${EVENT_PREFIX}update`;

var Chrome = Sitecore.PageModes.ChromeTypes.Rendering;


/**
 * Handle Update rendering behavior on rendering updating
 * */
override('update', Chrome.prototype,
    function () {
        mediator.emit(EVENT_BEFORE_UPDATE, this.chrome);
    },
    function () {
        mediator.emit(EVENT_UPDATE, this.chrome);
    }
);