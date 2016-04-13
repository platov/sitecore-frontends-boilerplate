import {$, Vue} from 'vendor';

import {promise as corePromise} from 'core';

$(async function () {
    if(window.top !== window) {
        return;
    }

    await corePromise;

    new Vue({
        el: 'body'
    });
});
