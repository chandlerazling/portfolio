var setup = function() {
  $(".main-container").height($(window).innerHeight());
  if ($("#persona-container")) {
    $("#persona-container").height($("#user-persona-3").offset().top + $("#user-persona-3").height() - $('#user-persona-1').offset().top);
  }
}

$("nav li").click(function() {
  var section = $(this).data('section');
  $(".main-container").velocity("fadeOut", function() {window.location.href = "index.html#" + section});
})
$(window).load( function() {
  $(".main-container").velocity("fadeIn");
  setup();
  $(window).resize( function() {
    setup();
  });
  });