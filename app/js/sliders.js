var trailersSliderSliding;

function initSliders() {
    $('.trailers-slider').slick({
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        arrows: true,
        prevArrow: '<button type="button" class="arrow-slider arrow-green-left hidden"></button>',
        nextArrow: '<button type="button" class="arrow-slider arrow-green-right hidden"></button>',
        responsive: [{
            breakpoint: 1199,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }]
    });
    initTrailersSlider();

    $('.footer-slider').slick({
        dots: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev standart-arrow slick-arrow"></button>',
        nextArrow: '<button type="button" class="slick-next standart-arrow slick-arrow"></button>',
        responsive: [{
            breakpoint: 1199,
            settings: {
                slidesToShow: 4,
            }
        }, {
            breakpoint: 800,
            settings: {
                slidesToShow: 3,
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            }
        }]
    });

    $('#home-st-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev standart-arrow slick-arrow"></button>',
        nextArrow: '<button type="button" class="slick-next standart-arrow slick-arrow"></button>',
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 1
            }
        }]
    })


    $('.line-slider').slick({
        dots: false,
        speed: 1000,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="arrow-slider line-arrow prev"></button>',
        nextArrow: '<button type="button" class="arrow-slider line-arrow next"></button>',
        responsive: [{
            breakpoint: 1199,
            settings: {
                speed: 700,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 600,
            settings: {
                speed: 350,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    $('#lead-the-pack-slider').slick({
        dots: false,
        infinite: true
    });


    $('#feature-list-slider').slick({
        dots: false,
        infinite: true,
        centerMode: true,
        slidesToShow: 10,
        slidesToScroll: 1,
        vertical: true,
        arrows: false,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 6
            }
        }]
    })

    $('.range-slider').slick({
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '<button type="button" class="arrow-slider arrow-white-left"></button>',
        nextArrow: '<button type="button" class="arrow-slider arrow-white-right"></button>',
        responsive: [{
            breakpoint: 1199,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }]
    });

    $('.tv-slider').slick({
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="arrow-slider arrow-white-left"></button>',
        nextArrow: '<button type="button" class="arrow-slider arrow-white-right"></button>',
    });


    $('.floating-arrows').stick_in_parent();
    $('.floating-arrows').click(function() {
        if ($(this).hasClass('arrow-white-right')) {
            $('#thumbnails-slider').slick('slickNext');
        } else {
            $('#thumbnails-slider').slick('slickPrev');
        }
        return false;
    });

    $('.floating-arrows').filter('.arrow-white-left').hide();

    $('#thumbnails-slider').on('afterChange', function(e, slick, currentSlide) {
        $('.floating-arrows').show();
        if (currentSlide === 0) {
            $('.floating-arrows').filter('.arrow-white-left').hide();
        } else if (currentSlide === slick.$slides.length - 1) {
            $('.floating-arrows').filter('.arrow-white-right').hide();
        }
    });

    $('.super-tourer-slider').slick({
        dots: false,
        arrows: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="arrow-slider arrow-green-left"></button>',
        nextArrow: '<button type="button" class="arrow-slider arrow-green-right"></button>',
        responsive: [{
            breakpoint: 1199,
            settings: {
                slidesToShow: 1,
            }
        }]
    });

    $('.compare-slider').slick({
        dots: false,
        arrows: false,
        speed: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false
        //fade: true

    });

    //Home-page Camper-slider
    $('.home-ct').slick({
        dots: false,
        arrows: false,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipe: true,
        responsive: [{
            breakpoint: 1199,
            settings: {
                autoplay: true,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev standart-arrow slick-arrow"></button>',
                nextArrow: '<button type="button" class="slick-next standart-arrow slick-arrow"></button>',
                speed: 300,
                slidesToShow: 1
            }
        }]
        //fade: true

    });

    //Home-page Patriot-in-Media slider
    $('.home-pm-slider').slick({
        dots: false,
        arrows: true,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev standart-arrow slick-arrow"></button>',
        nextArrow: '<button type="button" class="slick-next standart-arrow slick-arrow"></button>',
        swipe: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                autoplay: true,
                speed: 300,
                slidesToShow: 2
            }

        }, {
            breakpoint: 768,
            settings: {
                speed: 300,
                slidesToShow: 1
            }
        }]
        //fade: true

    });


    $('.compare-control-button').click(function() {
        var slider = $(this).parents('.compare-slider'),
            index,
            step;
        if ($(this).hasClass('next-item')) {
            if (slider.attr('id') === 'left-compare-slider') {
                if ($('#right-compare-slider').find('.slick-current').attr('data-model') === slider.find('.slick-current + .compare-slide').attr('data-model')) {
                    step = 2;
                } else {
                    step = 1;
                }
            } else {
                if ($('#left-compare-slider').find('.slick-current').attr('data-model') === slider.find('.slick-current + .compare-slide').attr('data-model')) {
                    step = 2;
                } else {
                    step = 1;
                }
            }
            index = parseInt(slider.find('.slick-current').attr('data-slick-index'), 10) + step;
            slider.slick('slickGoTo', index);
        } else {

            var slikIndex = parseInt(slider.find('.slick-current').attr('data-slick-index')) - 1;

            if (slider.attr('id') === 'left-compare-slider') {
                if ($('#right-compare-slider').find('.slick-current').attr('data-model') === slider.find('[data-slick-index="' + slikIndex + '"]').attr('data-model')) {
                    step = -2;
                } else {
                    step = -1;
                }
            } else {
                if ($('#left-compare-slider').find('.slick-current').attr('data-model') === slider.find('[data-slick-index="' + slikIndex + '"]').attr('data-model')) {
                    step = -2;
                } else {
                    step = -1;
                }
            }
            index = parseInt(slider.find('.slick-current').attr('data-slick-index'), 10) + step;
            index === -2 ? index + slider.find('.compare-slide').length() : 'nothing';
            slider.slick('slickGoTo', index);


        }
    });

    // $('#left-compare-slider').on('afterChange', function(event, slick, currentSlide) {
    //     console.log($(slick.$slides[currentSlide]).attr('data-model'), $('#right-compare-slider').find('.slick-current').attr('data-model'));
    //     if ($(slick.$slides[currentSlide]).attr('data-model') === $('#right-compare-slider').find('.slick-current').attr('data-model')) {
    //         console.log('sss');
    //         $('#left-compare-slider').slick('slickNext');
    //     }
    // });

    // $('#right-compare-slider').on('afterChange', function(event, slick, currentSlide) {
    // $('#left-compare-slider').slick('slickUnfilter');
    // $('#left-compare-slider').slick('slickFilter', ':not(.' + $(slick.$slides[currentSlide]).attr('data-model') + ')');
    // });

    // $('#left-compare-slider').slick('slickGoTo', '0');

    // $('#right-compare-slider').slick('slickGoTo', '0'); 


    $('#vertical-rounded-slider').slick({
        dots: false,
        speed: 1000,
        arrows: true,
        vertical: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        verticalSwiping: true,
        prevArrow: '<button type="button" class="arrow-slider arrow-prev"></button>',
        nextArrow: '<button type="button" class="arrow-slider arrow-next"></button>',
        responsive: [{
            breakpoint: 1199,
            settings: {
                vertical: false,
                speed: 500,
                verticalSwiping: false,
                centerMode: false,
                slidesToShow: 3
            }
        }, {
            breakpoint: 991,
            settings: {
                vertical: false,
                speed: 350,
                verticalSwiping: false,
                centerMode: false,
                slidesToShow: 1
            }
        }]
    });

    $('.mobile-tour-slider').slick({
        dots: true,
        speed: 500,
        infinite: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="arrow-slider arrow-black-left"></button>',
        nextArrow: '<button type="button" class="arrow-slider arrow-black-right"></button>'
    });



    $('#vertical-rounded-slider').on('afterChange', function(event, slick, currentSlide) {
        changeActiveitemOnFeatureList(null, '#feature-list-06', currentSlide);
    });

    $('#vertical-rounded-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        if (!!$('#feature-list-slider').length) {
            $('#feature-list-slider').slick('slickGoTo', nextSlide);
        }
    });

    $('#feature-list-06').find('.arrow-top').click(function() {
        $('#vertical-rounded-slider').slick('slickPrev');
        return false;
    });

    $('#feature-list-06').find('.arrow-bottom').click(function() {
        $('#vertical-rounded-slider').slick('slickNext');
        return false;
    });

    $('.switch-slider').click(switchVerticalSlider);

    addBgToImgParent('img', '.video-thumbnail');

    initEventsSlider();
}

function changeActiveitemOnFeatureList(e, idList, number) {
    if (e !== null) {
        $(this).parents('.feature-list').find('.active').removeClass('active');
        $(this).addClass('active');

        return false;
    }


    var list = $(idList).find('a');
    list.filter('.active').removeClass('active');
    $(list[number + 1]).addClass('active');
}


function initEventsSlider() {
    var eventSlider = $('.events-slider');

    if (eventSlider.length == 0) {
        return;
    }

    eventSlider.slick({
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        draggable: false,
        prevArrow: '<button type="button" class="arrow-slider arrow-white-left"></button>',
        nextArrow: '<button type="button" class="arrow-slider arrow-white-right"></button>'
    });

    eventSlider.on('beforeChange', function(events, slick, currentSlide, nextSlide) {
        changeActiveEventsTab(nextSlide)
        closeEventsBox();
    });

    var allEventsTabs = $('a', '.events-season-nav');

    for (var i = allEventsTabs.length - 1; i >= 0; i--) {
        $(allEventsTabs[i]).attr('data-slide', i);
    };

    allEventsTabs.click(function() {
        $('.events-slider').slick('slickGoTo', $(this).attr('data-slide'));
    });
}

function changeActiveEventsTab(n) {
    var allTabs = $('a', '.events-season-nav');

    allTabs.removeClass('active');
    $(allTabs[n]).addClass('active');

}

function initTrailersSlider() {
    var buttons, categoryClass, slideList, slideNumber, slider;

    slider = $('.trailers-slider');

    if (slider.length == 0) {
        return;
    }

    buttons = $('#trailers-slider-control').find('button').click(goToCategoryInTrailersSlider);

    for (var i = 0; i <= buttons.length - 1; i++) {
        var button = $(buttons[i]);

        categoryClass = '.' + button.attr('data-category');
        slideList = $('.trailers-slide' + categoryClass);

        for (var c = 0; c <= slideList.length - 1; c++) {
            var item = $(slideList[c]);

            if (item.attr('data-slick-index') > -1) {
                slideNumber = item.attr('data-slick-index');
                break;
            }
        };
        button.attr('data-slide-number', slideNumber);
        button.click(goToCategoryInTrailersSlider);
    }

    slider.on('afterChange', chengeActiveTabAfterSlickChange);
}

function chengeActiveTabAfterSlickChange(event, slick, currentSlide, nextSlide) {
    var currentSlideElem, currentCat, activeButton;

    currentSlideElem = $($('.trailers-slider').find('.trailers-slide')[currentSlide]);
    currentCat = currentSlideElem.attr('data-category');
    activeButton = $('.double-line-button.active');

    if (!activeButton.hasClass(currentCat)) {
        activeButton.removeClass('active');
        $('.double-line-button.' + currentCat).addClass('active');
    }
}

function goToCategoryInTrailersSlider() {
    if ($(this).hasClass('active') || (trailersSliderSliding)) {
        return;
    }

    trailersSliderSliding = true;

    var slideNumber = $(this).attr('data-slide-number');

    $('.trailers-slider').slick('slickGoTo', slideNumber);
    $('.double-line-button.active').removeClass('active');
    $(this).addClass('active');

    setTimeout(function() {
        trailersSliderSliding = false;
    }, 700)
}

function switchVerticalSlider() {
    var slider, slideNumber;

    slider = $($(this).attr('data-slider-id'));
    slideNumber = $(this).attr('data-slide-number');
    slider.slick('slickGoTo', slideNumber);

    return false;
}