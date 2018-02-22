// Load the IFrame Player API code asynchronously on DOM load
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player = {
    playersList: [],
    playersStatus: [],
    fullVideoSlider: {},
    currentVideoIndex: 0,

    init: function() {

        this.fullVideoSlider.elem = $('.tv-slider', '.js-video-full');

        this.beforeChangeFullVideo = this.beforeChangeFullVideo.bind(this);
        this.openFullVideo = this.openFullVideo.bind(this);
        this.tryPlay = this.tryPlay.bind(this);
        this.stopCurrentYouTubeVideo = this.stopCurrentYouTubeVideo.bind(this);

        this.fullVideoSlider.elem.on('beforeChange', this.beforeChangeFullVideo);

        this.fullVideoSlider.slideList = this.fullVideoSlider.elem.find('.slide');

        var thumList = $('.video-thumbnail'),
            l = thumList.length;

        for (var i = l - 1; i >= 0; i--) {
            var item = $(thumList[i]);
            item.attr('data-slide-number', i);
            item.click(function() {
                player.openFullVideo($(this).attr('data-slide-number'));
            });
        };
        $('.close-full-video').click(this.changeFullVideoVisibility);
        $('.close-full-video').click(this.stopCurrentYouTubeVideo);
        $('.media-tab-nav').find('a').click(this.stopCurrentYouTubeVideo);
    },

    beforeChangeFullVideo: function(event, slick, currentSlide, nextSlide) {

        this.stopCurrentYouTubeVideo();
        this.currentVideoIndex = nextSlide;

        if (this.playersList[this.currentVideoIndex] === undefined) {
            var slide = this.fullVideoSlider.slideList[this.currentVideoIndex],
                videoItem = $(slide).find('.full-video-wrapper');

            this.playersList[this.currentVideoIndex] = new YT.Player(videoItem.attr('id'), {
                videoId: videoItem.attr('data-youtube-video-id'),
            });
        }
    },
    openFullVideo: function(number) {
        var iframe, slide;

        this.fullVideoSlider.elem.slick('slickGoTo', number);
        this.changeFullVideoVisibility();

        slide = $($('.js-video-full').find('.slick-slide')[number]);
        iframe = slide.find('iframe');
        this.playVideo();
    },

    playVideo: function() {
        this.tryPlay(400, 4);
    },

    tryPlay: function(time, n) {
        if (n < 0) {
            return false;
        } else if (this.playersList[this.currentVideoIndex].playVideo === undefined) {
            setTimeout(this.tryPlay, time, time, n - 1);
        } else {
            this.playersList[this.currentVideoIndex].playVideo();
            this.playersStatus[this.currentVideoIndex] = 'played';
        }
    },

    stopCurrentYouTubeVideo: function() {
        var currentPlayer = this.playersList[this.currentVideoIndex];
        if ((currentPlayer !== undefined) && (currentPlayer.pauseVideo !== undefined) && (this.playersStatus[this.currentVideoIndex] === 'played')) {
            currentPlayer.pauseVideo();
        }
    },

    changeFullVideoVisibility: function() {
        $('.js-video-gallery').toggleClass('active');
        $('.js-video-full').toggleClass('active');
    }
};

function onYouTubePlayerAPIReady() {
    if ($('.patriot-tv').length === 0) {
        return false;
    }
    player.init();
}