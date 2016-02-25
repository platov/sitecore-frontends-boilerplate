import {$} from 'libs';

export default {
    name: 'nemetos.ee.editable-background',

    requires: ['nemetos.ee.chrometypes-wrapper'],

    install: function () {

    },

    start: function () {
        $(function () {
            var elems     = $('[style*="background-image"]'),
                propRegex = /(?:background-image): *?url\((.*)\)/;

            elems.each(function () {
                var elem           = $(this),
                    backgroundProp = elem.attr('style'),
                    match, img;

                if (backgroundProp) {
                    match = backgroundProp.match(propRegex)[1];
                }

                // Ensure that has encoded nodes
                if (match.indexOf('&lt;') === -1) {
                    return
                }

                match = $($('<div></div>').html(match).text());
                img = match.filter('img');

                img.css({
                    position: 'absolute',
                    top     : 0,
                    right   : 0,
                    bottom  : 0,
                    left    : 0,
                    opacity : 0
                });


                elem.css({
                    backgroundImage: `url(${img.attr('src')})`,
                    position       : 'relative'
                });

                elem.prepend(match);
            });
        });
    }
};