var setup = function() {
  $(".main-container").height($(window).innerHeight());
  if ($("#persona-container")) {
    $("#persona-container").height($("#user-persona-3").offset().top + $("#user-persona-3").height() - $('#user-persona-1').offset().top);
  }
}
$('.case-study-button').hover(function(event) {
  pulse($(this), 1.1);
}, function(event) {
  pulse($(this), 1);
});
$('.case-study-button').click(function() {
    var location = '';
    switch($(this).attr('id')) {
      case 'quickbites':
        location = "quickbites.html";
        break;
      case 'artbox':
        location = "artbox.html";
        break;
      case 'vivatrix':
        location = "vivatrix.html";
        break;
      case 'tempyr':
        location = "tempyr.html";
        break;
      }
    $(".main-container").velocity("fadeOut", {duration: 500, complete: function(){window.location.href = location;}});
    });
$("nav li").click(function() {
  var section = $(this).data('section');
  $(".main-container").velocity("fadeOut", function() {window.location.href = "index.html#" + section});
});

$(window).load( function() {
  $(".main-container").velocity("fadeIn");
  setup();
  $(window).resize( function() {
    setup();
  });
  });