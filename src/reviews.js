'use strict';

(function() {
  var reviewFilter = document.querySelector('.reviews-filter');
  var reviewContainer = document.querySelector('.reviews-list');
  var templateReview = document.querySelector('#review-template');
  var imgTimeOut = 10000;
  var reviewClone;

  reviewFilter.classList.add('invisible');

  if ('content' in templateReview) {
    reviewClone = templateReview.content.querySelector('.review');
  } else {
    reviewClone = templateReview.querySelector('.review');
  }

  var getReview = function(data, container) {
    var clone = reviewClone.cloneNode(true);

    reviewFilter.classList.remove('invisible');
    clone.querySelector('.review-text').textContent = data.description;
    container.appendChild(clone);

    var PhotoAvatar = new Image();
    var avatarLoadTimeout;

    PhotoAvatar.onload = function(evt) {
      clearTimeout(avatarLoadTimeout);
      clone.querySelector('.review-author').src = evt.target.src;
      clone.querySelector('.review-author').width = 124;
      clone.querySelector('.review-author').height = 124;
    };

    PhotoAvatar.onerror = function() {
      clone.classList.add('review-load-failure');
    };

    PhotoAvatar.src = data.author.picture;
    avatarLoadTimeout = setTimeout(function() {
      PhotoAvatar.src = '';
      clone.classList.add('review-load-failure');
    }, imgTimeOut);
    return clone;
  };

  window.reviews.forEach(function(review) {
    getReview(review, reviewContainer);
  });
})();
