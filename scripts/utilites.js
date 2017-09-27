/**** PUSHING ANIMATION ******/

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

/*** Push element away based on where mouse came from. Takes in event and the element to be animated ***/
var pushAway = function(event, element) {
  var amount = 6;
  var dur = 200;
  var easing = [0.175, 0.885, 0.32, 1.275];
  switch(findClosestSide(event.pageX, event.pageY, element.offset(), element.height(), element.width())) {
    case 'top':
      element.velocity({translateY: amount}, {duration: dur, easing: easing});
      break;
    case 'bottom':
      element.velocity({translateY: -1 * amount}, {duration: dur, easing: easing});
      break;
    case 'left':
      element.velocity({translateX: amount}, {duration: dur, easing: easing});
      break;
    case 'right':
      element.velocity({translateX: -1 * amount}, {duration: dur, easing: easing});
      break;
    default: 
      break;
  }
};

/*** Return back to original position ***/
var pullBack = function(element) {
  element.velocity({translateX:0, translateY:0}, {duration: 200, easing: [0.175, 0.885, 0.32, 1.275]});
}


/***** PULSE ANIMATION ****/
var pulse = function(object, scale) {
  object.velocity({scaleX: scale, scaleY:scale},{duration: 250, easing: [0.33, 0.23, 0.13, 1.3]});
}


