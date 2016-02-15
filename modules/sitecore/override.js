import {_} from 'libs';

export default function override(key, object, before, after) {
    var native = object[key],
        data = {};

    object[key] = function () {
        if(_.isFunction(before)) {
            before.call(this, data, ...arguments);
        }

        native.apply(this, arguments);

        if(_.isFunction(after)) {
            after.call(this, data, ...arguments);
        }
    };
};