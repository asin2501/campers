function setFooterState(scrollTop) {
    if (scrollTop >= ($('html').height() - window.innerHeight)) {
        $('#footer.hidden-footer').addClass('visible');
    } else {
        $('#footer.hidden-footer').removeClass('visible');
    }
};

function initAnimatedFooter() {
    $('.animated-footer').hover(
        function() {
            $('#footer').addClass('visible');
        },
        function() {
            $('#footer').removeClass('visible');
        });
}

function initPageNav() {
    if ($('#page-nav').length > 0) {

        $('#page-nav').scroolly([{
            from: 'doc-top',
            to: 'doc-top + 100vp - 110px = vp-top',
            minWidth: 1199,
            css: {
                top: '100vh',
                position: 'absolute',
                transform: 'translateY(-100%)'
            }
        }, {
            from: 'doc-top + 100vp - 111px = vp-top',
            to: 'doc-bottom + 10px',
            minWidth: 1199,
            css: {
                top: '58px',
                position: 'fixed',
                transform: 'translateY(0)'
            }
        }])
    }
}

function initMobileMenu() {
    $('#mobile-menu-button').click(function() {
        openMobileMenu();
    });

    $('#paage-nav-button').click(function() {
        openMobilePageNav();
    });
    $('#shadow').click(function() {
        closeMobileMenu();
        closeMobilePageNav();
    })
}

function openMobileMenu() {
    $('#shadow').fadeIn('400');
    $("#main-nav").addClass('showed');
    $("#top-nav").addClass('showed');
    //
    $("#page-nav").find('.mobile-menu-button-wrapper').addClass('closed').removeClass('opened');

}

function closeMobileMenu() {
    $('#shadow').fadeOut('400');
    $("#main-nav").removeClass('showed');
    $("#top-nav").removeClass('showed');
    $("#page-nav").find('.mobile-menu-button-wrapper').addClass('opened').removeClass('closed');
}

function openMobilePageNav() {
    $('#shadow').fadeIn('400');
    $("#page-nav").addClass('opened').removeClass('closed');
}

function closeMobilePageNav() {
    $('#shadow').fadeOut('400');
    $("#page-nav").addClass('closed').removeClass('opened');
}