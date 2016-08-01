import {_, $, Vue} from 'vendor';
import {mediator} from 'core';


export default Vue.component('ee-chrome', {
    name: 'Chrome',

    created: function () {
        this._chrome = void 0;
        this._mediatorSubscribers = [];

        /**
         * Listen mediator for provided events and handle, only related to this chrome, events
         * @param {Object} data
         * @param {String} data.namespace
         * @param {Array} data.events
         * */
        this.syncMediator = function (data) {
            var self = this, events;

            events = _.reduce(data.events, (result, event) => {
                var evBefore = `${data.namespace}:before-${event}`,
                    ev = `${data.namespace}:${event}`;

                result.push(
                    {
                        event: evBefore, handler: (...args) => self._mediatorHandler(...args, evBefore)
                    },
                    {
                        event: ev, handler: (...args) => self._mediatorHandler(...args, ev)
                    }
                );

                return result;
            }, []);

            this._mediatorSubscribers.push(events);

            _.each(events, subscriber => mediator.on(subscriber.event, subscriber.handler));
        };

        /**
         * Get ID for current Chrome
         * @return {string}
         * */
        this.getControlId = function () {
            var $openTag,
                chromeSelector = '.scWebEditInput, code[type="text/sitecore"][kind="open"]';

            if (this._isFragment) {
                $openTag = $(this.getFragmentChild()).filter(chromeSelector);
            } else {
                $openTag = $(this.$el).children(chromeSelector);
            }


            if (!$openTag.length) {
                throw 'VUEEE: Failed to determine own opening ChromeTag';
            }

            return $openTag.attr('id').replace('_edit', '');
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
        this._mediatorHandler = _.bind(function (chrome) {
            var args, event, action;

            if (chrome !== this._chrome) {
                return;
            }

            args = [].slice.apply(arguments, [0]);
            event = args.pop();
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

            this.$emit('chromeAvailable', this._chrome);
        }, this);

        if (!window.Sitecore || !window.Sitecore.WebEditSettings || !window.Sitecore.WebEditSettings.editing) {
            return;
        }

        mediator.once('chromeManager:resetChromes', () => this._linkChromeInstance());

        this.syncMediator({
            namespace: 'chromeControls',
            events: ['renderCommandTag']
        });
    },

    beforeDestroy: function () {
        if (!window.Sitecore || !window.Sitecore.WebEditSettings || !window.Sitecore.WebEditSettings.editing) {
            return;
        }

        // Unsubscribe before this VM destroy for prevent memory leak
        _.chain(this._mediatorSubscribers).flatten().map(subscriber => mediator.removeListener(subscriber.event, subscriber.handler));
    }
});