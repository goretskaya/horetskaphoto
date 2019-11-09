
//slider (home)

;(function($){
  "use strict";

  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    speed: 500

  })
})(jQuery);


//slider (services)

$('.photo-goods__slider').slick({
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

//slider (testimonials)

$('.testimonials__slider').slick({
  centerPadding: '1%',
  centerMode: true,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
  {
    breakpoint: 1279,
    settings: {
      arrows: true,
      centerPadding: '10px',
      centerMode: true,
      slidesToShow: 2.5,
      slidesToScroll: 2
    }
  },

  {
    breakpoint: 1020,
    settings: {
      arrows: true,
      centerPadding: '10px',
      centerMode: true,
      slidesToShow: 2,
      slidesToScroll: 1
    }
  },

  {
    breakpoint: 768,
    settings: {
      arrows: false,
      centerPadding: '5%',
      centerMode: true,
      slidesToShow: 1
    }
  }
  ]
});


//header

$(function() {
  $(window).on("scroll", function() {
    if($(window).scrollTop() > 100) {
      $(".header").addClass("active");
      
    } else {
            //remove the background property so it comes transparent again (defined in your css)
            $(".header").removeClass("active");
          }
        });
});

$(function() {
  $(window).on("scroll", function() {
    if($(window).scrollTop() > 100) {
      $(".header__logo-svg").addClass("active-logo");
      
    } else {
            //remove the background property so it comes transparent again (defined in your css)
            $(".header__logo-svg").removeClass("active-logo");
          }
        });
});

$(function() {
  $(window).on("scroll", function() {
    if($(window).scrollTop() > 100) {
      $(".header__contact-location").addClass("active-location");

      
    } else {
            $(".header__contact-location").removeClass("active-location");

          }
        });
});


$(function() {
  $(window).on("scroll", function() {
    if($(window).scrollTop() > 100) {
      $(".menu-toggle").addClass("active-menu-toggle");

      
    } else {
            $(".menu-toggle").removeClass("active-menu-toggle");

          }
        });
});

$(function() {
    function animationStart() {
        $('.golden-ratio-path').addClass('fin');
    }
    setTimeout(animationStart, 200);
});

//burger

$('.menu-toggle').on('click', function(){

  $('.menu').toggleClass('menu-active');
  $('.menu-toggle').toggleClass('menu-toggle-active');
  $('menu').removeClass('menu-active');
  $('menu-toggle').removeClass('menu-toggle-active'); 
});

//form

var userNameInputId = "#contact-name-input";
var userPhoneInputId = "#contact-phone-input";
var userInputErrorPartOfId = "-error";
var userInputInvalidClass = "invalid";

var validateUserName = function () {
  let isValid = !state.isSubmitedOnce || !isNullOrUndefinedOrEmpty(state.user.Name);
  updateInvalidClass(userNameInputId, isValid);
  state.user.IsNameValid = isValid;
}

var validateUserPhone = function () {
  let isValid = !state.isSubmitedOnce || !isNullOrUndefinedOrEmpty(state.user.Phone);
  updateInvalidClass(userPhoneInputId, isValid);
  state.user.IsPhoneValid = isValid;
}

var validateUser = function () {
  validateUserName();
  validateUserPhone();
  return state.user.IsPhoneValid && state.user.IsNameValid;
}

$(userNameInputId).on('change', function (e) {
  state.user.Name = e.target.value;
  validateUserName();
});

$(userPhoneInputId).on('change', function (e) {
  state.user.Phone = e.target.value;
  validateUserPhone();
});

$('#contact-form').on('submit', function (e) {
  e.preventDefault();
  console.log("REQUEST");
  state.isSubmitedOnce = true;
  var isValid = validateUser();
  if (isValid) {
    console.log("Valid inputs, sending data..");
    
    var textToSend = 
`*Contact Request:*
Name: ${state.user.Name}
Phone: ${state.user.Phone}
Plan: ${state.user.Plan}
`;

    sendToTelegram(textToSend).then(function() {
      $("#contant-form-success-modal").addClass("visible");
    }).catch(function() {
      $("#contant-form-error-modal").addClass("visible");
    });

  } else {
    console.log("Invalid inputs");
  }
  return false;
});

$('#close').on('click', function(){
  $('#contant-form-success-modal').removeClass('visible');
});

$('#close-icon').on('click', function(){
  $('#contant-form-success-modal').removeClass('visible');
});

$('#close').on('click', function(){
  $('#contant-form-error-modal').removeClass('visible');
});



// state

var state = {
  user: {
    Name: undefined,
    IsNameValid: true,
    Phone: undefined,
    IsPhoneValid: true,
    Plan: undefined,
  },
  isSubmitedOnce: false,
};

state.user.Name = undefined;
state.user.Phone = undefined;
state.user.Plan = undefined;


// services

var serviceInfoIdPart = ".service-info-";
var serviceInfoTypes = [
  "light",
  "standard",
  "luxe"
];


serviceInfoTypes.forEach(function(serviceInfoType) {
  $(serviceInfoIdPart + serviceInfoType).on("click", function() {
      state.user.Plan = serviceInfoType;
    });
});

// details..

var postRequest = function(url, formData) {
  var data = JSON.stringify(formData);
  return fetch(url, {
    method : "POST",
    body: data,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

var sendToTelegram = function(text) {
  console.log("Sending to telegram: " + text);
  return postRequest("http://18.196.167.26:7899/api/messages/SendMessage",
  {
    Text: text
  });
};

var isNullOrUndefinedOrEmpty = function (text) {
  return text == null || text == undefined || text == "";
}

var updateInvalidClass = function (elemId, isValid) {
  let elem = $(elemId);
  let elemError = $(elemId + userInputErrorPartOfId);
  if (isValid && elem.hasClass(userInputInvalidClass)) {
    elem.removeClass(userInputInvalidClass);
    elemError.removeClass("visible");
  } else if (!isValid && !elem.hasClass(userInputInvalidClass)) {
    elem.addClass(userInputInvalidClass);
    elemError.addClass("visible");
  }
}


//tabs


function openPhotos(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active-tab", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active-tab";
}
