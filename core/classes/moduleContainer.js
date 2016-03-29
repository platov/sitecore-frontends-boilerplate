import {_} from 'libs';
import BaseModule from './base.module';

export default class ModuleContainer {
    constructor() {
        this.modules = [];
        this.deps = [];

        this.promise = new Promise((res) => {
            this._ready = res;
        });
    }

    register(data) {
        var module = new BaseModule(data);

        this.modules.push(module);

        _.each(module.requires, depName => {
            this.deps.push({
                the     : module.name,
                requires: depName
            });
        });
    }

    async startAll() {
        // Install all
        await this._walkDepsTree(module => module.install());

        console.info(`${this.modules.length} modules have been installed!`);

        // Start all
        await this._walkDepsTree(module => module.start());

        //todo: seal
        this._ready();
    }

    async _walkDepsTree(handler) {
        var modules = this.modules;

        async function resolve(module) {
            var reqPromise;

            reqPromise = _.chain(module.requires)
                .map(name => _.find(modules, {name}))
                .map(resolve)
                .value();

            await Promise.all(reqPromise);

            await handler(module);
        }

        await Promise.all(_.map(modules, resolve))
    }

    get() {

    }
}