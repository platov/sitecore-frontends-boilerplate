import {$} from 'vendor';
import override from '../override';
import {mediator} from 'core';

const EVENT_PREFIX = `placeholder:`;
const EVENT_INSERT = `${EVENT_PREFIX}insert`;
const EVENT_BEFORE_INSERT = `${EVENT_PREFIX}before-insert`;
const EVENT_MOVE = `${EVENT_PREFIX}move`;
const EVENT_POP = `${EVENT_PREFIX}pop`;
const EVENT_BEFORE_REMOVE = `${EVENT_PREFIX}before-removeRendering`;
const EVENT_REMOVE = `${EVENT_PREFIX}removeRendering`;

var Chrome = Sitecore.PageModes.ChromeTypes.Placeholder;

/**
 * Handle Insert behavior on rendering creation
 * */
override('insertRendering', Chrome.prototype,
    function (data) {
        data.position = this._insertPosition;

        mediator.emit(EVENT_BEFORE_INSERT, this.chrome, data.position);
    },

    function (data, renderingData) {
        var newRenderingUID    = $(renderingData.html).attr('id').substring(2),
            newRenderingChrome = this._getChildRenderingByUid(newRenderingUID);

        setTimeout(() => mediator.emit(EVENT_INSERT, this.chrome, newRenderingChrome, data.position), 500);
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
            mediator.emit(EVENT_POP, data.oldPlaceholder, control);
        }
    },

    function (data, control, position) {
        if (data.oldPlaceholder !== data.newPlaceholder) {
            mediator.emit(EVENT_INSERT, this.chrome, control, position);
        } else {
            mediator.emit(EVENT_MOVE, data.oldPlaceholder, control, position);
        }
    }
);


/**
 * Handle Remove Rendering behavior
 * */
override('deleteControl', Chrome.prototype,
    function (data, control) {
        mediator.emit(EVENT_BEFORE_REMOVE, this.chrome, control)
    },

    function (data, control) {
        setTimeout(() => mediator.emit(EVENT_REMOVE, this.chrome, control), 250)
    }
);
