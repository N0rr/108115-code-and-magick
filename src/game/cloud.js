'use strict';

var utilities = require('../utilities');

window.addEventListener('scroll', function() {
  var headerClouds = document.querySelector('.header-clouds');
  var headerContainer = document.querySelector('header');
  var headerPosition = headerContainer.getBoundingClientRect();
  var headerTop = headerPosition.top;
  var scrollTimeout;
  var headerDefaultPosition = 440;

  var HeaderVisibility = utilities.iSeeYou(headerClouds);

  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(function() {
    if (HeaderVisibility) {
      headerClouds.style.backgroundPosition = headerDefaultPosition - headerTop + 'px';
    } else if (!HeaderVisibility) {
      headerClouds.style.backgroundPosition = headerDefaultPosition;
    }
  }, 40);
});
