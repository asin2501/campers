var rotation360 = {};

rotation360.imagesUrl = [];
rotation360.settings = [];
rotation360.showedImg = -1;
rotation360.$img = null;

function rotation360Init() {

    var tourSection = $('#rotation360');

    if (!tourSection.length) {
        return;
    };

    var containerHeight = tourSection.height(),
        step = 170,
        end = 0,
        start = 0;

    rotation360.$img = tourSection.find('.img-block-360').find('img')

    for (var i = 0; i < rotation360.$img.length; i++) {
        settings = {
            start: start + step * i + 1,
            end: start + step * (i + 1)
        }
        rotation360.settings.push(settings);
    };

    $(window).scroll(rotation360ScrollAction);
    rotation360ScrollAction();

    if (!!$('.js-super-tourer').length) {

        $('#rotation360').scroolly([{
            from: 'doc-top',
            to: 'vp-bottom = el-top',
            css: {
                'z-index': 'auto',
                'position': 'static'
            }
        }, {
            from: 'vp-bottom = el-top + 1px',
            to: 'doc-bottom',
            css: {
                'z-index': '-10000',
                'position': 'relative'
            }
        }]);

        $('.top-block.super-tourer').scroolly([{
            from: 'doc-top',
            to: 'vp-top = doc-top + 100vp',
            css: {
                'z-index': '-1'
            }
        }, {
            from: 'vp-top = doc-top + 100vp + 1px',
            to: 'doc-bottom',
            css: {
                'z-index': 'auto'
            }
        }]);

        $('.img-block-360').scroolly([{
            from: 'con-top',
            to: 'con-bottom',
            onTopIn: function($element, rule) {
                $element.css('transform', 'scale(1)');
                $element.css('opacity', '1');
            },
            onTopOut: function($element, rule) {
                $element.css('transform', 'scale(0.3)');
                $element.css('opacity', '0');
            },
            onBottomIn: function($element, rule) {
                $element.css('transform', 'scale(1)');
                $element.css('opacity', '1');
            }
        }], $('#rotation360'));

        $('#lc200-1').scroolly([{
            from: 'doc-top',
            to: 'con-top + 100px',
            removeClass: 'showed'
        }, {
            from: 'con-top + 101px',
            to: 'con-top + 2660px',
            addClass: 'showed'
        }, {
            from: 'con-top + 2661px',
            to: 'doc-bottom',
            removeClass: 'showed'
        }], $('#rotation360'));


        $('#lc79-1').scroolly([{
            from: 'doc-top',
            to: 'con-top + 100px',
            removeClass: 'showed'
        }, {
            from: 'con-top + 101px',
            to: 'con-top + 2960px',
            addClass: 'showed'
        }, {
            from: 'con-top + 2961px',
            to: 'doc-bottom + 10px',
            removeClass: 'showed'
        }], $('#rotation360'));


        $('#lc79-02-tab1').scroolly([{
            from: 'con-top + 100px',
            to: 'con-top + 200px',
            //removeClass: 'showed',
            onTopIn: function($element, rule) {
                $element.fadeIn();
            },
            onTopOut: function($element, rule) {
                $element.fadeOut();
            },
            onBottomIn: function($element, rule) {
                $element.fadeIn();
            },
            onBottomOut: function($element, rule) {
                $element.fadeOut();
            }
        }], $('#rotation360'));

        $('#lc79-03-tab1').scroolly([{ /// может быг с табами тут
            from: 'con-top + 3521px',
            to: 'con-top + 3600px',
            onTopIn: function($element, rule) {
                $element.fadeIn();
            },
            onTopOut: function($element, rule) {
                $element.fadeOut(200);
            },
            onBottomIn: function($element, rule) {
                $element.fadeIn();
            },
            onBottomOut: function($element, rule) {
                $element.fadeOut(200);
            }
        }], $('#rotation360'));

        $('#lc79-2').scroolly([{
            from: 'doc-top',
            to: 'con-top + 3400px',
            removeClass: 'showed'
        }, {
            from: 'con-top + 3401px',
            to: 'con-top + 5060px',
            addClass: 'showed'
        }, {
            from: 'con-top + 5061px',
            to: 'doc-bottom+10px',
            removeClass: 'showed'
        }], $('#rotation360'));

        $('#lc200-2').scroolly([{
            from: 'doc-top',
            to: 'con-top + 2750px',
            removeClass: 'showed'
        }, {
            from: 'con-top + 2750px',
            to: 'con-top + 4500px',
            addClass: 'showed'
        }, {
            from: 'con-top + 4501px',
            to: 'doc-bottom+10px',
            removeClass: 'showed'
        }], $('#rotation360'));
    }
}

$(function() {
    rotation360Init();
})

function rotation360ScrollAction() {
    var scrollTop = $(window).scrollTop();

    if (getFullScreenWidth() > 1199) {

        var relativeOffset = Math.floor(scrollTop - $('#rotation360').offset().top);


        if (relativeOffset <= rotation360.settings[0].start) {
            i = 0;
        } else if (relativeOffset >= rotation360.settings[rotation360.settings.length - 1].end) {
            i = rotation360.settings.length - 1;
        } else {
            for (var i = 0; i <= rotation360.settings.length - 1; i++) {
                if ((relativeOffset >= rotation360.settings[i].start) && (relativeOffset <= rotation360.settings[i].end)) {
                    break;
                }
            }
        }

        if ((i !== rotation360.showedImg)) {
            $(rotation360.$img[rotation360.showedImg]).css('opacity', '0');
            $(rotation360.$img[i]).css('opacity', '1');
            rotation360.showedImg = i;
        }
    };


}