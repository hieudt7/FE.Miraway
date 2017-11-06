var qrId = window.location.href.split('?id=')[1],
         common = new CommonFunction(),
         bgColor, dataColor, eye_l_in, eye_l_out, eye_r_in, eye_r_out, eye_b_in, eye_b_out, opacityValue = 100,imageSize;
function getColorValue() {
    bgColor = $('#bgColorInput input').val(),
    dataColor = $('#dataColorInput input').val(),
    eye_l_in = $('#eye1In input').val(),
    eye_l_out = $('#eye1Out input').val(),
    eye_r_in = $('#eye2In input').val(),
    eye_r_out = $('#eye2Out input').val(),
    eye_b_in = $('#eye3In input').val(),
    eye_b_out = $('#eye3Out input').val();
}

//$.ajax({
//    url: 'http://mirascan.vn:32000/api/qrcode-api/get?id=' + qrId,
//    type: 'GET',
//    success: function (result) {
//        if (result.status == "success") {
//            imageSize = result.data.size
//            common.generateQRCodeData(result.data.size - 8, result.data.path_base)
//        } else {
//            console.log('load errr');
//            return;
//        }
//    },
//    error: function (xhr, ajaxOptions, thrownError) {
//        console.log('something error')
//    }
//});
var basse = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAjBJREFUeNrs3d1uwyAMBtB42vu/sndfCVEbWLL1cLkFRToy4oubn6/rwwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP90fFcOjuZJcjA/D59PBQAAAAAAAAD7ckB1n43i/Bj8Pw/mFEsAAAAAAADIAb0RzZwQgz5BHjqfCgAAAAAAAAAAAAAAAAAAAAD29QO6o9oHUAEAAAAAAADA83JALh5fzQOpAgAAAAAAAIDbc0D3Pv7ZfQGjPBAqAAAAAAAAADgx4oknSxUAAAAAAAAA/Jl+wOz6/nrz7+/2D3bmCEsAAAAAAADIAb0x259f/x/Fff8qzlMBAAAAAAAAwNKlfevg1d/7d78nSD8AAAAAAAAA+P1+QHf/X80LK88fWgIAAAAAAEA/YM/kLPYPZvv5u/NDP8ASAAAAAAAAt/UDruZ+Xb0fIJq5QQUAAAAAAAAA6zlg9/f/Zu8VWv3ugAoAAAAAAAAA9vcDuvf1db8zePJ9Q5YAAAAAAACQA3qj+/v/63Gjvr5+gCUAAAAAAACemwNW+wgxyAPXJBdU+w0qAAAAAAAAALg/B1TfI5TNfoPnBQAAAAAAAIDzOSA39weqzw3s+H6xJQAAAAAAAOSA3nX96r5f3c9zsd+gAgAAAAAAAABDBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4gPETAAD//2eFWxU8bUANAAAAAElFTkSuQmCC';
common.generateQRCodeData(21, basse)
imageSize = 21
//colorpicker
$('#bgColorInput').colorpicker({
    color: '#ffffff'
})
.on('changeColor', function (e) {
    getColorValue();
    bgColor = e.value,
    $('#bgColor').css('background', bgColor);
    if (bgColor !== null && bgColor !== '' && bgColor !== undefined) {
        common.checkQRContrast(bgColor, dataColor, eye_l_in, eye_l_out, eye_r_in, eye_r_out, eye_b_in, eye_b_out);
    }
});
//picker for data
$('#dataColorInput').colorpicker({
    color: '#000000'
})
.on('changeColor', function (e) {
    $('#qr-mira >.data-pattern').children().css('fill', e.value);
    getColorValue();
    dataColor = e.value;
    if (dataColor !== null && dataColor !== '' && dataColor !== undefined) {
        common.checkQRContrast(bgColor, dataColor, eye_l_in, eye_l_out, eye_r_in, eye_r_out, eye_b_in, eye_b_out);
    }
});
//picker for eye
$('.eye-picker').colorpicker({
    color: '#000001',
    format: 'hex'
})
.on('changeColor', function (e) {
    var index = $(e.currentTarget).find('input').attr('data-eye'),
                colorVal = e.value,
    external = true;
    if ($(e.currentTarget).find('input').attr('data-eye-fill') !== "ex") {
        external = false;
    }
    var $element = $(".right-pannel").find('.box-' + index);
    if (external) {
        $element.children(':nth-child(1)').css('fill', colorVal);
    }
    else {
        $element.children(':nth-child(2)').css('fill', colorVal);
    }
    //check color
    getColorValue();
    var badEyeyContrast = false,
        currentContrast = false,
        badDataContrast = false;
    if (colorVal == null || colorVal == '' || colorVal == undefined || bgColor == null || bgColor == '' || bgColor == undefined) {
        return;
    }
    console.log('run step 2');
    var preventColor = '#ffffff',
        preventColor2 = '#ffff00',
        contrastNumber = 15;
    $('.eye-picke').not(e.currentTarget).find('input').each(function () {
        var smiliar = common.SimilarColor($(this).val(), preventColor);
        var smiliar2 = common.SimilarColor($(this).val(), preventColor2);
        if (smiliar > 0.95 || smiliar2 > 0.95) {
            console.log(smiliar)
            console.log(smiliar2)
            badEyeyContrast = true;
            console.log('1');
            return false;
        }
        else {
            var colorContrast = common.checkContrast($(this).val(), bgColor);
            if (colorContrast < contrastNumber) {
                badEyeyContrast = true;
                console.log('2');
                return false;
            }
        }
    });
    var smiliar = common.SimilarColor(colorVal, preventColor);
    var smiliar2 = common.SimilarColor(colorVal, preventColor2);
    if (smiliar > 0.95 || smiliar2 > 0.95) {
        currentContrast = true;
    }
    else {
        var eyeContrast = common.checkContrast(colorVal, bgColor);
        if (eyeContrast < contrastNumber) {
            currentContrast = true;
        }
    }
    dataContrast = common.checkContrast(dataColor, bgColor);
    if (dataContrast < contrastNumber) {
        badDataContrast = true;
    }
    if (badEyeyContrast || currentContrast || badDataContrast) {
        $('#errorQR').show();
        $('#bgColor').addClass('errQR');
    }
    else {
        $('#errorQR').hide();
        $('#bgColor').removeClass('errQR');
    }
});
//change data partern
$('.data-partern-shape').on('click', function () {
    var orgiginLocalhost = '',
        originQrData = "./images/newcreate/svg/patterns/",
        dataName = $(this).attr('data-name'),
        pattarnColor = $('#dataColorInput input').val(),
        file = ".svg";

    //check type of data
    var dataType = $(this).attr('data-type');
    if (dataType !== null && dataType !== undefined && dataType !== '') {
        var groupData = dataName.split(',');
        var countCheck = 0;
        $("#orgigin").html('<object type="image/svg+xml" data="' + orgiginLocalhost + originQrData + groupData[0] + file + '" width="100%" height="100%" id="dataShapeObj1"></object><object type="image/svg+xml" data="' + orgiginLocalhost + originQrData + groupData[1] + file + '" width="100%" height="100%" id="dataShapeObj2"></object>');
        $('#orgigin #dataShapeObj1').load(function () {
            countCheck++;
            var shape = common.getObjectChild('#dataShapeObj1').html();
            $('#qr-mira >.data-pattern g:nth-child(2n+1)').html(shape);
            //set color
            if (countCheck == 2) {
                $('#qr-mira >.data-pattern').children().css('fill', pattarnColor);
                $('#orgigin object').remove();
            }
        })
        $('#orgigin #dataShapeObj2').load(function () {
            countCheck++;
            var shape = common.getObjectChild('#dataShapeObj2').html();
            $('#qr-mira >.data-pattern g:nth-child(2n)').html(shape);
            if (countCheck == 2) {
                $('#qr-mira >.data-pattern').children().css('fill', pattarnColor);
                $('#orgigin').html('');
            }
        })

    }
    else {
        $("#orgigin").html('<object type="image/svg+xml" data="' + orgiginLocalhost + originQrData + dataName + file + '" width="100%" height="100%" id="dataShapeObj"></object>');
        $('#orgigin #dataShapeObj').load(function () {
            common.loadDataShape('#dataShapeObj');
            $('#qr-mira >.data-pattern').children().css('fill', pattarnColor);
            $('#orgigin').html('');
        })
    }

})
//change eye shape
$('.eye-shape').on('click', function () {
    //set eye color
    $("#orgigin").html('<object type="image/svg+xml" data="' + $(this).find('img').attr('src') + '" width="100%" height="100%" id="svgShape"></object>');
    $('#orgigin object').load(function () {
        $(".svg-eye").html('');
        // var $svgElement = $($('#svgShape')[0].contentDocument.children);
        common.loadEyeShape('#svgShape')
        // $('#svgShape')
        common.fillEyeColor('.box-1', $('#eye1In').val(), $('#eye1Out').val());
        common.fillEyeColor('.box-2', $('#eye2In').val(), $('#eye2Out').val());
        common.fillEyeColor('.box-3', $('#eye3In').val(), $('#eye3Out').val());
        $('#orgigin object').remove();
    })
});
//onchange frame
common.FillterByCategory(1);
$('#frameCat').on('change', function () {
    common.FillterByCategory($(this).val());
})
//--frame tab ---
//filter template
$('.masonry-layout .item > a').on('click', function () {
    var frameSrc = $(this).find('img').attr('src').split('fr_')[0] + $(this).find('img').attr('alt');
    $('.qr-iframe').html('<img class="img-frame" src="' + frameSrc + '">');
    $('.right-pannel').addClass('qr-frame-bg');
    $('body').addClass('bg-frame');
    $('.qr-iframe .img-frame').on('load', function () {
        var boxHeight = $('.qr-iframe .img-frame').height() + 30;
        $('.qr-image').height(boxHeight);
    })
})
//edit frame
$('#fr-edit').on('click', function () {
    $('.tab-menu').addClass('disabled-block');
    if ($('#outline-check').prop('checked')) {
        $('#bgColor').addClass('outline');
    }
    else {
        $('#bgColor').removeClass('outline');
    }
    $('.btn-action').hide();
    $('#fr-cancel').fadeIn();
    $('#fr-edit').hide();
    $('#fr-save').removeClass('disabled');
    $('.fr-option').removeClass('disabled-frame');
    $('#opacity-val').val(opacityValue)
    $("#bgColor").addClass('fr-box');
    $("#bgColor").draggable({
        containment: ".qr-image",
        scroll: false,
        cursor: "move",
        cancel: '.ui-rotatable-handle'
    });
    var rotateRad = 0;
    if ($('#bgColor').attr('style') != undefined) {
        rotateRad = $('#bgColor').attr('style').split('rotate(')[1];
        if (rotateRad != undefined) {
            rotateRad = rotateRad.split('rad')[0];
        }
        else {
            rotateRad = '0';
        }
    }

    $("#bgColor").resizable({
        aspectRatio: true,
    }).rotatable({
        wheelRotate: false,
        radians: parseFloat(rotateRad),
    });

});
//cancel frame
$('#fr-cancel').on('click', function () {
    $('.tab-menu').removeClass('disabled-block');
    $('#bgColor').removeClass('outline');
    $('#bgColor').resizable("destroy");
    $('#bgColor').draggable("destroy");
    $('#bgColor').rotatable("destroy");
    $('.btn-action').show();
    $('#fr-edit').fadeIn();
    $('#fr-cancel').hide();
    $('#fr-save').addClass('disabled');
    $('.fr-option').addClass('disabled-frame');
    var currentBGColor = $('#bgColor').css('background-color');
    $('#bgColor').removeAttr('style');
    $('#bgColor').css('background', currentBGColor);
    $("#bgColor").removeClass('fr-box');
});
//done edit
$('#fr-save').on('click', function () {
    $('.tab-menu').removeClass('disabled-block');
    $('#bgColor').removeClass('outline');
    $('#bgColor').resizable("destroy");
    $('#bgColor').draggable("destroy");
    $('#bgColor').rotatable("destroy");
    $('#fr-edit').fadeIn();
    $('#fr-cancel').hide();
    $('.btn-action').show();
    $('#fr-edit').removeClass('disabled');
    $('#fr-save').addClass('disabled');
    $('.fr-option').addClass('disabled-frame');
});
//call slider bar
var slider = document.getElementById('opacityRange');
noUiSlider.create(slider, {
    start: [0, 100],
    connect: true,
    step: 1,
    range: {
        'min': 0,
        'max': 100
    },
    format: wNumb({
        decimals: 0
    })
});
slider.noUiSlider.on('update', function () {
    var opacityArr = slider.noUiSlider.get();
    opacityValue = opacityArr[1];
    $('#bgColor').css('opacity', opacityValue / 100);
    $('#opacity-val').val(opacityValue);
});
$('#opacity-val').on('change', function () {
    opacityValue = $(this).val();
    var slider = document.getElementById('opacityRange');
    slider.noUiSlider.reset();
    slider.noUiSlider.set([0, this.opacityValue]);
    $('#bgColor').css('opacity', opacityValue / 100);
    $('#opacity-val').val(opacityValue);
})
//upload logo
$('#popSave').on('click', function () {
    $('#logoUp').append('<img src="' + $('#urlLogo').val() + '">');
})
$('#logoUp').on('click', function () {
    $('#editLogo img').attr('src', $(this).find('img').attr('src'));
    $('#editLogo').fadeIn();
    common.setLogoHeightReponsive();
    $('#uploadPopup').modal('close');
})
//resizeable logo
$('#logoCustomize').draggable({
    cursor: "move",
    containment: "#editLogo",
    stop: function (event, ui) {
        $(this).css("left", parseFloat($(this).css("left")) / ($("#editLogo").width() / 100) + "%");
        $(this).css("top", parseFloat($(this).css("top")) / ($("#editLogo").height() / 100) + "%");
    }
});
var matrixWidth = imageSize * 0.3125;
$("#editLogo").resizable({
    grid: [10000, 1],
    maxHeight: matrixWidth,
    stop: function (e, ui) {
        var parent = ui.element.parent();
        ui.element.css({
            height: ui.element.height() / parent.height() * 100 + "%"
        });
    }
});