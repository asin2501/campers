var scrollTop = $('window').scrollTop(),

    screenHeight, screenWidth, htmlHeight, verticalPoints, currentVerticalblock,
    wasScrolled = false,
    scroll = null,
    resizeChecking = false,
    oldWindowHeight,
    eventsMap,
    destributorsMap;


function initData() {
    scrollTop = $(window).scrollTop();

    screenHeight = window.innerHeight;
    screenWidth = window.innerWidth;
    htmlHeight = $('html').height();
}

function setCompareState() {
    if (!!$('.compare').length) {
        var item = QueryString.item;

        if (item !== undefined) {

            switch (item) {
                // case 'x1-le':
                //     break;
                // case 'x1-standart':
                //     break;
                case 'x2':
                    console.log();
                    $('#left-compare-slider').slick('slickGoTo', 1);
                    break;
                case 'th600':
                    $('#left-compare-slider').slick('slickGoTo', 3);
                    break;
                case 'lc79':
                    $('.button-group').find('a').eq(1).click();
                    break;
                case 'lc200':
                    $('.button-group').find('a').eq(1).click();
                    break;
            }
        }
    }
}

function initTabAndBoxFeature() {
    $('.js-tab-and-box').click(function() {

        var num = $(this).attr('data-tab'),
            event = new CustomEvent('changingTab', {
                'detail': num
            });


        event.initEvent('changingTab', true, true);
        document.dispatchEvent(event);

        return false;
    })

    $(document).on('changingTab', function(event) {
        var num = event.originalEvent.detail - 1,
            $parent = $('.suspension'),
            jBoxNum;

        $('body').click();
        $parent.find('.feature-list').find('a').removeClass('js-tab-link-active').eq(num).addClass('js-tab-link-active');
        $parent.find('.js-tab-content').removeClass('js-tab-active').eq(num).addClass('js-tab-active');

        if (getFullScreenWidth() > 1199) {
            jBoxNum = $parent.find('.plus-point').eq(num).attr('data-jbox-number');
            modalList[jBoxNum].open();
        }
    });

}

function leadThePackInit() {
    if (!!$('.background-image').length) {
        leadThePackBgSize();

        $(window).resize(function() {
            setTimeout(function() {
                leadThePackBgSize();
            }, 300)
        });
    }
}

function leadThePackBgSize() {

    var img = $($('#lead-the-pack-slider').find('img')[0]),
        parent = $('#super-tourer-07'),
        bg = parent.find('.background-image'),
        percent,
        x = img.offset().top,
        y = parent.offset().top,
        percentCoef = 0.8,
        H = parent.innerHeight(),
        h = img.innerHeight();

    percent = ((x - y + percentCoef * h) / H) * 100;

    bg.css('top', percent + '%');

}


function resizeReloadLogick() {
    if ((!resizeChecking) && (!!$('.resize-on-reload').length)) {
        resizeChecking = true;
        setTimeout(function() {

            if ((getFullScreenWidth() > 1199) && (oldWindowHeight !== $(window).innerHeight()) && (oldWindowHeight !== undefined)) {
                scroll.beforeResize();
                location.reload();

            }
            resizeChecking = false;
        }, 300);
    }

}

function initSuperTourAnimations() {
    var parent = $('.super-tourers');
    $('h6', parent).removeClass('hidden');
    $('.tourers-col', parent).removeClass('hidden');

    setTimeout(function() {
        $('.product-header', parent).addClass('visible');
    }, 1000);
}

function startCamperTrailersAnimations() {
    var time = 800;

    if ($('#animated-camper-trailers').length = 0) {
        return
    }

    setTimeout(function() {
        $('.hide-bottom').removeClass('hide-bottom');

    }, time / 2)

    setTimeout(function() {
        $('.hide-right').removeClass('hide-right');
        $('.hide-left').removeClass('hide-left');
    }, time * 1.2);

    setTimeout(function() {
        $('.select').removeClass('hidden');
        $('.arrow-slider').removeClass('hidden');
    }, time * 2);

    setTimeout(function() {
        $('.slick-current .product-header').removeClass('hidden');
    }, time * 3);
}

function initSplitPhoto() {

    var splitBlock = $("#split-photo");

    if (!!splitBlock.length) {
        splitBlock.twentytwenty();
    }
}

function stretchEventsItems() {
    if ($('.events-slider').length > 0) {
        setTimeout(function() { //need timeot because resizing not fast 


            var maxHeight = 0,
                itemsList = $('.event-item', '.events-slider')
            l = itemsList.length;

            itemsList.css('height', 'auto');

            for (var i = itemsList.length - 1; i >= 0; i--) {
                var height = $(itemsList[i]).innerHeight();

                if ($(itemsList[i]).hasClass('opened')) {
                    continue;
                }

                if (maxHeight <= height) {
                    maxHeight = height;
                }
            };
            itemsList.css('height', maxHeight);
        }, 100)
    }
}

function hidePreloader() {

    $('#preloader').addClass('end');

    setTimeout(function() {
        $('#preloader').fadeOut('600', function() {
            $('#preloader').remove();
        });
    }, 1400);
}

function popupFix() {

    $('#popup-fix').find('a').click(function() {
        $('body').click();
    });

}

function swichCompareColumn() {
    $('.switch-button').click(function() {
        $('.compare-tab').toggleClass('shifted');
        $('.compare-column').toggleClass('active');
        $('.switch-button').toggleClass('hidden');
    });
}


function initEvents() {

    $(function() {

        if ($('.homepage').length > 0) {
            isHome = true;
        }
        initData();
        initMobileMenu();
        initTabs();
        initSliders();
        initAnimatedFooter();
        setFooterState(scrollTop);
        initPageNav();
        iniInteractiveScrollOnHome();
        bgZindexFix();
        tour360Init();
        tour360ScrollAction(scrollTop);
        swichCompareColumn();
        initTabAndBoxFeature();

        var menu = new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('trigger'));

        addBgToImgParent('img', '.background');
        chassisAnimation();
        popupFix();
        initScrollParallax([{
            imgSelector: '#scroll-paralax-img',
            imgWrapper: '#scroll-paralax-img-wrapper'
        }, {
            imgSelector: '#scroll-paralax-img-2',
            imgWrapper: '#scroll-paralax-img-wrapper-2'
        }]);
        pointInit();
        initJBox();
        linkingPlusItems();
        switchObj.init();


        initEventsBox();

        if (!!$('.lc79-page').length) {
            scroll = new screenScrollPoints([{
                position: 0,
                $linkArea: $($('.page-nav').find('a')[0]),
            }, {
                $object: $('.standart-features'),
                $link: $($('.page-nav').find('a')[0]),
                specialRule: 'super-tourer'
            }, {
                $object: $('.overview-super-tourer'),
                $linkArea: $($('.page-nav').find('a')[0])
            }, {
                $object: $('#rotation360'),
                $link: $($('.page-nav').find('a')[1]),
                offset: 120
            }, {
                $object: $('#rotation360'),
                $link: $($('.page-nav').find('a')[2]),
                offset: 3550,
                timeScale: 0.4
            }, {
                $object: $('.suspension'),
                $link: $($('.page-nav').find('a')[3]),
                timeScale: 0.4
            }, {
                $object: $('#super-tourer-07'),
                $link: $($('.page-nav').find('a')[4])
            }, {
                $object: $('#super-tourer-08'),
                $link: $($('.page-nav').find('a')[5])
            }, {
                $object: $('#specifications'),
                $link: $($('.page-nav').find('a')[6])
            }]);

            var switch1 = new scrollSwitch([{
                point: {
                    selector: '#rotation360',
                    offset: 120
                },
                tab: $('#lc79-02-tab1')
            }, {
                point: {
                    selector: '#rotation360',
                    offset: 1750
                },
                tab: $('#lc79-02-tab2')
            }, {
                point: {
                    selector: '#rotation360',
                    offset: 2750
                },
                tab: $('#lc79-02-tab3')
            }], $('#switcher1-arrow-left'), $('#switcher1-arrow-right'));

            var switch2 = new scrollSwitch([{
                point: {
                    selector: '#rotation360',
                    offset: 3550
                },
                tab: $('#lc79-03-tab1')
            }, {
                point: {
                    selector: '#rotation360',
                    offset: 5000
                },
                tab: $('#lc79-03-tab2')
            }], $('#switcher2-arrow-left'), $('#switcher2-arrow-right'));

        }

        if (!!$('.lc200-page').length) {

            scroll = new screenScrollPoints([{
                position: 0,
                $linkArea: $($('.page-nav').find('a')[0])
            }, {
                $object: $('.standart-features'),
                $link: $($('.page-nav').find('a')[0]),
                // $callback: function(){
                //     if()
                // }
            }, {
                $object: $('.overview-super-tourer'),
                $linkArea: $($('.page-nav').find('a')[0])
            }, {
                $object: $('#rotation360'),
                $link: $($('.page-nav').find('a')[1]),
                offset: 120
            }, {
                $object: $('#rotation360'),
                $link: $($('.page-nav').find('a')[2]),
                offset: 2750,
                timeScale: 0.4
            }, {

                $object: $('.suspension'),
                $link: $($('.page-nav').find('a')[3]),
                timeScale: 0.4
            }, {
                $object: $('#super-tourer-07'),
                $link: $($('.page-nav').find('a')[4]),
            }, {
                $object: $('#super-tourer-08'),
                $link: $($('.page-nav').find('a')[5]),
            }, {
                $object: $('#specifications'),
                $link: $($('.page-nav').find('a')[6]),
            }]);

            var switch1 = new scrollSwitch([{
                point: {
                    selector: '#rotation360',
                    offset: 120
                },
                tab: $('#lc79-02-tab1')
            }, {
                point: {
                    selector: '#rotation360',
                    offset: 1750
                },
                tab: $('#lc79-02-tab2')
            }, {
                point: {
                    selector: '#rotation360',
                    offset: 2650
                },
                tab: $('#lc79-02-tab3')
            }], $('#switcher1-arrow-left'), $('#switcher1-arrow-right'));

            var switch2 = new scrollSwitch([{
                point: {
                    selector: '#rotation360',
                    offset: 2750
                },
                tab: $('#lc79-03-tab1')
            }, {
                point: {
                    selector: '#rotation360',
                    offset: 4500
                },
                tab: $('#lc79-03-tab2')
            }], $('#switcher2-arrow-left'), $('#switcher2-arrow-right'));
        }

        if (!!$('#x1-page').length) {
            scroll = new screenScrollPoints([{
                position: 0,
                $linkArea: $($('.page-nav').find('a')[0])
            }, {
                $object: $('.before-tour'),
                $linkArea: $($('.page-nav').find('a')[0])
            }, {
                $object: $('.awards'),
                $link: $($('.page-nav').find('a')[0])
            }, {
                $object: $('#tour360'),
                offset: 4520,
                timeScale: 0.4,
                $link: $($('.page-nav').find('a')[1])
            }, {
                baseOnBefore: true,
                offset: 3640 + 3140,
                timeScale: 0.4,
                $link: $($('.page-nav').find('a')[2])
            }, {
                baseOnBefore: true,
                offset: 4040,
                timeScale: 0.5,
                $link: $($('.page-nav').find('a')[3])
            }, {
                baseOnBefore: true,
                offset: 3900,
                timeScale: 0.5,
                $link: $($('.page-nav').find('a')[4])
            }, {
                baseOnBefore: true,
                offset: 2400,
                timeScale: 0.5,
                $link: $($('.page-nav').find('a')[5])
            }, {
                $object: $('.chassis'),
                timeScale: 1,
                $link: $($('.page-nav').find('a')[6])
            }, {
                $object: $('.feature-options'),
                timeScale: 0.5,
                $link: $($('.page-nav').find('a')[7])
            }, {
                $object: $('.overview'),
                $link: $($('.page-nav').find('a')[8])
            }, {
                $object: $('.shop-block'),
                $link: $($('.page-nav').find('a')[9])
            }]);
        };



        // $('#pictures').scroolly([{
        //     from: 'con-top - 1con',
        //     to: 'con-bottom + 1con',

        //     onTopIn: function($element, rule) {
        //         $element.addClass('animation');
        //         $element.removeClass('reverse-animation');
        //     },
        //     onTopOut: function($element, rule) {
        //         $element.addClass('reverse-animation');
        //         $element.removeClass('animation');
        //     },
        //     onBottomIn: function($element, rule) {

        //         $element.addClass('animation');
        //         $element.removeClass('reverse-animation');
        //     },
        //     onBottomOut: function($element, rule) {

        //         $element.addClass('reverse-animation');
        //         $element.removeClass('animation');
        //     }
        // }], $('.standart-features'));

        oldWindowHeight = $(window).innerHeight();
        initCalculator();
        initAnimationOnHomepage();
        setCompareState();
    });

    $(window).resize(function() {
        resizeReloadLogick();
        stretchEventsItems();
        initData();
        initHeritageScrollrLogick();

    });

    $(window).load(function() {
        initData();
        lightBoxFix();
        stretchEventsItems();

        if ($('#map').length > 0) {
            eventsMap = new lazyMap({
                mapId: 'map',
                markerIconURL: 'images/map-marker.png'
            });
        }
        if ($('#distributors-map').length > 0) {
            destributorsMap = new lazyMap({
                mapId: 'distributors-map',
                markerIconURL: 'images/distributors-locaion-icon.png',
                getDataFromHtml: true
                //theme: 'gray'
            });
        }
        initSuperTourAnimations();
        startCamperTrailersAnimations();
        hidePreloader();
        initVideoOnHomePage();
        initHeritAge();
        initSmoothAnchors('.smooth-anchor');
        initSplitPhoto();
        leadThePackInit();

    });

    $(window).scroll(function() {
        wasScrolled = true;
        scrollTop = $(window).scrollTop();
        setFooterState(scrollTop);
        tour360ScrollAction(scrollTop);
    });
}

initEvents();