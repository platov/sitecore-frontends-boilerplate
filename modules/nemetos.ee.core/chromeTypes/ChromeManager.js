import override from '../override';
import {mediator} from 'core';

const EVENT_PREFIX = `chromeManager:`;
const EVENT_BEFORE_RESET_CHROMES = `${EVENT_PREFIX}before-resetChromes`;
const EVENT_RESET_CHROMES = `${EVENT_PREFIX}resetChromes`;


var Obj = Sitecore.PageModes.ChromeManager;


/**
 * Handle Reset Chromes behavior
 * */
override('resetChromes', Obj,
    function () {
        mediator.emit(EVENT_BEFORE_RESET_CHROMES);
    },
    function () {
        mediator.emit(EVENT_RESET_CHROMES);
    }
);

