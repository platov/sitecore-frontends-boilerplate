import {_} from 'libs';
import ModuleContainer from './classes/moduleContainer';

var modules         = require('../modules'),
    moduleContainer = new ModuleContainer();

window.moduleContainer = moduleContainer;

_.each(modules, module => {
    moduleContainer.register(module);
});

moduleContainer.startAll();

