currentImageURL = $('.active-image').css('background-image');
currentImageIndex = currentImageURL.slice(currentImageURL.search('-') + 1, currentImageURL.search(".png"));
mockupCount = 7;
var changeCurrentImageIndex = function(i) {
  var newIndex = parseInt(currentImageIndex) + i;
  if (newIndex <= 0) {
      newIndex = mockupCount;
  } else if (newIndex > mockupCount) {
      newIndex = 1;
  }
  currentImageIndex = newIndex;
}
var changeImage = function(image, direction) {
  if (direction === "next") {
    image.css({"left": $(".slider-screen").width()});
  } else {
    image.css({"left": -1 * $(".slider-screen").width()});
  }
  image.css({"z-index":2, "background-image": "url('./images/artbox/mockup-" + currentImageIndex + ".png')"});
  $('.active-image').css({"z-index": 1});
  image.velocity({left:0});
  $('.active-image').removeClass('active-image').addClass('inactive-image');
  image.removeClass('inactive-image').addClass('active-image');
  $('.active-bullet').removeClass('active-bullet');
  $("#image-slider-nav-bullets").find("[data-index='" + currentImageIndex + "']").addClass('active-bullet');
}
$("#next-arrow").click(function() {
  var nextImage = $(".inactive-image");
  changeCurrentImageIndex(1);
  changeImage(nextImage, "next");
});

$("#previous-arrow").click(function() {
  var prevImage = $(".inactive-image");
  changeCurrentImageIndex(-1);
  changeImage(prevImage, "prev");
});

var setHeight = function() {
  var sliderScreen = $('.image-slider').find(".slider-screen");
  sliderScreen.height(sliderScreen.width()/1440 * 800);
  $('.image-slider').height(sliderScreen.height() + 60);
}

$(document).ready( function() {
  setHeight();
  $(window).resize(function() {
    setHeight();
  });
  for (var i = 1; i < mockupCount + 1; i++) {
    var sliderButton = document.createElement("div");
    $(sliderButton).addClass("slider-nav-bullet");
    $(sliderButton).attr('data-index', i);
    if (i==1) {
      $(sliderButton).addClass('active-bullet');
    }
    $('#image-slider-nav-bullets').append(sliderButton);
  }
  $('.slider-nav-bullet').click(function() {

    if($(this).data('index') > currentImageIndex) {
      currentImageIndex = $(this).data('index');
      changeImage($(".inactive-image"), "next");
    } else if($(this).data('index') < currentImageIndex) {
      currentImageIndex = $(this).data('index');
      changeImage($(".inactive-image"), "prev");
    }
    $(".active-bullet").removeClass('active-bullet');
    $(this).addClass('active-bullet');
  });
});