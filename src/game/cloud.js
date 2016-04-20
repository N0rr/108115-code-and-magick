'use strict';

var utilities = require('../utilities');

document.querySelector('.header-clouds').style.backgroundPosition = 0;

var trigger = true;

window.addEventListener('scroll', function() {
  var headerClouds = document.querySelector('.header-clouds');
  var headerContainer = document.querySelector('header');
  var headerPosition = headerContainer.getBoundingClientRect();
  var headerTop = headerPosition.top;
  var HeaderVisibility = utilities.iSeeYou(headerClouds);

  if (trigger) {
    setTimeout(function() {
      trigger = true;
    }, 100);

    trigger = false;
    if (HeaderVisibility) {
      headerClouds.style.backgroundPosition = headerTop + 'px';
    } else {
      headerClouds.style.backgroundPosition = 0;
    }
  }
});
