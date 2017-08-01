

/*artwork titles and media used */
var artworkTitle = ["Santa Barbara","Polson Mountains","Flower Boxes in Yamanashi","Untitled","Cayucos","Into","Sink","Untitled","Fuji Sunflowers","Dissolve","Fly","mermaid character design"],
    artworkMedia = ["Digital", "Digital", "Digital", "Watercolor", "Digital", "Digital", "Oil", "Digital", "Watercolor & Ink", "Digital", "Oil", "Digital"];

/* Pulsing animation for hovering */
var pulse = function(object, scale) {
  object.velocity({scaleX: scale, scaleY:scale},{duration: 250, easing: [0.33, 0.23, 0.13, 1.3]});
}

$('#full-artwork a').hover(function(event) {
  pulse($(this), 1.1);
}, function(event) {pulse($(this),1)});

$('nav li').hover(function(event) { pulse($(this), 1.1)},
 function(event) {pulse($(this), 1)});

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

/* Find what direction mouse came from on hover */
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

/* 'pushing' animation on hover - ie if mouse came from left side of thumbnail, 'push' thumbnail to the right */
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
  currentArtworkNumber = $(this).data('num');
  $('#artwork-title').text(getArtworkTitle(currentArtworkNumber));
  $('#artwork-media').text(getArtworkMedia(currentArtworkNumber));
  if ($('#second-artwork').attr('src') !== '') {
    $('#second-artwork').attr('src', getArtURL(currentArtworkNumber));
  } else {
    $('#first-artwork').attr('src', getArtURL(currentArtworkNumber));
  }
  $('#full-artwork').velocity('fadeIn');
  $('#full-artwork').velocity({top:0}, {easing: 'easeOutQuart'});
});

/* Number (by order of thumbnails) of the artwork currently displayed */
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

var getArtworkTitle = function(num) {
  return artworkTitle[num - 1];
}

var getArtworkMedia = function(num) {
  return artworkMedia[num - 1];
}

$('#next-artwork-btn').click(function(event) {
  currentArtworkNumber = getNextArtworkNumber();
  var currentArtwork = $('#second-artwork');
  var nextArtwork = $('#first-artwork');
  if ($('#second-artwork').attr('src') === '') {
    currentArtwork = $('#first-artwork');
    nextArtwork = $('#second-artwork');
  }
  currentArtwork.velocity({left: -1*currentArtwork.width()}, {duration: 500, complete: function() {
      currentArtwork.attr('src', '');
      currentArtwork.css({opacity: 0});
    }});
  nextArtwork.css({left: $(window).width()+ 20}).attr('src', getArtURL(currentArtworkNumber)).velocity({opacity: 1, left:'50%'}, {duration: 500});
  $('#artwork-title').text(getArtworkTitle(currentArtworkNumber));
  $('#artwork-media').text(getArtworkMedia(currentArtworkNumber));
});
    

$('#previous-artwork-btn').click(function(event) {
  currentArtworkNumber = getPreviousArtworkNumber();
  var currentArtwork = $('#second-artwork');
  var previousArtwork = $('#first-artwork');
  if ($('#second-artwork').attr('src') === '') {
    currentArtwork = $('#first-artwork');
    previousArtwork = $('#second-artwork');
  }
  currentArtwork.velocity({left: $(window).width()}, {complete: function() {
      currentArtwork.attr('src', '');
      currentArtwork.css({opacity: 0});
    }});
  previousArtwork.css({left: -1*previousArtwork.width()}).attr('src', getArtURL(currentArtworkNumber)).velocity({opacity: 1, left:'50%'}, {duration: 500});
  $('#artwork-title').text(getArtworkTitle(currentArtworkNumber));
  $('#artwork-media').text(getArtworkMedia(currentArtworkNumber));
});

$('#exit-artwork-btn').click(function(event) {
  $('#full-artwork').velocity({top: $(window).height() + 20}, {easing: 'easeInQuart', complete: function() {$('#full-artwork').css({display:'none'})}});

})

$(window).load(function() {
  $('nav li').css({top: $(window).height() +20 , display:'inline-block'});
  var linkTop = ($('.hero-container').offset().top + $('.hero-container').height() + 30);
  var linkCurve = [0.33, 0.23, 0.13, 1.3];
  var linkDelay = 700;
  $('.first-link').velocity({top: linkTop},{duration: 800, easing: linkCurve, delay: linkDelay});
  $('.second-link').velocity({top:linkTop},{duration: 600, easing: linkCurve, delay: linkDelay});
  $('.third-link').velocity({top:linkTop},{duration: 400, easing: linkCurve, delay: linkDelay});
  $('.fourth-link').velocity({top:linkTop},{duration: 200, easing: linkCurve, delay: linkDelay});
  $('#artwork-grid img').load();
  $('#full-artwork').css({top:$(window).height()+20});
});
