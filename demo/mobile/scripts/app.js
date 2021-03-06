﻿'use strict';
$(window).on('load', function () {
    setTimeout(function () {
        $('#companySection').fadeOut();
        $('#html_verify').show();
        $('.card').addClass('fadeIn animated');
        $('.card').show();
        $('.product-related').fadeIn();
        $('header').fadeIn();
        $('footer').fadeIn();
        $('.card').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.card').removeClass('fadeIn animated');
        })
    }, 2500);
})

function commonLanding(qrType, scanTimes) {
    var $this = this;
    var timeout;
    this.checkQrType = function () {
        switch (qrType) {
            case 1:
                $('#veryfiSms').hide();
                $('#veryfiCheck').hide();
                break;
            case 2:
                $('#veryfiSms').hide();
                break;
            case 3:
                $('#verifyType3').show();
                break;
            case 4:
                $('#verifyType4').show();
                $('#veryfiInfo').hide();
                $('#veryfiSms').hide();
                break;
        }
    };
    this.ChangeMenu = function () {
        $(document).on("click", ".menu-link", function () {
            var element = $(this).attr('data-href'),
                text = $(this).attr('data-text'),
                currentSection = '#' + $('.content-wrapper >section:visible').attr('id');
            $('#backBtn').attr('data-href', currentSection);
            $('#backBtn').attr('data-text', $('.text-display').text());
            $('.content-wrapper > section').hide();
            $(element).show();
            $('.text-display').text(text);
            if (element !== "#html_home") {
                $('#homeText').removeClass();
                if ($('#homeText').hasClass('animated')) {
                    $('#homeText').removeClass('slideOutLeft animated')
                }
                else {
                    $('#homeText').addClass('slideOutLeft animated');
                }
                $('.back-group').addClass('animating slideInRight animated');
                $('.back-group').show();
                $('#homeText').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $('#homeText').hide();
                    $('#homeText').removeClass('slideOutLeft animated');
                });
                $('.back-group').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $('#homeText').removeClass();
                });
            }
            else {
                $('.back-group').addClass('animating');
                $('.back-group').addClass('slideOutRight animated');
                $('#homeText').removeClass().addClass('slideInLeft animated');
                $('#homeText').show();
                $('#homeText').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $('#homeText').removeClass();
                    $('#homeText').show();
                });
                $('.back-group').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $('#homeText').show();
                    $('.back-group').hide();
                    $('.back-group').removeClass('slideOutRight animated animating');
                });

            }
            $('.link-menu').find('a').removeClass('active');
            $('.link-menu').find('a[data-href="' + element + '"]').addClass('active');
        });
    };
    this.verifyType3 = function () {
        $(document).on("click touchstart", "#btn_verify", function () {
            var key = '123456789123', //key valid
                oldKey = '12345678', // need function to check key is duplicate and return oldKey
                isValid = true,
                message = '',
                inputCode = $('#input_verify').val();
            if (inputCode == oldKey) {
                message = 'Mã xác thực bị trùng.';
                isValid = false;
            }
            else if (inputCode == key) {
                message = 'Xác thực thành công.';
            }
            else if (inputCode !== key) {
                message = 'Mã xác thực không đúng.';
                isValid = false;
            }
            //3 class:
            //user is first person verify : first-verify
            //user is sencond person verify: second-verify
            //verify fail : fail-verify
            if (isValid) {
                $('#verify_group').removeClass('first-verify second-verify fail-verify').addClass('first-verify');
            }
            else {
                $('#verify_group').removeClass('first-verify second-verify fail-verify').addClass('fail-verify');
            }
            //if is second verify
            //$('#verify_group').removeClass('first-verify second-verify fail-verify').addClass('second-verify');
            $('.toarst-message').text(message);
            clearTimeout(timeout);
            if (!$('.toarst-block').hasClass('slideInUp animated')) {
                $('.toarst-block').addClass('slideInUp animated');
                $('.toarst-block').show();
                $('.toarst-block').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $('.toarst-block').removeClass('slideInUp animated');
                    timeout = setTimeout(function () {
                        if ($('.toarst-block').is(":visible")) {
                            $this.closeToarst();
                        }
                    }, 2000);
                });
            }

        });
    };
    this.verifyType4 = function () {        
        if (scanTimes !== '' & scanTimes != undefined) {
            if (scanTimes < 1) {
                $('#failMessage').show();
            }
            else {
                $('#succesMessage').show();
            }
        }
    };
    this.veryfiQrCode = function () {
        switch (qrType) {
            case 3:
                $this.verifyType3();
                break;
            case 4:
                $this.verifyType4();
                break;
        }
    }    
    this.initToarst = function () {
        $('.toarst-block').addClass('slideOutDown animated');
        $('.toarst-block').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.toarst-block').removeClass('slideOutDown animated');
            $('.toarst-block').hide();
        })
    };
    this.ToarstCustom = function () {
        $(document).on("click", "#btn_close_toarst", function () {
            $this.closeToarst();
        });
    };
    this.closeToarst = function() {
        $('.toarst-block').addClass('slideOutDown animated');
        $('.toarst-block').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.toarst-block').removeClass('slideOutDown animated');
            $('.toarst-block').hide();
        })
    }
    this.init = function () {
        this.checkQrType();
        this.ChangeMenu();
        this.ToarstCustom();        
        this.veryfiQrCode();
    };
}