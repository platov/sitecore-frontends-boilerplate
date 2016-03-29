import {$, Vue} from 'libs';

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
