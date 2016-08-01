import override from '../override';
import {mediator} from 'core';

const EVENT_PREFIX = `chromeControls:`;
const EVENT_BEFORE_RENDER_COMMAND = `${EVENT_PREFIX}before-renderCommandTag`;
const EVENT_RENDER_COMMAND = `${EVENT_PREFIX}renderCommandTag`;

var Obj = Sitecore.PageModes.ChromeControls;

override('renderCommandTag', Obj.prototype,
    function (data, command, chrome) {
        mediator.emit(EVENT_BEFORE_RENDER_COMMAND, chrome, this, command);
    },
    function (data, command, chrome) {
        mediator.emit(EVENT_RENDER_COMMAND, chrome, data.nativeResult, this, command);
    }
);
