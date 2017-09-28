/*artwork titles and media used */
var artworkTitle = ["Santa Barbara","Polson Mountains","Flower Boxes in Yamanashi","Untitled","Cayucos","Into","Sink","Untitled","Fuji Sunflowers","Dissolve","Fly","mermaid character design"],
    artworkMedia = ["Digital", "Digital", "Digital", "Watercolor", "Digital", "Digital", "Oil", "Digital", "Watercolor & Ink", "Digital", "Oil", "Digital"];

/*Pulse animation on artwork button hover */
$('#full-artwork a').hover(function(event) {
  pulse($(this), 1.1);
}, function(event) {pulse($(this),1)});


/*** SECTIONS ****/
var userScroll = true;
var currentSection = "";
var sectionsList = ['about', 'ux-work', 'artwork', 'contact'];
var goToSection = function(section) {
  userScroll = false;
  $('.' + section).velocity('scroll', {container: $('.main-container'), easing: 'easeInSine', duration: 500, complete: function() {userScroll = true;}});
  $('.active').removeClass('active');
  $('nav li[data-section="'+section+'"]').addClass('active');
  currentSection = section;
}

var getNextSection = function() {
  var nextIndex = (sectionsList.indexOf(currentSection) + 1) % sectionsList.length;
  return sectionsList[nextIndex];
}

var getPreviousSection = function() {
  var prevIndex = (sectionsList.indexOf(currentSection) - 1);
  if (prevIndex == -1) {
    prevIndex = sectionsList.length - 1;
  }
  return sectionsList[prevIndex];
}



$('nav li').hover(function(event) { pulse($(this), 1.1)},
 function(event) {pulse($(this), 1)});

$('nav li').click(function(event) {
  $(this).css({transform: 'scaleX(1) scaleY(1)'});
  if ($(this).data('section') == 'contact') {
    if ($('#return-message').text() !== '') {
        $('#return-message').text('');
        $('#contact-form').show();
    }
  }
  if ($('.hero-container').is(':visible')) {
    $('.hero-container').velocity('slideUp', {easing: [0.6, -0.28, 0.735, 0.045]}, {duration: 800}, function() {$('.hero-container').hide()});
    $('nav li').velocity({top:0}, {delay: 200});
    goToSection($(this).data('section'));
    $('#artwork-grid').load();
    $('.main-container').velocity({opacity: '1'}, {delay: 800});
  } else {
    goToSection($(this).data('section'));
  }
});

$('.case-study-button').hover(function(event) {
  pulse($(this), 1.1);
}, function(event) {
  pulse($(this), 1);
});



/* 'pushing' animation on hover - ie if mouse came from left side of thumbnail, 'push' thumbnail to the right */
$('.thumbnail').hover(function(event) {
    pushAway(event, $(this));
}, function(event) {
    pullBack($(this));
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

$(document).ready(function() {
  $('#artwork-grid img ').load();
  $('#full-artwork').css({top:$(window).height()+20});
  var section = window.location.href.slice(window.location.href.search('#')+1, window.location.href.length);
  if ($.inArray(section, sectionsList) !== -1) {
    $(".hero-container").hide();
    $('nav li').css({top:0, display:'inline-block'});
    goToSection(section);
    $('#artwork-grid').load();
    $('.main-container').velocity({opacity: '1'}, {delay: 800, duration: 500});
  } else {
    $('.hero-container').velocity('fadeIn');
    $('nav li').css({top: $(window).height() +20 , display:'inline-block'});
    var linkTop = ($('.hero-container').offset().top + $('.hero-container').height() + 30);
    var linkCurve = [0.33, 0.23, 0.13, 1.3];
    var linkDelay = 700;
    $('.first-link').velocity({top: linkTop},{duration: 800, easing: linkCurve, delay: linkDelay});
    $('.second-link').velocity({top:linkTop},{duration: 600, easing: linkCurve, delay: linkDelay});
    $('.third-link').velocity({top:linkTop},{duration: 400, easing: linkCurve, delay: linkDelay});
    $('.fourth-link').velocity({top:linkTop},{duration: 200, easing: linkCurve, delay: linkDelay});
  }

  /*
  $('.main-container').scroll(function() {
    if (userScroll) {
      var nextSection = getNextSection();
      var previousSection = getPreviousSection();
      console.log(previousSection);
      if(nextSection !== "about" && ($('#' + nextSection).offset().top < $(window).height())) {
        goToSection(nextSection);
      }  else if (previousSection !== "contact" && ($('#' + previousSection).offset().top + $('#' + previousSection).height() + $('nav').height()) > 10) {
        goToSection(previousSection);
      }
    }

  });  */

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
  })
});
