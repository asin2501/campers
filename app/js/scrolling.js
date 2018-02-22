var scrollDirection = 'down',
    isScrollLocked = false;

$(function() {
    $('html').on('mousewheel', function(event) {
        if ((getFullScreenWidth() < 1200) || (isScrollLocked)) {
            return false;
        }

        if (event.deltaY < 0) {
            $('body').trigger('scrollDown').click(); //click that needed to close the popup 
        } else {
            $('body').trigger('scrollUp').click();
        }
    });
});


function screenScrollPoints(pointsList) {
    this.scrollDownHandler = function() {
        if (!this.specialRuleAction()) {
            return;
        }

        this.currentPosition++;
        if (this.currentPosition === this.points.length) {
            this.currentPosition--;
            return false;
        }

        this.scrollAction();
    };

    this.scrollUpHandler = function() {

        if (!this.specialRuleAction()) {
            return;
        }

        this.currentPosition--;
        if (this.currentPosition === -1) {
            this.currentPosition++;
            return false;
        }

        this.scrollAction();
    };

    this.scrollAction = function() {
        var time, length;
        isScrollLocked = true;
        time = this.points[this.currentPosition].timeToScroll;
        length = this.points[this.currentPosition].offset;
        goToPosition(time, length);
        this.setNavPosition();

        setTimeout(function() {
            isScrollLocked = false;
        }, time);

    }

    this.specialRuleAction = function() {

        if (this.points[this.currentPosition].specialRule == 'super-tourer') {

            var $item = this.points[this.currentPosition].$object,
                value = $item.attr('data-animation-state');

            if (value == 0) {
                isScrollLocked = true;
                if ($item.hasClass('animation')) {
                    $item.addClass('reverse-animation');
                    $item.removeClass('animation');
                } else {
                    $item.addClass('animation');
                    $item.removeClass('reverse-animation');
                }
                setTimeout(function() {
                    isScrollLocked = false;
                }, 500);

                this.points[this.currentPosition].$object.attr('data-animation-state', 1);

                return false;

            } else {
                console.log(value);
                this.points[this.currentPosition].$object.attr('data-animation-state', 0);

                return true;
            }
        }
        return true;
    }

    this.scrollNext = function() {
        $('body').click();
        this.scrollDownHandler();
        return false;
    }

    this.setNavPosition = function() {
        var $link = this.points[this.currentPosition].$link || this.points[this.currentPosition].$linkArea;
        if ($link) {
            this.nav.filter('.active').removeClass('active');
            $link.addClass('active');
            return false;
        }
    }

    this.navClickHandler = function() {
        var length,
            index = scroll.nav.index($(this));
        scroll.currentPosition = $(this).attr('data-sec-number');

        if (getFullScreenWidth() > 1199) {
            length = scroll.points[scroll.currentPosition].offset;
            goToPosition(0, length);
            scroll.setNavPosition();
            $('body').click();
            $('body').trigger('changeSectionEvent');
        }
        return false;
    }


    this.scrollToTop = function() {

        scroll.currentPosition = 0;
        goToPosition(0, 0);
        scroll.setNavPosition();

        return false;
    }

    this.computeCurrentPos = function() {

        var tmpArr = this.points.map(function(item) {
            return Math.abs(item.offset - $(window).scrollTop());
        });

        return tmpArr.indexOf(Array.min(tmpArr), tmpArr);
    }

    this.beforeResize = function() {
        this.initialize();
        goToPosition(0, this.points[this.currentPosition].offset);
    };

    this.initMobileNavLogic = function() {
        this.$mobileNavItems = $('.mp-menu').find('a.smooth-anchor');
        this.mobileNavPoints = [];

        for (var i = 0; i < this.$mobileNavItems.length; i++) {
            this.mobileNavPoints.push($(this.$mobileNavItems.eq(i).attr('href')).offset().top);
        }

        this.mobileScrollHandler();
    }

    this.mobileScrollHandler = function() {

        var i = -1;

        var offsetTop = $(window).scrollTop();



        if (offsetTop < this.mobileNavPoints[0]) {
            i = 0;
        } else if (offsetTop > this.mobileNavPoints[this.mobileNavPoints.length - 1]) {
            i = this.mobileNavPoints.length - 1;
        } else {
            for (var i = 0; i < this.mobileNavPoints.length; i++) {
                if ((offsetTop >= this.mobileNavPoints[i]) && (offsetTop < this.mobileNavPoints[i + 1] - 1)) {
                    console.log(offsetTop, this.mobileNavPoints[i], this.mobileNavPoints[i + 1]);
                    break;
                }
            }
        }


        if (i !== this.mobileNavCurrentItem) {
            this.mobileNavCurrentItem = i;
            this.$mobileNavItems.filter('.active').removeClass('active');
            this.$mobileNavItems.eq(i).addClass('active');
        }

    }

    this.standartScrollTime = 1500;
    this.pointsList = pointsList;
    this.currentPosition = 0;
    this.nav = $('.page-nav').find('a');
    this.pageNavOffsets = [];
    this.points = [];

    this.initialize = function() {
        this.points = [];

        for (var i = 0; i < this.pointsList.length; i++) {
            var item = this.pointsList[i],
                newItem = {};

            if (item.baseOnBefore !== undefined) {
                newItem.offset = this.points[i - 1].offset + item.offset;
            } else if ((item.offset !== undefined) && (item.offset !== undefined)) {
                newItem.offset = item.$object.offset().top + item.offset;
            } else if (item.position !== undefined) {
                newItem.offset = item.position;
            } else {
                newItem.offset = item.$object.offset().top;
            }
            newItem.offset = Math.floor(newItem.offset);
            newItem.$link = item.$link || false;
            newItem.$linkArea = item.$linkArea || false;
            newItem.$object = item.$object || false;
            newItem.specialRule = item.specialRule || false;
            console.log(i, item);
            //console.log(item);
            if (newItem.$link) {
                //console.log('true', newItem.$link);
                newItem.$link.attr('data-sec-number', i);
            }
            this.points.push(newItem);
        };

        var screenHeight = $(window).innerHeight();

        for (var i = 0; i < this.points.length; i++) {

            var timeScale = 1;

            if (this.pointsList[i].timeScale !== undefined) {
                timeScale = this.pointsList[i].timeScale;
            }

            if (i !== 0) {
                this.points[i].timeToScroll = (this.points[i].offset - this.points[i - 1].offset) / screenHeight * this.standartScrollTime * timeScale;
            } else {
                this.points[i].timeToScroll = this.standartScrollTime * timeScale;
            }
            //console.log(this.points[i].timeToScroll);
        };

        this.currentPosition = this.computeCurrentPos();
        this.setNavPosition();
        this.initMobileNavLogic();

    }

    this.initialize();

    $('body').bind('scrollDown', this.scrollDownHandler.bind(this));
    $('body').bind('scrollUp', this.scrollUpHandler.bind(this));

    $(window).resize(this.initMobileNavLogic.bind(this));
    $(window).scroll(this.mobileScrollHandler.bind(this));

    $('.js-scroll-down').click(this.scrollNext.bind(this));
    $('#nav-logo').click(this.scrollToTop.bind(this));
    this.nav.click(this.navClickHandler);
}