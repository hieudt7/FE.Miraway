$(document).ready(function () {
    $(".mobile-menu").click(function () {
        //return $(".mobile-menu").toggleClass("cross");
        return $('body').toggleClass('nav-open');
    });
    //jquery for mobile
    if ($(window).width() < 990) {
        $(document).on('click', function (e) {
            if ($('#navMenu').has(e.target).length === 0 && $('.mobile-menu').has(e.target).length === 0 && $('body').hasClass('nav-open')) {
                $('body').removeClass('nav-open');
            }
        })
    }
        //jquery in desktop
    else {
        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            hover: true, // Activate on hover
            belowOrigin: true, // Displays dropdown below the button
        });
        $(".nav-tabs li").mouseenter(function () {
            $('.hrstalk').css('left', $(this).position().left);
        })
        $('.nav-tabs').mouseleave(function () {
            $('.hrstalk').css('left', $(".nav-tabs li.active").position().left);
        })
    }
});