function scrollSwitch(points, arrowLeft, arrowRight) {

    this.init = function(points, arrowLeft, arrowRight) {

        var tmpPoint;

        this.points = [];
        this.oldSettings = points;
        this.currentPos = 0;


        for (var i = 0; i < points.length; i++) {
            tmpPoint = {
                position: $(points[i].point.selector).offset().top + points[i].point.offset,
                button: points[i].button,
                tab: points[i].tab,
            }
            this.points.push(tmpPoint);
            tmpPoint.tab.hide();
        }

        this.lastPos = this.points.length - 1;

        var pos = nearestEntry($(window).scrollTop(), this.points.map(function(item) {
            return item.position;
        }));

        arrowLeft.click(this.prev.bind(this));
        arrowRight.click(this.next.bind(this));
        $('body').bind('scrollDown', this.scrollHandler.bind(this));
        $('body').bind('scrollUp', this.scrollHandler.bind(this));

        $(window).resize(this.refresh.bind(this));
        $('body').bind('changeSectionEvent', this.scrollHandler.bind(this));
        //$('body').bind('changeSectionEvent', this.scrollHandler.bind(this));
    }

    this.refresh = function(points) {
        for (var i = 0; i < points.length; i++) {
            this.points[i].position = $(points.point.selector).offset().top + points.point.offset;
        }
    }

    this.next = function() {
        var newPos;

        if (this.currentPos < this.lastPos) {
            newPos = this.currentPos + 1;
        } else {
            newPos = 0;
        }
        this.goToPos(newPos);
        return false;
    }

    this.prev = function() {

        var newPos;

        if (this.currentPos > 0) {
            newPos = this.currentPos - 1;
        } else {
            newPos = this.lastPos;
            console.log(newPos);
        }

        this.goToPos(newPos);
        return false;
    }

    this.goToPos = function(num) {
        $('body').trigger('click');

        this.hideCurrent();
        this.currentPos = num;

        var that = this;

        setTimeout(function() {
            if (that.currentPos == num) {
                that.showTab(num);
            }
        }, 900);
        //console.log('bbb');
        goToPosition(1000, this.points[this.currentPos].position);

        return false;
    }

    this.refresh = function() {
        console.log('m1');
        this.hideCurrent();
        this.currentPos = 0;
        this.showCurrent();
    }

    this.scrollHandler = function() {
        if (this.currentPos !== 0) {
            this.refresh();
        }
    }

    this.hideCurrent = function() {
        this.points[this.currentPos].tab.fadeOut('300');
        //this.points[this.currentPos].button.removeClass('active');
    }

    this.showCurrent = function() {
        //this.points[this.currentPos].button.addClass('active');
        this.points[this.currentPos].tab.fadeIn('300');
    }

    this.showTab = function(num) {
        //this.points[this.currentPos].button.addClass('active');
        this.points[num].tab.fadeIn('300');
    }

    this.init(points, arrowLeft, arrowRight);
}