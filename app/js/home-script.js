// lightbox.option({
//     'disableScrolling': true,
//     'albumLabel': ''
// })
var isHome = false;

function pointInit() {
    $('.plus-point').click(function() {
        var number = $(this).attr('data-slide-number'),
            slickSelector = $(this).attr('data-slick-selector');

        $(slickSelector).find('[data-slick-index="' + number + '"]').click();

        return false;
    });
}


function initCalculator() {
    $('#get-calc').click(function() {
        $('#flcButM').click();
        return false;
    })
}


function initAnimationOnHomepage() {
    if (!!$('.homepage').length) {

        $('.home-top-block').scroolly([{
            from: 'doc-top',
            to: 'el-top + 300px',
            addClass: 'animation'
        }])

        $('.camper-trailers-section').scroolly([{
            from: 'el-bottom - 50px',
            to: 'el-bottom + 300px',
            addClass: 'animation'
        }])

        $('.home-st').scroolly([{
            from: 'el-bottom - 50px',
            to: 'el-bottom + 300px',
            addClass: 'animation'
        }])

        $('.patriot-in-media').scroolly([{
            from: 'el-bottom - 50px',
            to: 'el-bottom + 300px',
            addClass: 'animation'
        }])

        $('.home-heritage').scroolly([{
            from: 'el-bottom',
            to: 'el-bottom + 400px',
            addClass: 'animation'
        }])
    }
}



function bgZindexFix() {
    if (!!$('.x1-page').length) {

        $('#top-block .top-block-inner-wrapper').scroolly([{
            from: 'con-top',
            to: 'con-bottom + 10px = vp-top',
            css: {
                display: 'block'
            }
        }, {
            from: 'con-bottom + 11px = vp-top',
            to: 'doc-bottom = vp-bottom',
            css: {
                display: 'none'
            }
        }], $('#top-block'));
    };
}

function iniInteractiveScrollOnHome() {
    if (!!$('.x1-page').length) {

        setTimeout(function() {
            if ((!wasScrolled) && (scrollTop === 0)) {
                $('.anchor-to-bottom').click();
            }
        }, 30 * 1000)
    };
}


// function setVerticalPoints() {

//     if (!isHome) {
//         return;
//     };

//     var verticalBlocksList = $('.js-vertical-block'),
//         l = verticalBlocksList.length;

//     verticalPoints = [0];

//     for (var i = 0; i < l; i++) {
//         verticalPoints.push($(verticalBlocksList[i]).offset().top);
//     };

// }

// function setVerticalPaginationState() {

//     if (!isHome) {
//         return;
//     };

//     var offset = scrollTop + screenHeight / 3;
//     for (var i = 0; i < verticalPoints.length - 1; i++) {
//         if ((offset >= verticalPoints[i]) && (offset <= verticalPoints[i + 1])) {
//             break;
//         }
//     };
//     if (i !== currentVerticalblock) {
//         var linksList = $('a', '.page-nav');
//         $(linksList[currentVerticalblock]).removeClass('active');
//         currentVerticalblock = i;
//         $(linksList[currentVerticalblock]).addClass('active');
//     }
// }

function initScrollParallax(selectorsList) {
    if (!!$('.x1-page').length) {

        window.parallaxObjArr = [];
        var parallaxObj;

        for (var i = selectorsList.length - 1; i >= 0; i--) {
            var item = selectorsList[i];

            parallaxObj = {};
            parallaxObj.$img = $(item.imgSelector); //$("#scroll-parallax-img");
            parallaxObj.$container = $(item.imgWrapper); //$("#scroll-parallax-img-wrapper");
            parallaxObj.relativeOffset = 0;
            parallaxObj.topPos = parallaxObj.$container.offset().top;
            parallaxObjArr.push(parallaxObj);
        };

        runScrollParallax(scrollTop);

        $(window).scroll(function() {
            runScrollParallax(scrollTop);
        });
    };

}

function runScrollParallax(scrollTop) {

    var offset = 0;

    if (getFullScreenWidth() > 1199) {


        for (var i = parallaxObjArr.length - 1; i >= 0; i--) {
            var item = parallaxObjArr[i];
            offset = 0;

            item.relativeOffset = scrollTop - item.topPos;
            offset = item.relativeOffset / 2;
            item.$img.css('transform', 'translateY(' + offset + 'px)');
        };
    } else {
        for (var i = parallaxObjArr.length - 1; i >= 0; i--) {
            parallaxObjArr[i].$img.css('transform', 'none');
        }
    }
}

function initVideoOnHomePage() {
    if (!!('#play-btn').length) {

        window.homePlayer = null;

        var idVideo = $('#homevideo').attr('data-video-id');

        homePlayer = new YT.Player('homevideo', {
            videoId: idVideo
        });


        $('#play-btn').click(function() {
            openVideoPopUpOnHomePage();
        });

        $('#scroll-paralax-img-wrapper').find('.shadow').click(function() {
            closeVideoPopUpOnHomePage();
        });

        $(window).on('scroll', closeVideoPopUpOnHomePage);

        $('#scroll-paralax-img-wrapper').scroolly([{
            from: 'el-top - 1el',
            to: 'el-bottom',

            onTopIn: function($element, rule) {
                if ((!$element.find('.shadow').hasClass('was-autoplay-aimation')) && (getFullScreenWidth() > 1199)) {
                    openVideoPopUpOnHomePage();
                }
            },
            onTopOut: function($element, rule) {
                closeVideoPopUpOnHomePage();
            }
        }]);
    };

}

function openVideoPopUpOnHomePage() {
    var parentBlock = $('#scroll-paralax-img-wrapper').find('.shadow');

    parentBlock.addClass('showed');
    homePlayer.playVideo();
    if (getFullScreenWidth() < 1199) {
        $('body').css('overflow-y', 'hidden');
        $('html, body').animate({
            scrollTop: $('#scroll-paralax-img-wrapper').offset().top
        }, 300)
    }
}

function closeVideoPopUpOnHomePage() {
    var parentBlock = $('#scroll-paralax-img-wrapper').find('.shadow');
    if (parentBlock.hasClass('showed')) {
        parentBlock.removeClass('showed').addClass('was-autoplay-aimation');
        homePlayer.pauseVideo();
    }
    if (getFullScreenWidth() < 1199) {
        $('body').css('overflow-y', 'auto');
    }
}

// function initVideoLightning() {
//     if (!isHome) {
//         return;
//     };

//     var videoButtons = $('.js-video-btn').parents('section');

//     for (var i = videoButtons.length - 1; i >= 0; i--) {

//         $(videoButtons[i]).jqueryVideoLightning({
//             id: $(videoButtons[i]).attr('data-video-id'),
//             autoplay: 1,
//             fadeIn: 0,
//             bdColor: '#000',
//             bdOpacity: 0.8,
//             glow: 20,
//             glowColor: '#000',
//             controls: 1,
//             showinfo: 0,
//             color: "white"
//         });
//     };
// }

function chassisAnimation() {
    if (!!('.x1-page').length) {

        $('#chassis').scroolly([{
            from: 'con-top - 1con',
            to: 'con-top + 1con',

            onTopIn: function($element, rule) {

                $element.addClass('animation');
                $element.removeClass('reverse-animation');
            },
            onTopOut: function($element, rule) {
                $element.addClass('reverse-animation');
                $element.removeClass('animation');
            },
            onBottomIn: function($element, rule) {

                $element.addClass('animation');
                $element.removeClass('reverse-animation');
            },
            onBottomOut: function($element, rule) {

                $element.addClass('reverse-animation');
                $element.removeClass('animation');
            }
        }]);

        $('#feature-options').scroolly([{
            from: 'con-top - 1con',
            to: 'con-bottom + 1con',

            onTopIn: function($element, rule) {
                $element.addClass('animation');
                $element.removeClass('reverse-animation');
            },
            onTopOut: function($element, rule) {
                $element.addClass('reverse-animation');
                $element.removeClass('animation');
            },
            onBottomIn: function($element, rule) {

                $element.addClass('animation');
                $element.removeClass('reverse-animation');
            },
            onBottomOut: function($element, rule) {

                $element.addClass('reverse-animation');
                $element.removeClass('animation');
            }
        }]);

        $('#awards').scroolly([{
            from: 'con-top - 80con',
            to: 'con-top + 30con',

            onTopIn: function($element, rule) {
                $element.addClass('animation');
                $element.removeClass('reverse-animation');
            },
            onTopOut: function($element, rule) {
                $element.addClass('reverse-animation');
                $element.removeClass('animation');
            },
            onBottomIn: function($element, rule) {

                $element.addClass('animation');
                $element.removeClass('reverse-animation');
            },
            onBottomOut: function($element, rule) {
                $element.addClass('reverse-animation');
                $element.removeClass('animation');
            }
        }]);

    };
}


function initJBox() {

    if (!$('.jbox-point').length) {
        return;
    };


    window.modalList = [];
    window.currentModalIndex = 0;

    var pointList = $('.jbox-point'),
        options = {
            attach: null,
            title: '',
            content: '',
            trigger: 'click',
            closeOnClick: 'body',
            width: 'auto',
            animation: 'zoomIn',
            outside: 'x',
            position: {
                x: 'right',
                y: 'center'
            }
        };
    pointList.click(function(event) {
        $('body').click();
    });
    l = pointList.length;


    for (var i = 0; i < l; i++) {

        var item = $(pointList[i]),
            content = $(item.attr('data-content')).html();

        options.content = content;

        if (item.hasClass('js-tab-and-box')) {
            //options.target = '#' + item.attr('id');
            options.target = item;
            item.attr('data-jbox-number', i);
        } else {
            options.attach = item;
        }
        options.onOpen = function() {
            $('.jBox-content').find('.close-jbox').click(function() {
                $('body').click();
                return false;
            })
        }
        modalList.push(new jBox('Tooltip', options));
    };
}

function lightBoxFix() {
    $('.lb-outerContainer').prepend($('.lb-caption'));
}

function linkingPlusItems() {

    if (!!$('.j-box-link').length) {

        $('.j-box-link').click(
            function() {
                $($(this).attr('href')).click();
                return false;
            }).hover(
            function() {
                $($(this).attr('href')).addClass('hover');
            },
            function() {
                $($(this).attr('href')).removeClass('hover');
            }
        )
    };
}