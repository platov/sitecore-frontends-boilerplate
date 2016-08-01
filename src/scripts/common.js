import {$, Vue} from 'vendor';

import {promise as corePromise} from 'core';

$(async function () {
    if(window.top !== window) {
        return;
    }

    await corePromise;

    require('../components');

    new Vue({
        el: 'body'
    });
});
