function commonFunction() {
    var videoThumb = '.youtube-thumb';
    this.generateVideoThumb = function () {
        $(videoThumb).each(function () {
            var vidSrc = $(this).attr('data-src'),
               vidHeight = $(this).attr('data-height'),
               youtube_video_id = vidSrc.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
            if (youtube_video_id.length == 11) {
                var video_thumbnail = $('<img class="yt-thumb" src="//img.youtube.com/vi/' + youtube_video_id + '/0.jpg">');
                $(this).prepend(video_thumbnail);
            }
        });
    };
    this.playYoutubeVideo = function () {
        $(document).on('click', videoThumb, function () {
            var vidSrc = $(this).attr('data-src'),
                vidHeight = $(this).attr('data-height'),
                video_thumbnail = $('<iframe width="100%" height="' + vidHeight + '" src="' + vidSrc + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');
            $('.yt-thumb').hide();
            $(this).append(video_thumbnail);
            $('.ytp-button').hide();
        })
    };
    this.initYoutubeVideo = function () {
        this.generateVideoThumb();
        this.playYoutubeVideo();
    };
    this.slickMobile = function () {
        $('.qr-tab').slick({
            infinite: false,
            speed: 300,
            slidesToShow: 8,
            slidesToScroll: 8,
            responsive: [
              {
                  breakpoint: 767,
                  settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3
                  }
              },
              {
                  breakpoint: 321,
                  settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                  }
              }
            ]
        });
        //reset menu
        //$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        //    $('.nav-tabs li').removeClass('active');
        //    $(e.target).parent().addClass('active');
        //});
    };
}