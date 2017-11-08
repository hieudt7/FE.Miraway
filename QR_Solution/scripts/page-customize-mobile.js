if (window.screen.width < 1024) {
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
    });
};