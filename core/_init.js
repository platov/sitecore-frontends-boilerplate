import {_} from 'libs';
import {modules} from './index';

var appModules = require('modules');

_.each(appModules, module => modules.register(module));

modules.startAll();

