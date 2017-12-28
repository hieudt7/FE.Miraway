'use strict';
var clickBook = false;
function initSlick() {
    $('.slick-center').on('init', function (event, slick, direction) {
        var currentHeight = $('#slickBook').height();
        $('#slickBook').css('height', currentHeight);
        //$('.product-content').css('margin-top', currentHeight - 55);
        $('.book-background').css('height', currentHeight - 55)
    });
    $('.slick-center').slick({
        slidesToShow: 1,
        centerMode: true,
        arrows: false,
    });
    $('.slick-center').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        //event on change book
        var bookID = $(slick.$slides.get(nextSlide)).find('img').attr('id')
        getBookByID(array, bookID);
    });
};
function resetForm() {
    $('.search-input').hide();
    $('.content-wrapper > section').hide();
}
var array = [
    { 'id': 'book_1', 'bookName': 'Em Đồng Ý Ly Hôn', 'bookAuthor': 'Chúy', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach_01.jpg' },
    { 'id': 'book_2', 'bookName': 'Sống Để Hạnh Phúc', 'bookAuthor': 'Nguyễn Hoàng Ánh', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach_02.jpg' },
    { 'id': 'book_3', 'bookName': 'Chúng Ta Sẽ Bên Nhau Bao Lâu', 'bookAuthor': 'CADE - Hạc Xanh', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach_03.jpg' },
    { 'id': 'book_4', 'bookName': 'Mỗi Ngày Một Bài Học', 'bookAuthor': 'Matsushita Konosuke', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach_04.jpg' },
    { 'id': 'book_5', 'bookName': 'Ngày Xưa Có Một Chuyện Tình', 'bookAuthor': 'Nguyễn Nhật Ánh', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach_05.jpg' },
    { 'id': 'book_6', 'bookName': 'Tìm Đường Tuổi 20s', 'bookAuthor': 'Trần Thị Thùy Trang', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach_06.jpg' },
    { 'id': 'book_7', 'bookName': 'Hộ Chiếu Xanh Đi Quanh Thế Giới', 'bookAuthor': 'Nguyễn Thị Thúy', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach_07.jpg' },
    { 'id': 'book_8', 'bookName': 'Trò Chơi Tư Duy', 'bookAuthor': 'Michel Michulko', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach_08.jpg' },
    { 'id': 'book_9', 'bookName': 'Đảo Mộng Mơ', 'bookAuthor': 'Nguyễn Nhật Ánh', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach-03.jpg' },
    { 'id': 'book_10', 'bookName': 'Năm Mươi Sắc Thái Tự Do', 'bookAuthor': 'ELJames', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach-04.jpg' },
    { 'id': 'book_11', 'bookName': 'Bóng Tối Kinh Hoàng', 'bookAuthor': 'Sioney Sheldon', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach-05.jpg' },
    { 'id': 'book_12', 'bookName': 'Mật MÃ Da Vinci', 'bookAuthor': 'Dan Brown', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach-06.jpg' },
    { 'id': 'book_13', 'bookName': 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh', 'bookAuthor': 'Nguyễn Nhật Ánh', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach-07.jpg' },
    { 'id': 'book_14', 'bookName': 'Yêu Anh Hơn Cả Tử Thần', 'bookAuthor': 'Tảo Đình', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach-08.jpg' },
    { 'id': 'book_15', 'bookName': 'Xin Lỗi Em Chỉ Là Con Đĩ', 'bookAuthor': 'Tảo Đình', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach-09.jpg' },
    { 'id': 'book_16', 'bookName': 'Người Truyền Ký Ức', 'bookAuthor': 'Lois Lowry', 'bookDescreption': 'Tuổi trẻ, chúng ta có những cuộc chia ly để rồi mỗi người phải bước lên những chặng đua khác nhau, thực hiện ước mơ của mình. Mặc dù có thể sẽ lạc mất nhau sau đó, mặc dù có thể xảy ra chuyện trái tim một trong số hai người sẽ thay đổi, mặc dù có thể sẽ lãng quên nhau đi mất.', 'bookImage': 'ebook_img/sach-10.jpg' },
]
function getBookByID(myArray, id) {
    var result = $.grep(myArray, function (e) { return e.id == id; });
    if (result.length == 0) {
        // not found
        console.log('not found')
    } else if (result.length == 1) {
        console.log(result[0]);
        $('#bookName').text(result[0].bookName);
        $('#bookAuthor').text(result[0].bookAuthor);
        $('#bookDescription').text(result[0].bookDescreption);
        $('.book-background').css('background-image', 'url(' + result[0].bookImage + ')');
        // access the foo property using result[0].foo
    } else {
        console.log('mutiple item');
        // multiple items found
    }
};
$(document).ready(function () {
    $(document).on("click", ".menu-link", function () {
        var element = $(this).attr('data-href'),
            text = $(this).attr('data-text'),            
            currentSection = '#' + $('.content-wrapper >section:visible').attr('id');
        $('#backBtn').attr('data-href', currentSection);        
        resetForm();
        $(element).fadeIn();
        //check class
        switch (element) {
            case "#html_bookDetail":
                if (!clickBook) {
                    initSlick();
                    clickBook = true;
                }
                break;
            case "#html_searchBook":
                $('.search-input').show();
                break;

        }
        $('.back-group').addClass('animating fadeIn animated');
        $('.back-group').show();        
        $('.link-menu').find('a').removeClass('active');
        $('.link-menu').find('a[data-href="' + element + '"]').addClass('active');
    });
    $(document).on("click", ".remove-text", function () {
        $('#textInput').val('');
    });

});
$(window).on('load', function () {
    setTimeout(function () {
        $('#companySection').fadeOut();
        $('.home').addClass('fadeIn animated');
        $('.home').show();
        $('header').fadeIn();
        $('footer').fadeIn();
        $('.card').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.card').removeClass('fadeIn animated');
        })
        $('#html_home').hide();
        $('#html_bookDetail').fadeIn();
        initSlick();
        clickBook = true;
    }, 2500);
})
