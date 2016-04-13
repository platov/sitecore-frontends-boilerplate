import {_} from 'vendor';

export default class Module {
    constructor(data) {
        this.requires = [];

        if (!_.isString(data.name) || data.name === '') {
            throw 'Module name is not defined';
        }

        if (!data.hasOwnProperty('install') || !_.isFunction(data.install)) {
            throw `[module "${data.name}"] "install" method is not defined`;
        }

        if (!data.hasOwnProperty('start') || !_.isFunction(data.start)) {
            throw `[module "${data.name}"] "start" method is not defined`;
        }

        this.name = data.name;
        this.data = data;

        if (_.isArray(data.requires)) {
            this.requires.push(...data.requires)
        } else if (_.isString(data.requires)) {
            this.requires.push(data.requires);
        }
    }

    install() {
        return this.data.install();
    }

    start() {
        var promise;

        promise = Promise.resolve(this.data.start());

        promise.then(() => console.info(`[module "${this.name}"] started`));

        return promise;
    }
}