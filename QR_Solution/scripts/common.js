var common = new CommonFunction();
$(document).ready(function () {
    $('.modal').modal();
    $('.tooltipped').tooltip({ delay: 50 })
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "6000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    $('#createQR').on('click', function () {
        var inputType = $('.tab-content').find('.active').attr('data-type'),
            inputContent = $('.tab-content').find('.active').find('input').val();
        var postData = {
            name: "qrcode",
            type: inputType,
            mode: "static",
            template: null,
            taget_scan: "0",
            data: {
                content: inputContent
            }
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
                    console.log(result);
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
    })
})

function CommonFunction() {
    this.OnlyNumeric = function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
            //Allow : Ctrl + V             
            (e.keyCode == 86 && e.ctrlKey === true) ||
            // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };
    this.SpecialCharacter = function (e) {
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey == true && e.keyCode == 192) || //chặn ~ 
            (e.shiftKey == true && e.keyCode == 188) || //chặn <
            (e.shiftKey == true && e.keyCode == 190) || //chặn >
            (e.shiftKey == true && e.keyCode == 54) || // chặn ^
            (e.shiftKey == true && e.keyCode == 219) || // chặn {
            (e.shiftKey == true && e.keyCode == 221) ||
            (e.shiftKey == true && e.keyCode == 47) ||
            (e.shiftKey == true && e.keyCode == 48) ||
            (e.shiftKey == true && e.keyCode == 49) ||
            (e.shiftKey == true && e.keyCode == 50) ||
            (e.shiftKey == true && e.keyCode == 51) ||
            (e.shiftKey == true && e.keyCode == 52) ||
            (e.shiftKey == true && e.keyCode == 53) ||
            (e.shiftKey == true && e.keyCode == 54) ||
            (e.shiftKey == true && e.keyCode == 55) ||
            (e.shiftKey == true && e.keyCode == 56) ||
            (e.shiftKey == true && e.keyCode == 57) ||
            (e.keyCode == 187) ||
            (e.keyCode == 189) ||
            (e.keyCode == 186) ||
            (e.keyCode == 222)) {
            e.preventDefault();
        }
    };
    this.MoneyFormat = function (num) {
        var org = num.toString().replaceAll(".", "");
        var str = org.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        return str;
    };
    this.CallMoneyFormat = function () {
        $(".money").keyup(function (e) {
            if (e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 8 && e.keyCode != 35 && e.keyCode != 36 && e.keyCode != 46) {
                $(this).val($this.moneyFormat($(this).val()));
            }
        });
        $(".money").keydown(function (e) {
            $this.onlyNummeric(e);
        });
        $(".money").blur(function (e) {
            $(this).val($this.moneyFormat($(this).val()));
        });
    };
    this.validateEmail = function (value) {
        if (value == "") return true;
        var regex = /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
        var result = regex.test(value);
        return result;
    };
    this.SimilarColor = function (hex1, hex2) {
        if (hex1 == null || hex1 == '' || hex1 == undefined || hex2 == null || hex2 == '' || hex2 == undefined) {
            return;
        }
        hex1 = hex1.slice(1);
        hex2 = hex2.slice(1);
        // get red/green/blue int values of hex1
        var r1 = parseInt(hex1.substring(0, 2), 16);
        var g1 = parseInt(hex1.substring(2, 4), 16);
        var b1 = parseInt(hex1.substring(4, 6), 16);
        // get red/green/blue int values of hex2
        var r2 = parseInt(hex2.substring(0, 2), 16);
        var g2 = parseInt(hex2.substring(2, 4), 16);
        var b2 = parseInt(hex2.substring(4, 6), 16);
        // calculate differences between reds, greens and blues
        var r = 255 - Math.abs(r1 - r2);
        var g = 255 - Math.abs(g1 - g2);
        var b = 255 - Math.abs(b1 - b2);
        // limit differences between 0 and 1
        r /= 255;
        g /= 255;
        b /= 255;
        // 0 means opposit colors, 1 means same colors
        return (r + g + b) / 3;
    };
    this.checkContrast = function (firstColor, secondColor) {
        if (firstColor == null || firstColor == '' || firstColor == undefined || secondColor == null || secondColor == '' || secondColor == undefined) {
            return;
        }
        var $scope = this;
        var checkColor1 = firstColor.charAt(0);
        var checkColor2 = secondColor.charAt(0);
        if (checkColor1 == '#') {
            firstColor = $scope.hexToRgb(firstColor);
        };
        if (checkColor2 == '#') {
            secondColor = $scope.hexToRgb(secondColor);
        };
        var rgb1 = $scope.getRGBColor(firstColor);
        var rgb2 = $scope.getRGBColor(secondColor);
        return resultPercent = $scope.ContrastCalculator(rgb1, rgb2);
    };
    this.hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var text = 'rgb(';
        text = text + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ')';
        return text ? text : null;
    };
    this.getRGBColor = function (rgbColor) {
        var rgbArr = rgbColor.split('(')[1].split(')')[0].split(',');
        return (rgbArr[0] * .299 + rgbArr[1] * .587 + rgbArr[2] * .114) / 255 * 100;
    };
    this.ContrastCalculator = function (firstColor, secondColor) {
        return Math.round(Math.abs(firstColor - secondColor))
    };
    this.checkQRContrast = function (bgColor, dataColor, eye_l_in, eye_l_out, eye_r_in, eye_r_out, eye_b_in, eye_b_out) {
        var contrastNumber = 16,
            similarNumber = 0.9,
            badContrast = false,
            dataContrast = false,
            eyeLContrastIn = false,
            eyeLContrastOut = false,
            eyeRContrastIn = false,
            eyeRContrastOut = false,
            eyeBContrastIn = false,
            eyeBContrastOut = false,
            preventEye = false,
            dataContrastCheck = this.checkContrast(bgColor, dataColor),
            eyeLContrastInCheck = this.checkContrast(bgColor, eye_l_in),
            eyeLContrastOutCheck = this.checkContrast(bgColor, eye_l_out),
            eyeRContrastInCheck = this.checkContrast(bgColor, eye_r_in),
            eyeRContrastOutCheck = this.checkContrast(bgColor, eye_r_out),
            eyeBContrastInCheck = this.checkContrast(bgColor, eye_b_in),
            eyeBContrastOutCheck = this.checkContrast(bgColor, eye_b_out);

        //avoid background
        var background1 = "#000000",
            background2 = "#0000ff",
            background3 = "#008000",
            background4 = "#805d00",
            background5 = '#ffffff';
        background6 = '#ffff00';
        var checkColor1 = this.SimilarColor(bgColor, background1),
            checkColor2 = this.SimilarColor(bgColor, background2),
            checkColor3 = this.SimilarColor(bgColor, background3),
            checkColor4 = this.SimilarColor(bgColor, background4),
            avoidBg = false;
        if (checkColor1 > similarNumber || checkColor2 > similarNumber || checkColor3 > similarNumber || checkColor4 > similarNumber) {
            avoidBg = true;
        }
        if (avoidBg) {
            $('.tooltipped').attr('data-tooltip', 'Màu nền này có thể làm cho QR Code không quét được. Hãy chọn màu khác');
            $('.tooltipped').tooltip({ delay: 50 })
            $('#errorQR').show();
            $('#bgColor').addClass('errQR');
        } else {
            $('#errorQR').hide();
            $('#bgColor').removeClass('errQR');
            $('.tooltipped').attr('data-tooltip', 'Màu sắc bạn chọn có thể làm QR code không quét được. Vui lòng quét thử trước khi lưu');
            $('.tooltipped').tooltip({ delay: 50 })
            if (dataContrastCheck < contrastNumber) {
                dataContrast = true;
            }
            if (eyeLContrastInCheck < contrastNumber) {
                eyeLContrastIn = true;
            }
            if (eyeLContrastOutCheck < contrastNumber) {
                eyeLContrastOut = true;
            }
            if (eyeRContrastInCheck < contrastNumber) {
                eyeRContrastIn = true;
            }
            if (eyeRContrastOutCheck < contrastNumber) {
                eyeRContrastOut = true;
            }
            if (eyeBContrastInCheck < contrastNumber) {
                eyeBContrastIn = true;
            }
            if (eyeBContrastOutCheck < contrastNumber) {
                eyeBContrastOut = true;
            }
            var smiliar1 = this.SimilarColor(dataColor, background5),
                smiliar2 = this.SimilarColor(eye_l_in, background5),
                smiliar3 = this.SimilarColor(eye_l_out, background5),
                smiliar4 = this.SimilarColor(eye_r_in, background5),
                smiliar5 = this.SimilarColor(eye_r_out, background5),
                smiliar6 = this.SimilarColor(eye_b_in, background5),
                smiliar7 = this.SimilarColor(eye_b_out, background5),
                smiliar8 = this.SimilarColor(dataColor, background6),
                smiliar9 = this.SimilarColor(eye_l_in, background6),
                smiliar10 = this.SimilarColor(eye_l_out, background6),
                smiliar11 = this.SimilarColor(eye_r_in, background6),
                smiliar12 = this.SimilarColor(eye_r_out, background6),
                smiliar13 = this.SimilarColor(eye_b_in, background6),
                smiliar14 = this.SimilarColor(eye_b_out, background6);
            if (smiliar1 > 0.95 || smiliar2 > 0.95 || smiliar3 > 0.95 || smiliar4 > 0.95 || smiliar5 > 0.95 || smiliar6 > 0.95 || smiliar7 > 0.95 ||
                smiliar8 > 0.95 || smiliar9 > 0.95 || smiliar10 > 0.95 || smiliar11 > 0.95 || smiliar12 > 0.95 || smiliar13 > 0.95 || smiliar14 > 0.95) {
                preventEye = true;
            }
            if (dataContrast || eyeLContrastIn || eyeLContrastOut || eyeRContrastIn ||
                eyeRContrastOut || eyeBContrastIn || eyeBContrastOut || preventEye) {
                badContrast = true;
            }
            if (badContrast) {
                $('#errorQR').show();
                $('#bgColor').addClass('errQR');
            } else {
                $('#errorQR').hide();
                $('#bgColor').removeClass('errQR');
            }
        }

    };
    this.fillEyeColor = function (box, iner, outer) {
        var $element = $(box);
        $element.children(':nth-child(1)').css('fill', outer);    
        $element.children(':nth-child(2)').css('fill', iner);
    };    
    this.generateQRCodeData = function (qrSize, imgSrc) {
        var $this = this;
        var dataPartern,
            postion,
            insideWidth,
            realPixel = 0,
            detal = 0,
            eyeWidth,
            eyeType = "01",
            dataType = "pattern-01",
            scale = 1.25,

            bottomRemove = 0;
        if (dataPartern == '' || dataPartern == undefined || dataPartern == null) {
            dataPartern = '';
            var image = document.createElement('img');
            image.width = 256;
            image.height = 256;
            image.src = imgSrc;
            image.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
                var count = 0,
                    count1 = 0,
                    breakStatement = false;
                var pixel = context.getImageData(0, 0, image.width, image.height);
                for (var i = 0; i < pixel.data.length; i += 4) {
                    if (pixel.data[i] == 0 && pixel.data[i + 1] == 0 && pixel.data[i + 2] == 0 && pixel.data[i + 3] != 0) {
                        postion = i / 1028;
                        breakStatement = true;
                    }
                    if (breakStatement) { break; }
                }
                insideWidth = image.width - postion * 2,
                    realPixel = parseInt((insideWidth / qrSize).toString()),
                    detal = insideWidth - realPixel * qrSize,
                    insideWidth = realPixel * qrSize,
                    eyeWidth = realPixel * 7,
                    bottomRemove = image.width - (postion + eyeWidth + detal);
                //save eye position
                context.clearRect(0, 0, postion + eyeWidth, postion + eyeWidth); // remove left eye
                context.clearRect(0, bottomRemove, postion + eyeWidth + 1, postion + eyeWidth + 1); // remove right eye
                context.clearRect(bottomRemove, 0, postion + eyeWidth + 1, postion + eyeWidth + 1); // remove bottom eye
                //draw again picture
                var canvasMain = document.createElement("canvas");
                canvasMain.width = insideWidth;
                canvasMain.height = insideWidth;
                var contextMain = canvasMain.getContext('2d');
                contextMain.drawImage(canvas, postion, postion, insideWidth, insideWidth, 0, 0, insideWidth, insideWidth);
                for (var i = 0; i < insideWidth; i += realPixel) {
                    for (var j = 0; j < insideWidth; j += realPixel) {
                        var mImageData = contextMain.getImageData(j, i, insideWidth, insideWidth),
                            mData = mImageData.data;
                        if (mData[0] == 0 && mData[1] == 0 && mData[2] == 0 && mData[3] != 0) {
                            dataPartern += i * scale + '-' + j * scale + ',';
                        }
                    }
                }
                canvasMain.remove();
                $this.createQRSVG(postion * scale, eyeWidth * scale, eyeType, dataPartern, dataType, insideWidth * scale);
            }
        } else {
            $this.createQRSVG(postion * scale, eyeWidth * scale, eyeType, dataPartern, dataType, insideWidth * scale);
        }
    };
    this.createQRSVG = function (eyePosition, eyeySize, eyeShape, dataMatrix, dataShape, imageSize) {
        var $this = this;
        var logo,
            bgColor = "#ffffff",
            logoSize = (imageSize * 0.26) / (3.2);
        var eyeArray = [1, 2, 3], //for 3 eyes
            baseW = 224, //all of svg is 224
            orgiginLocalhost = document.URL.split('#')[0],
            originQrEye = "images/newcreate/svg/eyes/",
            originQrData = "images/newcreate/svg/patterns/",
            file = ".svg",
            cx, cWidth, line, drawLine,
            baseDataSize = 24,
            scale = (eyeySize / baseW),
            dataWidth = eyeySize / 7,
            dataMatrix = dataMatrix.slice(0, -1),
            dataArray = dataMatrix.split(",").map(function (result) {
                var splitPos = result.split('-')
                return {
                    posX: splitPos[0],
                    posY: splitPos[1]
                };
            });
        //create svg
        var svgContainer = d3.select("#bgColor").append("svg")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("width", 320)
            .attr("height", 320)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 320 320")
            //.attr('class', 'qr-code')
            .classed("qr-code", true)
            .attr('id', 'qr-mira')
            .attr('transform', 'scale(1)');
        var groupPattern = svgContainer.selectAll("svg")
            .data('1')
            .enter()
            .append("g")
            .attr('class', 'data-pattern')
            .attr('transform', function (d) {
                var transalte = 'translate(' + (eyePosition) + ' ' + (eyePosition) + ')';
                return transalte;
            });
        var dataScale = dataWidth / baseDataSize;
        var dataPattern = d3.select(".data-pattern").selectAll("g.data-pattern")
            .data(dataArray)
            .enter()
            .append('g')
            .attr('class', 'data-pattern sub-data')
            .attr('transform', function (d) {
                return 'translate(' + (d.posX) + ' ' + (d.posY) + ') scale(' + dataScale + ')';
            });
        var groupData = dataShape.split(',');
        if (groupData.length < 2) {
            $("#orgigin").html('<object type="image/svg+xml" data="' + originQrEye + eyeShape + file + '" width="100%" height="100%" id="eyeShapeObj"></object><object type="image/svg+xml" data="' + originQrData + dataShape + file + '" width="100%" height="100%" id="dataShapeObj1"></object>');
            //generate data
            $('#dataShapeObj1').load(function () {
                $this.loadDataShape('#dataShapeObj1')
                $("#orgigin #dataShapeObj1").remove();
            })
        } else {
            $("#orgigin").html('<object type="image/svg+xml" data="' + originQrEye + eyeShape + file + '" width="100%" height="100%" id="eyeShapeObj"></object><object type="image/svg+xml" data="' + originQrData + groupData[0] + file + '" width="100%" height="100%" id="dataShapeObj1"></object><object type="image/svg+xml" data="' + originQrData + groupData[1] + file + '" width="100%" height="100%" id="dataShapeObj2"></object>');
            $('#orgigin #dataShapeObj1').load(function () {
                var shape = common.getObjectChild('#dataShapeObj1').html();
                $('#qr-mira >.data-pattern g:nth-child(2n+1)').html(shape);
                //set color                
                $('#orgigin #dataShapeObj1').remove();
            })
            $('#orgigin #dataShapeObj2').load(function () {
                var shape = common.getObjectChild('#dataShapeObj2').html();
                $('#qr-mira >.data-pattern g:nth-child(2n)').html(shape);                
                $('#orgigin #dataShapeObj2').remove();
            })
        };
        $('#eyeShapeObj').load(function () {
            var detalNumber = 0;
            detalNumber = parseInt(dataWidth / 2);
            var groups = svgContainer.selectAll("g:not(.data-pattern)")
                .data(eyeArray)
                .enter()
                .append("g")
                .attr('transform', function (d, index) { //position of eyey
                    var result;
                    switch (index + 1) {
                        case 1:
                            result = 'translate(' + (eyePosition + detalNumber) + ' ' + (eyePosition + detalNumber) + ') scale(' + scale + ')'
                            break;
                        case 2:
                            result = 'translate(' + (eyePosition + detalNumber) + ' ' + (imageSize + eyePosition + detalNumber - eyeySize) + ') scale(' + scale + ')'
                            break;
                        case 3:
                            result = 'translate(' + (imageSize + eyePosition + detalNumber - eyeySize) + ' ' + (eyePosition + detalNumber) + ') scale(' + scale + ')'
                            break;
                    }
                    return result;
                })
                .attr('class', function (d, index) { return 'svg-eye box-' + (index + 1); });
            $this.loadEyeShape('#eyeShapeObj');          
            $("#orgigin #eyeShapeObj").remove();
        });               
    };
    this.eyeToCanvas = function () {
        //generate              
        $('#canvas-eye').remove();
        $('.qr-image').append('<div id="qr-canvas"></div>');
        var qrStyle = $('#bgColor').attr('style');
        $('#qr-canvas').attr('style', qrStyle);
        var $element = $('.eyes-box'),
            eyeWidth = $element.width(),
            position = $element.css('left'),
            count = 3;
        $element.find('svg').each(function () {
            count--;
            var canvas, xml;
            $('#qr-canvas').append('<div class="eyes-box" style="width:' + eyeWidth + 'px;' + 'height:' + eyeWidth + 'px' + '"></div>');
            canvas = document.createElement("canvas");
            xml = (new XMLSerializer()).serializeToString(this);
            xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');
            canvg(canvas, xml);
            var newCanvas = document.createElement('canvas');
            $('#qr-canvas .eyes-box:last-child').prepend(canvas);
            newCanvas.className = "canvas-type-eye";
            switch (count) {
                case 2:
                    $('#qr-canvas .eyes-box:last-child').css({
                        bottom: position,
                        left: position
                    });
                    break;
                case 1:
                    $('#qr-canvas .eyes-box:last-child').css({
                        top: position,
                        right: position
                    });
                    break;
                case 0:
                    $('#qr-canvas .eyes-box:last-child').css({
                        top: position,
                        left: position
                    });
                    break;
            }
        });
    };
    this.patternToCanvas = function (dataPattern, insideWidth) {
        $('#qr-canvas').append('<div id="canvas-pattern"></div>');
        var dataWidth = $('#data-partern').width(),
            dataLeft = $('#data-partern').css('left'),
            dataTop = $('#data-partern').css('top');
        $('#canvas-pattern').css({
            width: dataWidth,
            height: dataWidth,
            top: dataTop,
            left: dataLeft,
        })
        var $targetSVG = $('#data-partern .data:first'),
            patternWidth = $targetSVG[0].getBoundingClientRect().width;

        $targetSVG.find('svg').each(function () {
            var canvas, xml;
            canvas = document.createElement("canvas");
            xml = (new XMLSerializer()).serializeToString(this);
            xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');
            canvg(canvas, xml);
            var dataArr = dataPattern.split(',');
            for (var i = 0; i < dataArr.length - 1; i++) {
                var newCanvas = document.createElement('canvas');
                newCanvas.width = canvas.width;
                newCanvas.height = canvas.height;
                newCanvas.className = "canvas-type-data";
                $('#canvas-pattern').append('<div class="data"></div>');
                $('#canvas-pattern .data:last').append(newCanvas);
                $('#canvas-pattern .data:last').css({
                    left: (parseInt(dataArr[i].split('-')[1]) * 1.25) * 100 / (insideWidth * 1.25) + '%',
                    top: (parseInt(dataArr[i].split('-')[0]) * 1.25) * 100 / (insideWidth * 1.25) + '%',
                    width: patternWidth + 'px',
                    height: patternWidth + 'px'
                })
                var context = newCanvas.getContext('2d');
                context.drawImage(canvas, 0, 0);
            };
        });
        $('#editLogo').clone().appendTo('#qr-canvas');
        $('#bgColor').hide();
    };
    this.downloadQRCode = function () {
        var htmlCanvas = $('.qr-image');
        html2canvas(htmlCanvas, {
            onrendered: function (canvas) {
                var a = document.createElement('a');
                a.href = canvas.toDataURL("image/jpg");
                window.open(a.href);
                a.download = 'MiraScan_Generator.jpg';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                $('#qr-canvas').remove()
                $('#bgColor').show();
                $('#loading').remove();
            }
        });
    };
    this.saveQRCodeToPNG = function () {
        //  $('body').append('<div class="modal-backdrop fade in" id="loading"><div class="loadding-pannel"><div class="loader-spin"><div class="fade-circle"></div></div></div></div>')
        var element = $('.qr-image');
        //convert all svg to canvas
        var svgElements = element.find('svg');
        //replace all svgs with a temp canvas
        svgElements.each(function () {
            var canvas, xml;
            canvas = document.createElement("canvas");
            canvas.className = "screenShotTempCanvas";
            //convert SVG into a XML string
            xml = (new XMLSerializer()).serializeToString(this);
            // Removing the name space as IE throws an error
            xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');
            //draw the SVG onto a canvas
            canvg(canvas, xml);
            $(canvas).insertAfter(this);
            $(canvas).css('width', $(this).width());
            $(canvas).css('height', $(this).height());
            this.className = "tempHide";
            $(this).hide();
        });
        html2canvas(element, {
            onrendered: function (canvas) {
                var a = document.createElement('a');
                a.href = canvas.toDataURL("image/jpg");
                window.open(a.href);
                //a.download = 'QR_Generator.jpg';
                //document.body.appendChild(a);
                // a.click();
                // document.body.removeChild(a);
                // element.find('.screenShotTempCanvas').remove();
                // svgElements.show();
                // $('#loading').remove();
            }
        });

    };
    this.setColorHalfVertical = function (imageSize, color) {
        $('#qr-mira .sub-data').each(function () {
            var positionX = parseFloat($(this).css('transform').split(',')[4]);
            if (positionX > imageSize / 2) {
                $(this).css('fill', color);
                $('.box-3').children().css('fill', color);
            }

        })
    };
    this.setColorHalfHorizontal = function (imageSize, color) {
        $('#data-partern .data').each(function () {
            if ($(this).position().top > imageSize / 2) {
                $(this).find('svg').children().css('fill', color);
                $('.box-2').find('svg').children().css('fill', color);
            }
        })
    };    
    this.previewScreenMobile = function (qrType) {
        $('#preview-body').html('');

        $('#preview-body').removeClass().addClass(qrType);
        $(document).on('keyup', '.display-form input.form-control:not(.social-input,#qrCodeName)', function (e) {
            $('#prvContent').text($(this).val());
        })
        switch (qrType) {
            case 'url':
                $('#preview-body').append('<p id="prvContent"></p>');
                break;
            case 'text':
                $('#preview-body').append('<p id="prvContent"></p>');
                $('#preview-body').prepend('<h3 class="landing-text">Nội dung của bạn</h3>');
                break;
            case 'phone':
                $('#preview-body').append('<div class="preview-phone"><p id="prvContent"></p><p class="btn-action"><a>Hủy</a><a>Gọi</a></p></div>');
                $('#preview-body').append('<div class="modal-backdrop fade in"></div>');
                break;
            case 'sms':
                $('#preview-body').append('<div class="preview-sms"><p id="prvContent"></p><div class="sms-content-box"><div class="sms-content-cell"><div class id="sms_content"></div></div></div></div>');
                $('#preview-body').append('<img class="previe-sms-image" src="./assets/img/pv_sms.jpg">');
                $(document).on('keyup', '#smscontent', function (e) {
                    var smsContent = $('#smscontent').val();
                    smsContent = smsContent.replace(/\r?\n/g, '<br />');
                    $('#sms_content').html(smsContent)
                })
                break;
            case 'email':
                $('#preview-body').append('<p class="preview-email" id="prvContent"></p>');
                $('#preview-body').append('<img class="previe-sms-image" src="./assets/img/prv_email.jpg">');
                break;
            case 'social':
                $('#preview-body').append('<h3>Mạng xã hội của tôi</h3><a href="#" class="social-btn facebook"><i></i><span id="facebook_text"></span></a>');
                $(document).on('keyup', '.social-input', function (e) {
                    var value = $(this).val(),
                        id = $(this).attr('id') + '_text';
                    $('#' + id).text(value);
                })
                break;
            case 'pdf':
                $('#preview-body').append('<img class="previe-pdf-image" src="./assets/img/prv_pdf.jpg">');
                break;
            case 'audio':
                $('#preview-body').append('<img class="previe-audio-image" src="./assets/img/prv_audio.jpg">');
                break;
            case 'geo':
                $('#preview-body').append('<img class="previe-full-image" src="./assets/img/prv_map.jpg">');
                break;
        }
    };
    this.FillterByCategory = function (value) {
        if (value == '0') {
            $('.item').fadeIn();
        } else {
            $('.img-frame').each(function () {
                if ($(this).attr('data-category') == value) {
                    $(this).parents('.item:first').fadeIn();
                } else {
                    $(this).parents('.item:first').fadeOut();
                }
            });
        }
    };    
    this.HoverPreviewMode = function () {
        $(".qr-option").hover(
            function () {
                var image = $(this).attr('data-type');
                $('#preview-body').append('<img class="previe-full-image preview-mode" src="./assets/img/image/preview/' + image + '.jpg">')
            },
            function () {
                $('#preview-body').find('.preview-mode').remove();
            }
        );
    };    
    this.loadEyeShape = function (obj) {
        var eyeShape = $($(obj)[0].contentDocument.children).html();
        $('.svg-eye').html(eyeShape);
    };
    this.loadDataShape = function (obj) {
        var shape = $($(obj)[0].contentDocument.children).html();
        $('.sub-data').html(shape);
    };
    this.getObjectChild = function (element) {
        return $($(element)[0].contentDocument.children);
    };
    this.setLogoHeightReponsive = function () {
        $('#logoCustomize').on('load', function () {
            $(this).css('height', '');
            var imgPercent = parseFloat($(this).height()) / parseFloat($('#editLogo').height());
            $(this).css('height', imgPercent * 100 + '%');
        })
    };
    this.mergeLogoToSvg = function () {
        var canvasLogo = document.createElement("canvas");
        var image = document.getElementById("logoCustomize");
        canvasLogo.width = image.naturalWidth;
        canvasLogo.height = image.naturalHeight;
        canvasLogo.getContext('2d').drawImage(image, 0, 0);
        var base64Src = canvasLogo.toDataURL('image/png');
        var logoWidth = $('#logoCustomize')[0].getBoundingClientRect().width,
            logoHeight = $('#logoCustomize')[0].getBoundingClientRect().height,
            logoLeft = $('#logoCustomize').position().left,
            logoTop = $('#logoCustomize').position().top + $('#editLogo').position().top;
        $('#editLogo').hide();
        // logoLeft = $('')
        d3.select("#qr-mira").selectAll("svg")
            .data('1')
            .enter()
            .append('g')
            .attr('class', 'logosvg')
            .attr('transform', 'translate(' + logoLeft + ' ' + logoTop + ')')
            .append('rect')
            .attr('fill', '#fff')
            .attr('width', logoWidth)
            .attr('height', logoHeight);
        d3.select(".logosvg").selectAll('g.logosvg')
            .data('1')
            .enter()
            .append('svg:image')
            .attr('width', logoWidth)
            .attr('height', logoHeight)
            .attr("xlink:href", base64Src);
    };
    this.createSvgFrame = function () {

    };
    this.convertToCanvas = function () {
        $this = this;
        var svgElements = $('#qr-mira');
        //replace all svgs with a temp canvas
        svgElements.each(function () {
            var canvas, xml;
            canvas = document.createElement("canvas");
            canvas.className = "qrCanvas";
            //convert SVG into a XML string
            xml = (new XMLSerializer()).serializeToString(this);
            // Removing the name space as IE throws an error
            xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');
            //draw the SVG onto a canvas
            canvg(canvas, xml);
            $(canvas).css('width', $(this).width());
            $(canvas).css('height', $(this).height());
            $('#bgColor').append(canvas);
            $('#qr-mira').hide();
            // $('#editLogo').show();
            // $('.logosvg').remove();
        });
    };
    this.exportToSVG = function (nameQr) {
        $this = this;
        $this.mergeLogoToSvg();
        var svg = document.getElementById("qr-mira");
        var serializer = new XMLSerializer();
        var source = serializer.serializeToString(svg);
        if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        var downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = 'mirascan-' + nameQr;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        $('#editLogo').show();
        $('.logosvg').remove();
        $('#loading').remove();
    };
    this.exportToPNG = function (nameQr) {
        $this = this;
        $this.convertToCanvas();
        var htmlCanvas = $('.qr-image');
        html2canvas(htmlCanvas, {
            onrendered: function (canvas) {
                var a = document.createElement('a');
                a.href = canvas.toDataURL("image/png");
                window.open(a.href);
                a.download = 'mirascan-' + nameQr;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                $('.qrCanvas').remove()
                $('#qr-mira').show();
                $('#loading').remove();
            }
        });
    };
    this.exportToJPG = function (nameQr) {
        $this = this;
        $this.convertToCanvas();
        var htmlCanvas = $('.qr-image');
        html2canvas(htmlCanvas, {
            onrendered: function (canvas) {
                var a = document.createElement('a');
                a.href = canvas.toDataURL("image/jpg");
                window.open(a.href);
                a.download = 'mirascan-' + nameQr;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                $('.qrCanvas').remove()
                $('#qr-mira').show();
                $('#loading').remove();
            }
        });
    };
}
function FEValidation() {
    this.StringRequired = function (element, elementName, isWarning) {
        var disabledStatus = $(element).attr('disabled');
        if (disabledStatus !== undefined && disabledStatus === 'disabled') {
            return false;
        }
        var value = $(element).val();
        var showError = false;
        var message = "";
        if (value == null || value.trim() == '') {
            showError = true;
            message = elementName + ' không được bỏ trống.';
        }
        if (showError) {
            $(element).addClass("errInput");
            $(".errInput:first input:not('.date-picker')").focus();
            toastr.remove();
            if (isWarning) {
                toastr.warning(message);
            } else {
                toastr.error(message);
            }
        } else {
            toastr.clear();
            $(element).removeClass("errInput");
        }
        return showError;
    };    
    this.EmailValidate = function (element, elementName, isRequired, isWarning) {
        var disabledStatus = $(element).attr('disabled');
        if (disabledStatus !== undefined && disabledStatus === 'disabled') {
            return false;
        }
        var value = $(element).val().trim();
        var showError = false;
        var message = "";
        if (isRequired) {
            if (value == null || value == '') {
                showError = true;
                message = elementName + ' không được bỏ trống.';
            }
        }
        if (!showError) {
            var list = value.split(';');
            for (var i = 0; i < list.length; i++) {
                var resultEmail = common.validateEmail(list[i].trim());
                if (!resultEmail) {
                    showError = true;
                    message = "Email phải có dạng example@domain";
                    break;
                }
            }
        }
        if (showError) {
            $(element).addClass("errInput");
            $(".errInput:first input:not('.date-picker')").focus();
            toastr.remove();
            if (isWarning) {
                toastr.warning(message);
            } else {
                toastr.error(message);
            }
        } else {
            toastr.clear();
            $(element).removeClass("errInput");
        }
        return showError;
    };
    this.DateCompare = function (element1, element2, elementName1, elementName2, isGreat, isWarning) {
        var disabledStatus = $(element1).attr('disabled');
        if (disabledStatus !== undefined && disabledStatus === 'disabled') {
            return false;
        }
        var date1 = $(element1).val().trim();
        var date2 = $(element2).val().trim();
        var showError = false;
        var message = "";
        if (isGreat) {
            if (Date.parse(date1) < Date.parse(date2)) {
                showError = true;
                message = elementName1 + " phải lớn hơn " + elementName2;
            }
        } else {
            if (Date.parse(date1) > Date.parse(date2)) {
                showError = true;
                message = elementName1 + " phải nhỏ hơn " + elementName2;
            }
        }
        if (showError) {
            $(element1).parents('div:first').addClass("errInput");
            toastr.remove();
            if (isWarning) {
                toastr.warning(message);
            } else {
                toastr.error(message);
            }
        } else {
            $(element1).parents('div:first').removeClass("errInput");
            toastr.clear();
        }
        return showError;
    };
    this.DateCompareRequired = function (element1, element2, elementName1, elementName2, isGreat, isWarning) {
        var disabledStatus = $(element1).attr('disabled');
        if (disabledStatus !== undefined && disabledStatus === 'disabled') {
            return false;
        }
        var date1 = $(element1).val().trim();
        var date2 = $(element2).val().trim();
        var showError = false;
        var message = "";
        if (date1 == "") {
            showError = true;
            message = "Không được bỏ trống " + elementName1;
        } else {
            if (isGreat) {
                if (Date.parse(date1) < Date.parse(date2)) {
                    showError = true;
                    message = elementName1 + " phải lớn hơn " + elementName2;
                }
            } else {
                if (Date.parse(date1) > Date.parse(date2)) {
                    showError = true;
                    message = elementName1 + " phải nhỏ hơn " + elementName2;
                }
            }

        }
        if (showError) {
            $(element1).parents('div:first').addClass("errInput");
            toastr.remove();
            if (isWarning) {
                toastr.warning(message);
            } else {
                toastr.error(message);
            }
        } else {
            toastr.clear();
            $(element1).parents('div:first').removeClass("errInput");
        }
        return showError;
    };
    this.DateRequired = function (element, elementName, isWarning) {
        var disabledStatus = $(element).attr('disabled');
        if (disabledStatus !== undefined && disabledStatus === 'disabled') {
            return false;
        }
        var date = $(element).val();
        var showError = false;
        var message = "";
        if (date == "") {
            showError = true;
            message = "Bạn không được bỏ trống " + elementName;
        }
        if (showError) {
            $(element).parents('div:first').addClass("errInput");
            toastr.remove();
            if (isWarning) {
                toastr.warning(message);
            } else {
                toastr.error(message);
            }
        } else {
            toastr.clear();
            $(element).parents('div:first').removeClass("errInput");
        }
        return showError;
    };
    this.URLValidate = function (element, elementName, isWarning) {
        var disabledStatus = $(element).attr('disabled');
        if (disabledStatus !== undefined && disabledStatus === 'disabled') {
            return false;
        }
        var value = $(element).val();
        var showError = false;
        var message = "";
        //regex must http
        //var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var expression = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        var value = $(element).val();

        if (!value.match(regex)) {
            showError = true;
            message = elementName + ' không đúng định dạng. Vui lòng nhập lại.';
        }
        if (showError) {
            $(element).addClass("errInput");
            $(".errInput:first input:not('.date-picker')").focus();
            toastr.remove();
            if (isWarning) {
                toastr.warning(message);
            } else {
                toastr.error(message);
            }
        } else {
            toastr.clear();
            $(element).removeClass("errInput");
        }
        return showError;
    }
    this.LengthVlidate = function (element, elementName, maxlength, minlength, isWarning) {
        var disabledStatus = $(element).attr('disabled');
        if (disabledStatus !== undefined && disabledStatus === 'disabled') {
            return false;
        }
        var value = $(element).val();
        var showError = false;
        var message = "";
        if (value !== null && value.trim() !== '') {
            if (maxlength !== null && maxlength !== undefined && maxlength !== '') {
                if (value.length > maxlength) {
                    var showError = true;
                    var message = elementName + " không được vượt quá " + maxlength + " ký tự.";
                }
            }
            if (minlength !== null && minlength !== undefined && minlength !== '') {
                if (value.length < minlength) {
                    var showError = true;
                    var message = elementName + " phải lớn hơn " + minlength + " ký tự.";
                }
            }
        }
        if (showError) {
            $(element).addClass("errInput");
            $(".errInput:first input:not('.date-picker')").focus();
            toastr.remove();
            if (isWarning) {
                toastr.warning(message);
            } else {
                toastr.error(message);
            }
        } else {
            toastr.clear();
            $(element).removeClass("errInput");
        }
        return showError;
    }
    this.RadioGroupRequired = function (element, message) {
        var value = $(element).val();
        var showError = false,
            isBreak = false;
        $(element).find('input').each(function () {
            if ($(this).prop('checked')) {
                isBreak = true;
                showError = false;
            } else if (!$(this).attr('disabled') && !$(this).prop('checked')) {
                showError = true;
            }
            if (isBreak) {
                return false;
            }
        })

        if (showError) {
            toastr.remove();
            toastr.error(message);
        } else {
            toastr.clear();
        }
        return showError;
    }
    this.ValidateSocialLink = function (element, elementName) {
        var disabledStatus = $(element).attr('disabled');
        if (disabledStatus !== undefined && disabledStatus === 'disabled') {
            return false;
        }
        var value = $(element).val();
        var showError = false;
        var message = "";
        if (value == null || value.trim() == '') {
            message = elementName + ' không được bỏ trống.';
            showError = true;
        } else {
            var regexExpression
            switch (elementName) {
                case 'facebook':
                    regexExpression = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/gm;
                    break;
                case 'youtube':
                    regexExpression = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
                    break;
                case 'twitter':
                    regexExpression = /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/gm;
                    break;
                case 'instagram':
                    regexExpression = /(https?:\/\/(www\.)?)?instagram\.com/gm;
                    break;
            }
            var result = regexExpression.test(value);
            if (!result) {
                showError = true;
                message = elementName + ' không đúng định dạng. Vui lòng nhập lại.';
            }
        }
        if (showError) {
            $(element).addClass("errInput");
            $(".errInput:first input:not('.date-picker')").focus();
            toastr.remove();
            toastr.error(message);
        } else {
            toastr.clear();
            $(element).removeClass("errInput");
        }
        return showError;
    }
    this.ValidateMatch = function (element1, element1Name, element2, message, isRequired) {
        var disabledStatus = $(element1).attr('disabled');
        var disabledStatus2 = $(element2).attr('disabled');
        if (disabledStatus !== undefined && disabledStatus === 'disabled' && disabledStatus2 !== undefined && disabledStatus2 === 'disabled') {
            return false;
        }
        var value1 = $(element1).val();
        var value2 = $(element2).val();
        var showError = false;
        if (isRequired) {
            if (value1 == '' || value1 == undefined) {
                showError = true;
                message = element1Name + ' không được bỏ trống.'
            } else {
                if (value1 !== value2) {
                    showError = true;
                }
            }
        } else {
            if (value1 !== value2) {
                showError = true;
            }
        }

        if (showError) {
            $(element1).addClass("errInput");
            $(element2).addClass("errInput");
            $(".errInput:first input:not('.date-picker')").focus();
            toastr.remove();

            toastr.error(message);

        } else {
            toastr.clear();
            $(element1).removeClass("errInput");
            $(element2).removeClass("errInput");
        }
        return showError;
    };
}
//call numeric function
$(document).on('keydown', '.numeric', function (e) {
    common.OnlyNumeric(e);
});
