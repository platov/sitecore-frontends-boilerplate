import {_} from 'vendor';
import Factory from './factory';
import BaseModule from './module';

export default class ModulesFactory extends Factory {
    constructor(modules) {
        super();
        this.modules = [];
        this.deps = [];

        this.promise = new Promise((res) => {
            this._ready = res;
        });

        // Register each available module
        _.each(modules, Module => this.define(Module));
    }

    define(data) {
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
        await this.walkDepsTree(module => module.install());

        console.info(`${this.modules.length} modules have been installed!`);

        // Start all
        await this.walkDepsTree(module => module.start());

        //todo: seal
        this._ready();
    }

    async walkDepsTree(handler) {
        var modules = this.modules,
            handle;

        handle = (() => {
            var memoized = [];

            return function handle(module) {
                if (!_.some(memoized, {module})) {
                    memoized.push({
                        module,
                        handler: function () {
                            var promise = Promise.resolve(handler(module));

                            this.handler = () => promise;

                            return promise;
                        }
                    });
                }

                return _.find(memoized, {module}).handler();
            }
        })();

        async function resolve(module) {
            var reqPromise;

            reqPromise = _.chain(module.requires)
                .map(name => _.find(modules, {name}))
                .map(resolve)
                .value();

            await Promise.all(reqPromise);

            await handle(module);
        }

        await Promise.all(_.map(modules, resolve))
    }

    get() {

    }
}