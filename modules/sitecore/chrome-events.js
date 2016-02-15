import mediator from './mediator';

_.each(Sitecore.PageModes.ChromeTypes, function (Chrome) {
    override('handleMessage', Chrome.prototype, function (message, params) {
        mediator.emit(message, this.chrome, params);
    });
});

function override(key, object, handler) {
    var native = object[key];

    object[key] = function () {
        native.apply(this, arguments);
        handler.apply(this, arguments);
    };
}