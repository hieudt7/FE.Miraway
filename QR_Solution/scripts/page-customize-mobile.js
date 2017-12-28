if ($(window).width() < 1024) {
    $('#uploadPopup').attr('class', '').addClass('panel-edit');
    $('.menu-list').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
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
                  slidesToShow: 1,
                  slidesToScroll: 1
              }
          }
        ]
    });
    //reset menu
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $('.nav-tabs li').removeClass('active');
        $(e.target).parent().addClass('active');
        $('.panel-active').removeClass('panel-active');
        $('.right-pannel').removeClass('panel-open');
        //if logo tab auto resize
        if ($(e.target).attr('href') == '#logo') {
            $('.right-pannel').addClass('panel-open');
        }
    });
    $('.svg-tab').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.panel-active').removeClass('panel-active');
            $('.right-pannel').removeClass('panel-open');
        }
        else {
            $('.svg-tab').removeClass('active');
            $(this).addClass('active');
            $('.right-pannel').addClass('panel-open');
            var element = '#' + $(this).attr('data-panel');
            $('.panel-active').removeClass('panel-active');
            $(element).addClass('panel-active');
        }
    });
};