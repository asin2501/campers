var QueryString = function() {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();

function initTabs() {
    $('a', '.js-tab-control').click(function() {

        var parent = $(this).parents('.js-tab-control'),
            contentAreaSelector = parent.attr('data-content-area');

        $('.js-tab-link-active', parent).removeClass('js-tab-link-active');
        $(this).addClass('js-tab-link-active');

        $('.js-tab-content' + contentAreaSelector).removeClass('js-tab-active');

        contentTab = $($(this).attr('data-content'));
        contentTab.addClass('js-tab-active');

        var colorName = $(this).attr('data-color');

        if (colorName !== undefined) {
            $(this).parents('.range-col-bottom-block').find('.color-name').html(colorName);
        }

        return false;
    })
}


function nearestEntry(num, arr) {

    var tmpArr = arr.map(function(item) {
        return Math.abs(item - num);
    });

    return tmpArr.indexOf(Array.min(tmpArr), tmpArr);
}

function goToPosition(time, position) {
    $('html, body').animate({
        scrollTop: position
    }, time);
};

function addBgToImgParent(imgSelector, parentClass) {
    var src, imgList = $(imgSelector, parentClass);

    for (var i = 0; i < imgList.length; i++) {
        src = $(imgList[i]).attr('src');
        $(imgList[i]).parent().css('background-image', 'url(\'' + src + '\')');
    }
}

function initSmoothAnchors(selector) {
    $(selector).click(function(event) {
        event.preventDefault();
        var url = $(this).attr('href'),
            position = $(url).offset().top,
            time = Math.abs($(url).offset().top - scrollTop) / 5; //not good

        goToPosition(time, position);
    })
}

function initSpeedhAnchors(selector) {
    $(selector).click(function(event) {
        event.preventDefault();
        var url = $(this).attr('href'),
            position = $(url).offset().top;

        $('html, body').scrollTop(position);
    })
}

function getFullScreenWidth() {
    var widthWithoutScrollBar = $("body").width(),
        fullScreenWidth = widthWithoutScrollBar + getScrollBarWidth();

    return fullScreenWidth;
}

function getScrollBarWidth() {
    var scrollbarWidth = function() {
        var a, b, c;
        if (c === undefined) {
            a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
            b = a.children();
            c = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
        }
        return c;
    };
    return scrollbarWidth();
}

Array.max = function(array) {
    return Math.max.apply(Math, array);
};

Array.min = function(array) {
    return Math.min.apply(Math, array);
};