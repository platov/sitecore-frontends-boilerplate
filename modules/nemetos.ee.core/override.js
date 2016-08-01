import {_} from 'vendor';

export default function override(key, object, before, after) {
    var native = object[key];

    object[key] = function () {
        var data = {};

        if (_.isFunction(before)) {
            before.call(this, data, ...arguments);
        }

        data.nativeResult = native.apply(this, arguments);

        if (_.isFunction(after)) {
            after.call(this, data, ...arguments);
        }

        return data.nativeResult;
    };
};