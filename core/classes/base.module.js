import {_} from 'libs';

export default class Module {
    constructor(data) {
        this.requires = [];

        if (!_.isString(data.name) || data.name === '') {
            throw 'Module name is not defined';
        }

        this.name = data.name;

        if (_.isArray(data.requires)) {
            this.requires.push(...data.requires)
        } else if (_.isString(data.requires)) {
            this.requires.push(data.requires);
        }

        this._install = data.install;
        this._start = data.start;
    }

    install() {
        var promise;

        promise = Promise.resolve(
            _.isFunction(this._install)
                ? this._install()
                : void 0
        );

        this.install = function () {
            return promise;
        };


        return promise;
    }

    start() {
        var promise;

        promise = Promise.resolve(
            _.isFunction(this._start)
                ? this._start()
                : void 0
        );

        promise.then(() => {
            console.info(`Module "${this.name}" has been started!`);
        });

        this.start = function () {
            return promise;
        };


        return promise;
    }
}