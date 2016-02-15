import {$} from 'libs';
import override from '../override';
import mediator from '../mediator';

const EVENT_PREFIX = `field:`;
const EVENT_CHANGE = `${EVENT_PREFIX}change`;
const EVENT_DELETE = `${EVENT_PREFIX}delete`;

var Chrome = Sitecore.PageModes.ChromeTypes.Field;

/**
 * Handle Field modifications
 * */
override('setModified', Chrome.prototype, null, _.debounce(function () {
    mediator.emit(EVENT_CHANGE, this.chrome.element);
}), 0);


/**
 * Handle Field deletion
 * */
override('onDelete', Chrome.prototype, null, function () {
        mediator.emit(EVENT_DELETE, this.chrome.element);
    }
);


/**
 * Fire events into the DOM
 * */
mediator.on(EVENT_CHANGE, function (placeholderElem, renderElem, data) {
    $.event.trigger(EVENT_CHANGE, data, renderElem, false);
});

mediator.on(EVENT_DELETE, function (placeholderElem, renderElem, data) {
    $.event.trigger(EVENT_DELETE, data, renderElem, false);
});
