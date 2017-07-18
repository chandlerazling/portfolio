

$('nav li').hover(function(event) { $(this).velocity({scaleX: 1.1, scaleY:1.1},{duration: 250, easing: [0.33, 0.23, 0.13, 1.3]})},
 function(event) {$(this).velocity({scaleX: 1, scaleY:1},{duration: 200, easing: [0.33, 0.23, 0.13, 1.3]})});


$(window).load(function() {

  $('nav li').css({top: $(window).height() +20 , display:'inline-block'});
  var linkTop = ($('.hero-container').position().top + $('.hero-container').height() + 20);
  var linkCurve = [0.33, 0.23, 0.13, 1.3];
  var linkDelay = 700;
  $('.first-link').velocity({top: linkTop},{duration: 800, easing: linkCurve, delay: linkDelay});
  $('.second-link').velocity({top:linkTop},{duration: 600, easing: linkCurve, delay: linkDelay});
  $('.third-link').velocity({top:linkTop},{duration: 400, easing: linkCurve, delay: linkDelay});
  $('.fourth-link').velocity({top:linkTop},{duration: 200, easing: linkCurve, delay: linkDelay});
});
