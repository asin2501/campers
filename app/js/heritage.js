var scrollrVariable = null;

function initHeritAge() {
    if ($('#heritage').length > 0) {


        $('.heritage-nav-inner-wrap').each(function() {
            var value = 'max-height: ' + $(this).height() + 'px;';
            $(this).attr('data-0-center-bottom', value);
        });

        initSpeedhAnchors('.js-speed-anchor');

        initHeritageScrollrLogick();

        $(".heritage-year").stick_in_parent({
            offset_top: 150
        });
    }
}

function initHeritageScrollrLogick() {

    //console.log((getFullScreenWidth() > 1199), (scrollrVariable == null), scrollrVariable, {});

    if ((getFullScreenWidth() > 1199) && (scrollrVariable == null)) {

        scrollrVariable = skrollr.init();

    } else if ((getFullScreenWidth() <= 1199) && (scrollrVariable !== null)) {

        scrollrVariable.destroy();
        scrollrVariable = null;
    }
}