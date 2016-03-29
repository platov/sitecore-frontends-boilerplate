import {_} from 'libs';
import {Mediator} from 'libs';
import ModuleContainer from './classes/moduleContainer';

var mediator, modules;

mediator = new Mediator();
modules = new ModuleContainer();

modules.promise.then(function () {
    // PreRequire all available components
    require('../src/components');

    // Emit ready event
    mediator.emit('core:ready');
});

export {mediator};
export {modules};

export var promise = modules.promise;