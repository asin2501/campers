var paralaxSettingsList = [{
    selector: '.paralax-section-bg',
    coefX: 0.00,
    coefY: 0.00,
    index: 3,
    bgMod: true
}, {
    selector: '.paralax-section-car',
    coefX: -0.01,
    coefY: 0.00,
    index: 8,
    bgMod: true
}, {
    selector: '.paralax-section-drops-1',
    coefX: 0.025,
    coefY: 0.03,
    index: 9,
    bgMod: true,
    scaleMod: true,
    opacityMod: true
}, {
    selector: '.paralax-section-drops-2',
    coefX: 0.02,
    coefY: 0.02,
    index: 5,
    bgMod: false,
    opacityMod: true
}, {
    selector: '.paralax-section-drops-3',
    coefX: 0.03,
    coefY: 0.03,
    index: 11,
    bgMod: false,
    scaleMod: true,
    opacityMod: true

}];


window.paralax = {

    halfScreenWidth: $(window).innerWidth() / 2,
    halfScreenHeight: $(window).innerHeight() / 2,
    objects: null,
    positionTop: null,
    positionBottom: null,
    isActive: true,
    scrollScale: 0,
    oldX: 0,
    oldY: 0,
    oldScrollTop: 0,
    isScrol: 0,

    paralaxInit: function(paralaxSettingsList, parentSelector) {
        this.objects = this.setParalaxSettings(paralaxSettingsList);
        this.parent = $(parentSelector);
        this.setPositionValue();
        this.initBgMod();

        //binding methods of object
        this.resizeHandler = this.setPositionValue.bind(this);
        this.mouseMoveHandler = this.mouseMove.bind(this);
        this.scrollHandler = this.scrollMove.bind(this);

        //$(window).resize(this.mouseMoveHandler);
        $(window).bind('mousemove', this.mouseMoveHandler);
        $(window).resize(this.resizeHandler);
        $(window).scroll(this.scrollHandler);


        $(window).resize(
            function() {
                this.halfScreenWidth = $(window).innerWidth() / 2;
                this.halfScreenHeight = $(window).innerHeight() / 2;
            }
        );
    },


    setParalaxSettings: function(paralaxSettingsList) {
        var finalSettings = [];

        for (var i = paralaxSettingsList.length - 1; i >= 0; i--) {

            var item = paralaxSettingsList[i],
                tmp = {};

            tmp.selector = item.selector;
            tmp.elem = $(item.selector).first();

            if (item.coefX === undefined) {
                tmp.coefX = 0.1;
            } else {
                tmp.coefX = item.coefX;
            }
            if (item.coefY === undefined) {
                tmp.coefY = 0.1;
            } else {
                tmp.coefY = item.coefY;
            }

            if (item.opacityMod === undefined) {
                tmp.opacityMod = false;
            } else {
                tmp.opacityMod = item.opacityMod;
            }
            if (item.bgMod === undefined) {
                tmp.bgMod = false;
            } else {
                tmp.bgMod = item.bgMod;
            }

            if (item.scaleMod === undefined) {
                tmp.scaleMod = false;
            } else {
                tmp.scaleMod = item.scaleMod;
            }

            if (item.index === undefined) {
                tmp.index = i + 1;
            } else {
                tmp.index = item.index;

            }
            tmp.elem.css('z-index', tmp.index);
            finalSettings[i] = tmp;
        };

        return finalSettings;
    },


    initBgMod: function(bgMod) {
        for (var i = this.objects.length - 1; i >= 0; i--) {
            if ((this.objects[i].bgMod !== undefined) && (this.objects[i].bgMod !== false)) {
                var item = this.objects[i],
                    percentOffset = Math.abs(item.coefX) * 100 / 2 + 0.1;
                item.elem.css('left', -percentOffset + '%').css('right', -percentOffset + '%');
            }
        }
    },

    mouseMove: function(e) {
        if (this.isScrol !== 0) {
            return false;
        }
        this.moveBlocks(e.pageX, e.pageY);
        this.oldX = e.pageX;
        this.oldY = e.pageY;
    },

    scrollMove: function() {
        if (this.isVisible($(window).scrollTop())) {
            this.isScrol++;
            var scrollTop = $(window).scrollTop();

            //$(window).unbind('mousemove', this.mouseMoveHandler);

            var opacityValue = (this.halfScreenHeight * 2 - scrollTop) / (this.halfScreenHeight * 2);
            opacityValue = opacityValue * opacityValue;

            for (var i = this.objects.length - 1; i >= 0; i--) {
                var item = this.objects[i];
                item.elem.addClass('transition');

                if (item.opacityMod) {

                    item.elem.css('opacity', opacityValue);
                }
            }


            this.scrollScale = (scrollTop / (this.halfScreenHeight * 2) * 1.5);
            this.moveBlocks(this.oldX, this.oldY + scrollTop);

            for (var i = this.objects.length - 1; i >= 0; i--) {
                var item = this.objects[i];
                item.elem.removeClass('transition');
            }
            this.oldScrollTop = scrollTop;
            setTimeout(function() {
                paralax.isScrol--;
            }, 300);
        }
    },

    moveBlocks: function(x, y) {
        if (this.isVisible($(window).scrollTop())) {
            var offsetX = x - this.halfScreenWidth,
                offsetY = y - this.halfScreenHeight,
                scale = '';


            for (var i = this.objects.length - 1; i >= 0; i--) {
                var item = this.objects[i],
                    valueX = Math.floor(offsetX * item.coefX),
                    valueY = Math.floor(offsetY * item.coefY);

                if (item.scaleMod === true) {
                    var scaleValue = 1 + this.scrollScale + (y / this.halfScreenHeight) / 16;
                    scale = 'scale(' + scaleValue + ')';
                } else {
                    scale = '';
                }

                item.elem.css('transform', 'translateX(' + valueX + 'px) ' + 'translateY(' + valueY + 'px) ' + scale);
            };
        }
    },


    isVisible: function(scrollTop) {
        if ((scrollTop >= this.positionTop) && (scrollTop <= this.positionBottom)) {
            return true;
        } else {
            return false;
        }
    },


    setPositionValue: function() {

        AROUND_SPACE = 0.1;
        //position top
        this.positionTop = this.parent.offset().top - this.parent.innerHeight() - (this.parent.innerHeight() * AROUND_SPACE);
        //position bottom
        this.positionBottom = this.parent.offset().top + this.parent.innerHeight() + (this.parent.innerHeight() * AROUND_SPACE);
    }
}