$(document).ready(function($){
    console.log("bfk")
//   $('.goods-slider').slick({
//     // centerMode: true,
//     // centerPadding: '60px',
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     dots: true,
//     arrows: true,
//     infinity: true,
//     fade: true,
//     // autoplaySpeed: 1000,
//     cssEase: 'easeOut',
//     speed: 1500

// });
});


;(function($){
  "use strict";

  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinity: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: 'easeOut',
    dots: false,
    speed: 300,
    speed: 1500
  });
})(jQuery);


  $('.goods-slider').slick({
    centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});


//header

$(function() {
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 50) {
            $(".header").addClass("active");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
           $(".header").removeClass("active");
        }
    });
});


//burger

$('.menu-toggle').on('click', function(){

  $('.menu').toggleClass('menu-active');
  $('.menu-toggle').toggleClass('menu-toggle-active');
  $('menu').removeClass('menu-active');
  $('menu-toggle').removeClass('menu-toggle-active');
});



//form


console.log('test');


$('.request__form').on('submit', function(e){
  e.preventDefault();

  let inputEmail = $('#contact-email'),
    inputName = $('#contact-name'),
    inputText = $('#contact-message');

  $('.ba-contact-error').css('display', 'none');

  let validateEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

  if (!validateEmail.test(inputEmail.val())){
    // alert ('incorect email');
    inputEmail.closest('.request__field').find('.form-error').css('display', 'block')
  }


  if( inputName.val() === '' ){
    inputName.closest('.request__field').find('.form-error').css('display', 'block')
  }

  if( inputText.val().length < 5 ){
    inputText.closest('.request__field').find('.form-error').css('display', 'block')
  }

})


$('.request__form').on('submit', function (e) {
    e.preventDefault();

    let inputs = $(this).find('[data-valid]');
    console.log(inputs);

    let isValid = true;

    inputs.each(function(input) {
        isValid = validate.call(this);
    })

    isValid != false ? isValid = true : isValid =false;

    console.log('submit valid - ' + isValid);
});




let validate = function () {
  let inputData = $(this).data('valid').split(' '),
  inputValue = $(this).val();

  let validateStatus = true;

  inputData.forEach(element => {
    switch (element) {
      case 'required':
      validateStatus = validRequired(inputValue);
      break;

      case 'email':
      validateStatus = validEmail(inputValue);
      break;
      
      default:
      break;
    }
  });
  return validateStatus;
}




$('[data-valid]').on('change', validate)

let validRequired = function (value) {
    if (value != '') {
        
    } else {
        console.log('This field is required');
        return false
    }
}

let validEmail = function (value) {
    let validateEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!validateEmail.test(value)) {
        console.log('Email is invalid');
        return false
    }
}
