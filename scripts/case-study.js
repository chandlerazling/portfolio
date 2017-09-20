var setup = function() {
  $(".main-container").height($(window).innerHeight());
  if ($("#persona-container")) {
    $("#persona-container").height($("#user-persona-3").offset().top + $("#user-persona-3").height() - $('#user-persona-1').offset().top);
  }
}
$(window).load( function() {
  setup();
  $(window).resize( function() {
    setup();
  });
  });