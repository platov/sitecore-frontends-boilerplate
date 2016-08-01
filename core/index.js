import {_, Mediator} from 'vendor';
import ModulesFactory from './classes/modulesFactory';

var modulesFactory, initialize, promise, mediator, __resolve;

modulesFactory = new ModulesFactory(require('../modules'));
mediator = new Mediator();
promise = new Promise(res => __resolve = res);

initialize = function () {
    modulesFactory.startAll().then(function () {
        __resolve();

        mediator.emit('core:ready');
    });
};

export {promise, initialize, modulesFactory, mediator};