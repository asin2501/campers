var tour360 = {};

tour360.imagesUrl = [];
tour360.settings = [];
tour360.showedImg = -1;
tour360.$img = null;




function tour360Init() {

    var tourSection = $('#tour360');


    if (!tourSection.length) {
        return;
    };

    switch (tourSection.attr('data-name')) {

        case 'x1-limited':
            tour360.imgUrlPrefix = "images/tour360-x1-limited/";
            tour360.imageNamesList = ['1.jpg', '2.jpg', '3.jpg', '4.jpg',
                '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg',
                '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg',
                '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg',
                '35.jpg', '36.jpg', '37.jpg', '38.jpg', '39.jpg', '40.jpg',
                '41.jpg', '41.jpg', '42.jpg', '43.jpg', '44.jpg', '45.jpg', '46.jpg', '47.jpg', '48.jpg',
                '49.jpg', '50.jpg', '51.jpg', '52.jpg', '53.jpg', '54.jpg', '55.jpg', '56.jpg', '57.jpg', '58.jpg',
                '59.jpg', '60.jpg', '61.jpg', '62.jpg', '63.jpg', '64.jpg', '65.jpg', '66.jpg', '67.png'
            ];
            break;

        case 'x1-standart':
            tour360.imgUrlPrefix = "images/tour360-x1-standart/";
            tour360.imageNamesList = ['1.jpg', '2.jpg', '3.jpg', '4.jpg',
                '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg',
                '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg',
                '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg',
                '35.jpg', '36.jpg', '37.jpg', '38.jpg', '39.jpg', '40.jpg',
                '41.jpg', '41.jpg', '42.jpg', '43.jpg', '44.jpg', '44.jpg', '45.jpg', '46.jpg', '46.jpg', '47.jpg', '48.jpg',
                '49.jpg', '50.jpg', '51.jpg', '52.jpg', '53.jpg', '54.jpg', '55.jpg', '56.jpg', '57.jpg', '58.jpg',
                '59.jpg', '60.jpg', '61.jpg', '62.jpg', '63.jpg', '64.jpg', '65.jpg', '66.jpg', '67.jpg'
            ];
            break;

    }

    tour360.imageUrlList = tour360.imageNamesList.map(function(item) {
        return tour360.imgUrlPrefix + item;
    });


    var containerHeight = $('#tour360').height(),
        persent = containerHeight / 100 * 0.95,
        end = -$(window).innerHeight(),
        start = 0,
        tmpHtml = '';

    for (var i = 0; i < tour360.imageUrlList.length; i++) {
        tmpHtml += '<img class="img-360-child" src="' + tour360.imageUrlList[i] + '" alt="trailer picture">';
    }

    $('#img-360').append(tmpHtml);

    tour360.$img = $('#tour360').find('img');

    for (var i = 0; i < tour360.imageUrlList.length; i++) {
        if (i == 26) {
            start = Math.floor(end + 1);
            end = Math.floor(start + persent * 10);
        } else if (i == 33) {
            start = Math.floor(end + 1);
            end = Math.floor(start + persent * 10);
        } else if (i == 52) {
            start = Math.floor(end + 1);
            end = Math.floor(start + persent * 10);
        } else if (i == 62) {
            start = Math.floor(end + 1);
            end = Math.floor(start + persent * 10);
        } else {
            start = Math.floor(end + 1);
            end = Math.floor(start + persent * 1);
        }
        settings = {
            start: start,
            end: end
        }
        tour360.settings.push(settings);
    };

    $('#img-360').scroolly([{
        from: 'doc-top',
        to: 'con-top = vp-bottom',
        addClass: 'hidden-right'
    }, {
        from: 'con-top = vp-bottom+1px',
        to: 'con-bottom + 6con',
        removeClass: 'hidden-right hidden-left'
    }, {
        from: 'con-bottom + 6con + 1px',
        to: 'doc-bottom',
        addClass: 'hidden-left'
    }], $('#tour360'));

    $('#description-line-360-second').scroolly([{
        from: 'doc-top',
        to: 'con-top + 23con',
        removeClass: 'showed'
    }, {
        from: 'con-top + 23con + 1px',
        to: 'con-top + 45con',
        addClass: 'showed'
    }, {
        from: 'con-top + 45con + 1px',
        to: 'doc-bottom',
        removeClass: 'showed'
    }], $('#tour360'));

    $('#plus-point-02').scroolly([{
        from: 'con-top + 23con + 1px',
        to: 'con-top + 26con',
        addClass: 'hide',
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
    }], $('#tour360'));

    $('#description-line-360-third').scroolly([{
        from: 'con-top',
        to: 'con-top + 61con',
        removeClass: 'showed'
    }, {
        from: 'con-top + 61con + 1px',
        to: 'con-top + 66con',
        addClass: 'showed'
    }, {
        from: 'con-top + 66con + 1px',
        to: 'doc-bottom',
        removeClass: 'showed'
    }], $('#tour360'));

    $('#description-line-360-fourth').scroolly([{
        from: 'doc-top',
        to: 'con-top + 82con',
        removeClass: 'showed'
    }, {
        from: 'con-top + 82con + 1px',
        to: 'con-top + 86con',
        addClass: 'showed'
    }, {
        from: 'con-top + 86con + 1px',
        to: 'doc-bottom',
        removeClass: 'showed'
    }], $('#tour360'));

    $('#tent-img-1').scroolly([{
        from: 'doc-top',
        to: 'con-top',
        addClass: 'left-side'
    }, {
        from: 'con-top + 3con + 1px',
        to: 'con-top + 55con',
        removeClass: 'right-side left-side'
    }, {
        from: 'con-top + 55con + 1px',
        to: 'doc-bottom',
        addClass: 'right-side'
    }], $('#tent360'));

    $('#tent-img-2').scroolly([{
        from: 'doc-top ',
        to: 'con-top + 50con',
        addClass: 'left-side',
        removeClass: 'right-side'
    }, {
        from: 'con-top + 50con + 1px',
        to: 'con-top + 80con',
        removeClass: 'right-side left-side'
    }, {
        from: 'con-top + 80con + 1px',
        to: 'doc-bottom',
        addClass: 'right-side',
        removeClass: 'left-side'
    }], $('#tent360'));

    $('#tent-description-360').scroolly([{
        from: 'doc-top',
        to: 'con-top + 23con',
        removeClass: 'showed'
    }, {
        from: 'con-top + 23con +1px',
        to: 'con-top + 25con',
        addClass: 'showed'
    }, {
        from: 'con-top + 25con + 1px',
        to: 'doc-bottom',
        removeClass: 'showed'
    }], $('#tent360'));

    $('#tent-description-360-2').scroolly([{
        from: 'dov-top',
        to: 'con-top + 72con',
        removeClass: 'showed'
    }, {
        from: 'con-top +72con +1px',
        to: 'con-top + 74con',
        addClass: 'showed'
    }, {
        from: 'con-top + 74con + 1px',
        to: 'doc-bottom',
        removeClass: 'showed'
    }], $('#tent360'));
}

function tour360ScrollAction(scrollTop) {

    if (!$('.x1-page').length) {
        return;
    };

    if (getFullScreenWidth() > 1199) {

        var relativeOffset = Math.floor(scrollTop - $('#tour360').offset().top);

        if (relativeOffset <= tour360.settings[0].start) {
            i = 0;
        } else if (relativeOffset >= tour360.settings[tour360.settings.length - 1].end) {
            i = tour360.settings.length - 1;
        } else {
            for (var i = 0; i <= tour360.settings.length - 1; i++) {
                if ((relativeOffset >= tour360.settings[i].start) && (relativeOffset <= tour360.settings[i].end)) {
                    break;
                }
            }
        }

        if ((i !== tour360.showedImg)) {
            $(tour360.$img[tour360.showedImg]).css('opacity', '0');
            $(tour360.$img[i]).css('opacity', '1');
            tour360.showedImg = i;
        }
    };
}

var switchObj = {};

switchObj.init = function() {

    var tourSection = $('#tour360');


    if (!tourSection.length) {
        return;
    };

    this.points = [];
    this.currentPos = 0;
    var buttonBlock, tmpPoint;

    buttonBlock = $('#button-block-02');

    tmpPoint = {
        position: $('#tour360').offset().top + 4520,
        button: $(buttonBlock.find('a')[0]),
        tab: $('#tab1')
    }
    switchObj.points[0] = tmpPoint;
    tmpPoint = {
        position: switchObj.points[0].position + 2240,
        button: $(buttonBlock.find('a')[1]),
        tab: $('#tab2')
    }
    switchObj.points[1] = tmpPoint;
    this.lastPos = switchObj.points.length - 1;

    switchObj.points[1].tab.fadeOut();
    buttonBlock.find('a').click(this.changePos);
    $('.switch-arrow').click(this.changePos);
    $('body').bind('scrollDown', this.scrollHandler.bind(this));
    $('body').bind('scrollUp', this.scrollHandler.bind(this));
}

switchObj.changePos = function() {
    if ($(this).hasClass('active')) {
        return false;
    }
    switchObj.points[switchObj.currentPos].tab.fadeOut();
    switchObj.points[switchObj.currentPos].button.removeClass('active');
    if (switchObj.currentPos < switchObj.lastPos) {
        switchObj.currentPos++;
    } else {
        switchObj.currentPos = 0;
    }
    switchObj.points[switchObj.currentPos].button.addClass('active');
    setTimeout(function() {
        switchObj.points[switchObj.currentPos].tab.fadeIn();
    }, 800);
    console.log('zzz');
    goToPosition(1000, switchObj.points[switchObj.currentPos].position);

    return false;
}

switchObj.refresh = function() {
    this.currentPos = 0;
    this.points[1].tab.fadeOut('400');
    this.points[1].button.removeClass('active');
    this.points[this.currentPos].button.addClass('active');
    this.points[this.currentPos].tab.fadeIn('400');
}

switchObj.scrollHandler = function() {
    if (this.currentPos !== 0) {
        this.refresh();
    }
}