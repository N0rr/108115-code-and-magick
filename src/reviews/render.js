'use strict';

  var renderReviews = function(putReviews, page, replace) {
    if (replace) {
      reviewContainer.innerHTML = '';
    }

    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;

    putReviews.slice(from, to).forEach(function(review) {
      getReview(review, reviewContainer);
    });

    if (to < putReviews.length) {
      reviewsMoreButton.classList.remove('invisible');
    } else {
      reviewsMoreButton.classList.add('invisible');
    }
  };
 
