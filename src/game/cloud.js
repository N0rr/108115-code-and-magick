'use strict';

var utilities = require('../utilities');

document.querySelector('.header-clouds').style.backgroundPositionX = 0;

window.addEventListener('scroll', function() {
  var headerClouds = document.querySelector('.header-clouds');
  var headerContainer = document.querySelector('header');
  var headerPosition = headerContainer.getBoundingClientRect();
  var headerTop = headerPosition.top;
  var scrollTimeout;

  var HeaderVisibility = utilities.iSeeYou(headerClouds);

  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(function() {
    if (HeaderVisibility) {
      headerClouds.style.backgroundPosition = headerTop + 'px';
    } else {
      headerClouds.style.backgroundPosition = 0;
    }
  }, 100);
});
