import {_, $, Vue} from 'vendor';
import {mediator} from 'core';

var Chrome = Vue.extend({
    created: function () {
        this._chrome = void 0;

        /**
         * Listen mediator for provided events and handle only related events for this chrome
         * @param {Object} data
         * @param {String} data.namespace
         * @param {Array} data.events
         * */
        this.syncMediator = function (data) {
            this._syncMediatorData = data;

            _.each(data.events, event => {
                mediator.on(`${data.namespace}:before-${event}`, this._mediatorHandler);
                mediator.on(`${data.namespace}:${event}`, this._mediatorHandler);
            });
        };

        /**
         * Get ID for current Chrome
         * @return {string}
         * */
        this.getControlId = function () {
            throw 'Chrome.getControlId must be overridden';
        };

        /**
         * Get content between start/end fragments (use when VM is `Fragment` type)
         * */
        this.getFragmentChild = function () {
            return $(this._fragmentStart).nextUntil(this._fragmentEnd);
        };

        /**
         * Handle mediator event
         * @private
         * */
        this._mediatorHandler = _.bind(function (placeholder) {
            var args, event, action;

            if (placeholder !== this._chrome) {
                return;
            }

            args = [].slice.apply(arguments, [0]);
            event = args.pop().namespace;
            action = event.match(/:([^:]+?)$/);

            if (!action) {
                throw 'Chrome._mediatorHandler: wrong event format';
            }

            this.$emit(action[1], ...args);

            if (this.$parent) {
                this.$parent.$dispatch(event, this, ...args);
            }
        }, this);

        /**
         * Link Chrome instance to current VM
         * @private
         * */
        this._linkChromeInstance = _.bind(function () {
            var chromes, controlId;

            if (this._chrome) {
                return
            }

            chromes = Sitecore.PageModes.ChromeManager.chromes();
            controlId = this.getControlId();

            this._chrome = _.find(chromes, c => c.type.controlId() === controlId);

            if (!this._chrome) {
                throw `VUEEE: can't find chrome`
            }

            this.$options.name = `${this._chrome.data.displayName} [${this._chrome.type.key()}]`;
        }, this);

        mediator.once('chromeManager:resetChromes', this._linkChromeInstance);
    },

    beforeDestroy: function () {
        // Unsubscribe before this VM destroy for prevent memory leak
        if (this._syncMediatorData) {
            _.each(this._syncMediatorData.events, event => {
                mediator.off(`${this._syncMediatorData.namespace}:before-${event}`, this._mediatorHandler);
                mediator.off(`${this._syncMediatorData.namespace}:${event}`, this._mediatorHandler);
            });
        }
    }
});

Vue.component('ee-chrome', Chrome);

export default Chrome;