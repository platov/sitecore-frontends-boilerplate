import {$} from 'libs';
import override from '../override';
import mediator from '../mediator';

const EVENT_PREFIX = `placeholder:`;
const EVENT_INSERT = `${EVENT_PREFIX}insert`;
const EVENT_MOVE = `${EVENT_PREFIX}move`;
const EVENT_POP = `${EVENT_PREFIX}pop`;

var Chrome = Sitecore.PageModes.ChromeTypes.Placeholder;

/**
 * Handle Insert behavior on rendering creation
 * */
override('insertRendering', Chrome.prototype,
    function (data) {
        data.position = this._insertPosition;
    },

    function (data, renderingData) {
        var newRenderingUID    = $(renderingData.html).attr('id').substring(2),
            newRenderingChrome = this._getChildRenderingByUid(newRenderingUID);

        mediator.emit(EVENT_INSERT, this.chrome.element, newRenderingChrome.element, data.position);
    }
);


/**
 * Handle Insert, Pop, Move behaviors on moving rendering around on the page
 * */
override(
    'insertRenderingAt', Chrome.prototype,

    function (data, control, position) {
        data.oldPlaceholder = control.type.getPlaceholder();
        data.newPlaceholder = this.chrome;

        if (data.oldPlaceholder !== data.newPlaceholder) {
            mediator.emit(EVENT_POP, data.oldPlaceholder.element, control.element);
        }
    },

    function (data, control, position) {
        if (data.oldPlaceholder !== data.newPlaceholder) {
            mediator.emit(EVENT_INSERT, this.chrome.element, control.element, position);
        } else {
            mediator.emit(EVENT_MOVE, data.oldPlaceholder.element, control.element, position);
        }
    }
);


/**
 * Handle Pop behavior on delete rendering
 * */
override('deleteControl', Chrome.prototype, null, function (data, chrome) {
    setTimeout(() => mediator.emit(EVENT_POP, this.chrome.element, chrome.element), 250);
});


/**
 * Fire events into the DOM
 * */
mediator.on(EVENT_INSERT, function (placeholderElem, renderElem, data) {
    $.event.trigger(EVENT_INSERT, data, renderElem, false);
});

mediator.on(EVENT_MOVE, function (placeholderElem, renderElem, data) {
    $.event.trigger(EVENT_MOVE, data, renderElem, false);
});

mediator.on(EVENT_POP, function (placeholderElem, renderElem, data) {
    $.event.trigger(EVENT_POP, data, renderElem, false);
});