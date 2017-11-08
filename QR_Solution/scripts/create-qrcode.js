var common = new CommonFunction(),
     validation = new FEValidation(),
     create = new createQRCode(),
     mapLat, mapLng;
function initAutocomplete() {
    var $this = this;
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 21.0277644, lng: 105.83415979999995 },
        zoom: 13,
        mapTypeId: 'roadmap'
    }),
        mapMarkers = new google.maps.Marker({
            map: map,
        });


    map.addListener('click', function (event) {
        mapMarkers.setMap(null);
        mapMarkers = new google.maps.Marker({
            map: map,
            position: event.latLng
        });
        create.getLocation(mapMarkers);
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.     
        mapMarkers.setMap(null);

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                return;
            }
            // Create a marker for each place.
            mapMarkers = new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location
            });
            create.getLocation(mapMarkers);
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);

    });
    $('#pac-input').val('Hà Nội, Việt Nam');
};
function createQRCode() {
    this.validate = function () {
        $('#urlInput').on('change', function () {
            var isRequreid = validation.StringRequired('#urlInput', 'URL', false);
            if (!isRequreid) {
                validation.URLValidate('#urlInput', 'URL', false)
            }
        });
        $('#textInput').on('change', function () {
            var isRequreid = validation.StringRequired('#textInput', 'Text', false);
            if (!isRequreid) {
                validation.LengthVlidate('#textInput', 'Text', 100, 4, false);
            }
        });
        $('#phoneInput').on('change', function () {
            var isRequreid = validation.StringRequired('#phoneInput', 'Số Điện Thoại', false);
            if (!isRequreid) {
                validation.LengthVlidate('#phoneInput', 'Số Điện Thoại', 11, 10, false);
            }
        });
        $('#smsphone').on('change', function () {
            var isRequreid = validation.StringRequired('#smsphone', 'Số Điện Thoại', false);
            if (!isRequreid) {
                validation.LengthVlidate('#smsphone', 'Số Điện Thoại', 11, 10, false);
            }
        });
        $('#smscontent').on('change', function () {
            validation.StringRequired('#smscontent', 'Nội dung tin nhắn', false);
        });
        $('#emailInput').on('change', function () {
            var isRequreid = validation.StringRequired('#emailInput', 'Email', false);
            if (!isRequreid) {
                validation.EmailValidate('#emailInput', 'Email', true);
            }
        });
        $('input[name="mode"]').on('change', function () {
            if ($(this).val() == 'dynamic') {
                toastr.remove();
                toastr.warning('Đăng ký dùng thử để sử dụng QR code Dynamic.');
                setTimeout(function () {
                    $('#test5').prop('checked', true);
                }, 350)
            }
        });
    };
    this.getLocation = function (target) {
        mapLat = target.getPosition().lat().toString();
        mapLng = target.getPosition().lng().toString();
        console.log('lat' + mapLat, ' and long' + mapLng);
    };
    this.getQRType = function () {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {                    
            $('.nav-tabs li').removeClass('active');
            $(e.target).parent().addClass('active');
            $('input[type="text"],textarea').val('');
            var target = $(e.target).attr("href"); // activated tab
            var qrType = $('.tab-content').find('.active').attr('data-type');
            console.log(qrType);
            common.previewScreenMobile(qrType);
            $('body').removeClass('hidden-create');
            switch (target) {
                case '#register':
                    $('body').addClass('hidden-create');
                    break;
                case '#mapPannel':
                    if ($('script[src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI7umPm-nfmN_nI9Okt7dueSb1sZoLimQ&libraries=places&callback=initAutocomplete"]').length <= 0) {
                        $('body').append('<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI7umPm-nfmN_nI9Okt7dueSb1sZoLimQ&libraries=places&callback=initAutocomplete" async defer></script>');
                    }
                    break;
            }
        });
    };
    this.saveQrCode = function () {
        $('#createQR').on('click', function () {
            var errtUrl = false,
                errText = false,
                errPhone = false,
                errSms = false,
                errEmail = false;
            var inputType = $('.tab-content').find('.active').attr('data-type'),
                inputContent = $('.tab-content').find('.active').find('input').val();
            var postData;
            switch (inputType) {
                case 'url':
                    var result = false;
                    var error = validation.StringRequired('#urlInput', 'URL', false);
                    if (!error) {
                        result = validation.URLValidate('#urlInput', 'URL', false)
                    }
                    if (error || result) {
                        return;
                    }
                    postData = {
                        name: "qrcode",
                        type: inputType,
                        mode: "static",
                        template: null,
                        taget_scan: "0",
                        data: {
                            url: inputContent.trim()
                        }
                    };
                    break;
                case 'text':
                    var result = false;
                    var error = validation.StringRequired('#textInput', 'Text', false);
                    if (!error) {
                        result = validation.LengthVlidate('#textInput', 'Text', 100, 4, false);
                    }
                    if (result || result) {
                        return;
                    }
                    postData = {
                        name: "qrcode",
                        type: inputType,
                        mode: "static",
                        template: null,
                        taget_scan: "0",
                        data: {
                            content: inputContent
                        }
                    };
                    break;
                case 'phone':
                    var result = false;
                    var error = validation.StringRequired('#phoneInput', 'Số Điện Thoại', false);
                    if (!error) {
                        result = validation.LengthVlidate('#phoneInput', 'Số Điện Thoại', 11, 10, false);
                    }
                    if (error || result) {
                        return;
                    }
                    postData = {
                        name: "qrcode",
                        type: inputType,
                        mode: "static",
                        template: null,
                        taget_scan: "0",
                        data: {
                            number: inputContent
                        }
                    };
                    break;
                case 'sms':
                    var result = false,
                        error1 = false,
                        error2 = false;
                    error2 = validation.StringRequired('#smsphone', 'Số Điện Thoại', false);
                    if (!error2) {
                        result = validation.LengthVlidate('#smsphone', 'Số Điện Thoại', 11, 10, false);
                        if (!result) {
                            error1 = validation.StringRequired('#smscontent', 'Nội dung tin nhắn', false);
                        }
                    }
                    if (error1 || error2 || result) {
                        return;
                    };
                    postData = {
                        name: "qrcode",
                        type: inputType,
                        mode: "static",
                        template: null,
                        taget_scan: "0",
                        data: {
                            smsto: $('#smsphone').val(),
                            content: $('#smscontent').val()
                        }
                    };
                    break;
                case 'email':
                    var result = false;
                    var error = validation.StringRequired('#emailInput', 'Email', false);
                    if (!error) {
                        result = validation.EmailValidate('#emailInput', 'Email', true);
                    }
                    if (error || result) {
                        return;
                    }
                    postData = {
                        name: "qrcode",
                        type: inputType,
                        mode: "static",
                        template: null,
                        taget_scan: "0",
                        data: {
                            content: $('#emailInput').val()
                        }
                    };
                    break;
                case 'geo':
                    postData = {
                        name: "qrcode",
                        type: inputType,
                        mode: "static",
                        template: null,
                        taget_scan: "0",
                        data: {
                            latitude: mapLng,
                            longitude: mapLat
                        }
                    }
                    break;
            };
            $.ajax({
                url: 'http://mirascan.vn:32000/api/qrcode-api/create',
                type: 'POST',
                data: JSON.stringify(postData),
                dataType: "json",
                success: function (result) {
                    if (result.status == "success") {
                        //lưu thành công rederiect
                        var qrId = result.data.id;
                        window.location = 'customize.html?id=' + qrId;
                    } else {
                        //ko lưu được
                        console.log('save error');
                        return;
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //có lỗi xảy ra vui lòng tạo lại
                    console.log(thrownError);
                    console.log('something error')
                }
            });
        });
    };
    this.init = function () {
        this.validate();
        this.getQRType();
        this.saveQrCode();
        common.HoverPreviewMode();
        common.previewScreenMobile('url');
    }
}
$(document).ready(function () {
    //create QR Code  
    create.init();
})