

$('nav li').hover(function(event) { $(this).velocity({scaleX: 1.1, scaleY:1.1},{duration: 250, easing: [0.33, 0.23, 0.13, 1.3]})},
 function(event) {$(this).velocity({scaleX: 1, scaleY:1},{duration: 200, easing: [0.33, 0.23, 0.13, 1.3]})});

$('nav li').click(function(event) {
  $(this).css({transform: 'scaleX(1) scaleY(1)'});
  if ($('.hero-container').is(':visible')) {
    $('.hero-container').velocity('slideUp', {easing: [0.6, -0.28, 0.735, 0.045]}, {duration: 800}, function() {$('.hero-container').hide()});
    $('nav li').velocity({top:0}, {delay: 200});
    $('.'+$(this).data('section')).velocity('scroll', {container: $('.main-container')});
    $('#artwork-grid').load();
    $('.main-container').velocity({opacity: '1'}, {delay: 800});
  } else {
    $('.'+$(this).data('section')).velocity('scroll', {container: $('.main-container'), easing: 'easeOutExpo', duration: 500});
  }
  $('.active').removeClass('active');
  $(this).addClass('active');
});

var findClosestSide = function(eventX, eventY, elOffset, elHeight, elWidth) {
  var closest = {};
  var top = Math.abs(eventY - elOffset.top)
  var bottom = Math.abs(eventY - (elOffset.top + elHeight));
  var left = Math.abs(eventX - elOffset.left);
  var right = Math.abs(eventX - (elOffset.left + elWidth));
  closest[top] = 'top';
  closest[bottom] = 'bottom';
  closest[left] = 'left';
  closest[right] = 'right';
  return closest[Math.min(top,bottom, left, right)];

}
$('.thumbnail').hover(function(event) {
  var amount = 6;
  var dur = 200;
  var easing = [0.175, 0.885, 0.32, 1.275];
  switch(findClosestSide(event.pageX, event.pageY, $(this).offset(), $(this).height(), $(this).width())) {
    case 'top':
      $(this).velocity({translateY: amount}, {duration: dur, easing: easing});
      break;
    case 'bottom':
      $(this).velocity({translateY: -1 * amount}, {duration: dur, easing: easing});
      break;
    case 'left':
      $(this).velocity({translateX: amount}, {duration: dur, easing: easing});
      break;
    case 'right':
      $(this).velocity({translateX: -1 * amount}, {duration: dur, easing: easing});
      break;
    default: 
      break;
  }

}, function(event) {
  $(this).velocity({translateX:0, translateY:0}, {duration: 200, easing: [0.175, 0.885, 0.32, 1.275]});
});

$('.thumbnail').click(function(event) {
  $('#artwork-grid').velocity({scaleX: 0, scaleY: 0}, {easing: 'easeInQuart', duration: 400});
  $('#artwork-grid').velocity('fadeOut');
  currentArtworkNumber = $(this).data('num');
  $('#first-artwork').attr('src', getArtURL(currentArtworkNumber));
  $('#full-artwork').velocity('fadeIn', {delay: 800, easing: 'easeInQuart'});

});

var currentArtworkNumber = 0;

var getNextArtworkNumber = function() {
  var nextArtworkNumber = currentArtworkNumber + 1;
  if (nextArtworkNumber > 12) {
    nextArtworkNumber = 1;
  }
  return nextArtworkNumber;
}

var getPreviousArtworkNumber = function() {
  var prevArtworkNumber = currentArtworkNumber - 1;
  if (prevArtworkNumber == 0) {
    prevArtworkNumber = 12;
  }
  return prevArtworkNumber;
}

var getArtURL = function(num) {
  return 'artwork/'+num+'.png';
}

$('#next').click(function(event) {
  currentArtworkNumber = getNextArtworkNumber();
  var currentArtwork = $('#second-artwork');
  var nextArtwork = $('#first-artwork');
  $('#first-artwork').attr('src', getArtURL(currentArtworkNumber));
  /*
  if ($('#second-artwork').attr('src') === '') {
    currentArtwork = $('#first-artwork');
    nextArtwork = $('#second-artwork');
  }
  $('.artwork').velocity('scroll', {container: $('.main-container')});
  nextArtwork.attr('src', getArtURL(currentArtworkNumber));
  currentArtwork.velocity({right: $(window).width(),}, {duration: 500, delay: 500, complete: function() {
      currentArtwork.attr('src', '');
      currentArtwork.css({opacity: 0});
      nextArtwork.css({left: $(window).width()+ 20, opacity: 1}).velocity({left:0});
    }}); */

});

$('#previous').click(function(event) {
  currentArtworkNumber = getPreviousArtworkNumber();
  $('#full-artwork-img').velocity({opacity:0}, function() {$('#full-artwork-img').attr('src', getArtURL(currentArtworkNumber));});
  $('#full-artwork-img').velocity({opacity:1}, {delay: 1000, complete: function() {$('.artwork').velocity('scroll',{container:$('.main-container'), duration: 100})}});
});
$(window).load(function() {

  $('nav li').css({top: $(window).height() +20 , display:'inline-block'});
  var linkTop = ($('.hero-container').offset().top + $('.hero-container').height() + 30);
  var linkCurve = [0.33, 0.23, 0.13, 1.3];
  var linkDelay = 700;
  $('.first-link').velocity({top: linkTop},{duration: 800, easing: linkCurve, delay: linkDelay});
  $('.second-link').velocity({top:linkTop},{duration: 600, easing: linkCurve, delay: linkDelay});
  $('.third-link').velocity({top:linkTop},{duration: 400, easing: linkCurve, delay: linkDelay});
  $('.fourth-link').velocity({top:linkTop},{duration: 200, easing: linkCurve, delay: linkDelay});
  $('#artwork-grid').load();
});
