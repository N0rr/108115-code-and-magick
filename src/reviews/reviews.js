'use strict';

(function() {
  var utilities = require('../utilities');

  var reviewFilter = document.querySelector('.reviews-filter');
  var reviewContainer = document.querySelector('.reviews-list');
  var templateReview = document.querySelector('#review-template');
  var reviewsDataURL = '//o0.github.io/assets/json/reviews.json';
  var reviewsMoreButton = document.querySelector('.reviews-controls-more');
  var reviewsBlock = document.querySelector('.reviews');

  var reviewClone;

  var reviews = [];
  var filtredReviews = [];

  /*
   * @constant {number}
   */

  var PAGE_SIZE = 3;
  var PAGE_NUMBER = 0;

  var isNextPageAvailable = function(_reviews, _page, pagesize) {
    return _page < Math.floor(_reviews.length / pagesize);
  };

  reviewFilter.classList.add('invisible');

  if ('content' in templateReview) {
    reviewClone = templateReview.content.querySelector('.review');
  } else {
    reviewClone = templateReview.querySelector('.review');
  }

  var getReview = function(data, container) {
    reviewFilter.classList.remove('invisible');

    var clone = reviewClone.cloneNode(true);
    var photoAvatar = clone.querySelector('.review-author');
    var reviewText = clone.querySelector('.review-text');

    reviewText.textContent = data.description;

    utilities.createNewImage(data.author.picture, function(error) {
      if (error) {
        clone.classList.add('review-load-failure');
      } else {
        photoAvatar.src = data.author.picture;
        photoAvatar.src.width = 124;
        photoAvatar.src.height = 124;
      }
    });

    container.appendChild(clone);

    return clone;
  };

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

  var getReviewsFilter = function(putHereReviews, putFilter) {
    var reviewsToFilter = putHereReviews.slice(0);

    switch (putFilter) {
      case 'reviews-all':
        break;

      case 'reviews-recent':
        reviewsToFilter = reviewsToFilter.filter(function(a) {
          var lastTwoWeeks = new Date();
          lastTwoWeeks.setDate(lastTwoWeeks.getDate() - 14);
          var reviewDate = new Date(a.date);
          return reviewDate > lastTwoWeeks;
        });

        reviewsToFilter.sort(function(a, b) {
          return b.date > a.date;
        });
        break;

      case 'reviews-good':
        reviewsToFilter = reviewsToFilter.filter(function(a) {
          return a.rating > 2;
        });
        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;

      case 'reviews-bad':
        reviewsToFilter = reviewsToFilter.filter(function(a) {
          return a.rating < 3;
        });
        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;

      case 'reviews-popular':
        reviewsToFilter.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }
    return reviewsToFilter;
  };

  var setFilterEnabled = function(filter) {
    filtredReviews = getReviewsFilter(reviews, filter);
    PAGE_NUMBER = 0;
    renderReviews(filtredReviews, 0, true);
  };

  var showMoreReviews = function() {
    if (isNextPageAvailable(filtredReviews, PAGE_NUMBER, PAGE_SIZE)) {
      reviewsMoreButton.classList.remove('invisible');
    }

    reviewsMoreButton.addEventListener('click', function() {
      if (isNextPageAvailable(filtredReviews, PAGE_NUMBER, PAGE_SIZE)) {
        PAGE_NUMBER++;
        renderReviews(filtredReviews, PAGE_NUMBER);
      }
    });
  };

  function reviewCallback(error, loadedData) {
    reviewsBlock.classList.remove('reviews-list-loading');
    if (error) {
      reviewsBlock.classList.add('reviews-load-failure');
    } else {
      reviews = loadedData;
      filtredReviews = reviews;
      setFilterEnabled();
      reviewFilter.addEventListener('click', function(evt) {
        if (evt.target.checked) {
          setFilterEnabled(evt.target.id);
        }
      });
      showMoreReviews();
    }
  }

  reviewsBlock.classList.add('reviews-list-loading');
  utilities.getDataAjax(reviewCallback, reviewsDataURL);
})();
