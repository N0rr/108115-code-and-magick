'use strict';

(function() {
  var reviewFilter = document.querySelector('.reviews-filter');
  var reviewContainer = document.querySelector('.reviews-list');
  var templateReview = document.querySelector('#review-template');
  var reviewsDataURL = '//o0.github.io/assets/json/reviews.json';
  var reviewsMoreButton = document.querySelector('.reviews-controls-more');
  var reviewsBlock = document.querySelector('.reviews');
  var imgTimeOut = 10000;
  var reviewClone;

  reviewFilter.classList.add('invisible');

  if ('content' in templateReview) {
    reviewClone = templateReview.content.querySelector('.review');
  } else {
    reviewClone = templateReview.querySelector('.review');
  }

  var reviews = [];
  var pageSize = 3;
  var pageNumber = 0;
  var filtredReviews = [];

  var isNextPageAvailable = function(_reviews, _page, pagesize) {
    return _page < Math.floor(_reviews.length / pagesize);
  };

  var getReview = function(data, container) {
    reviewFilter.classList.remove('invisible');
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

  var getDataReviews = function(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onloadstart = function() {
      reviewsBlock.classList.add('reviews-list-loading');
    };

    xhr.onload = function(evt) {
      var dataReviews = JSON.parse(evt.target.response);
      callback(dataReviews);
      reviewsBlock.classList.remove('reviews-list-loading');
    };

    xhr.onerror = function() {
      reviewsBlock.classList.remove('reviews-list-loading');
      reviewsBlock.classList.add('reviews-load-failure');
    };

    xhr.timeout = imgTimeOut;
    xhr.ontimeout = function() {
      reviewsBlock.classList.remove('reviews-list-loading');
      reviewsBlock.classList.add('reviews-load-failure');
    };

    xhr.open('GET', reviewsDataURL);
    xhr.send();
  };

  var renderReviews = function(putReviews, page, replace) {
    if (replace) {
      reviewContainer.innerHTML = '';
    }

    var from = page * pageSize;
    var to = from + pageSize;

    putReviews.slice(from, to).forEach(function(review) {
      getReview(review, reviewContainer);
    });
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
    pageNumber = 0;
    renderReviews(filtredReviews, 0, true);
  };

  var setFiltrationEnabled = function() {
    reviewFilter.addEventListener('click', function(evt) {
      if (evt.target.checked) {
        setFilterEnabled(evt.target.id);
        if (isNextPageAvailable(reviews, pageNumber, pageSize)) {
          reviewsMoreButton.classList.remove('invisible');
        }
      }
    });
  };

  var showMoreReviews = function() {
    reviewsMoreButton.classList.remove('invisible');
    reviewsMoreButton.addEventListener('click', function() {
      if (isNextPageAvailable(filtredReviews, pageNumber, pageSize)) {
        pageNumber++;
        renderReviews(filtredReviews, pageNumber);
        reviewsMoreButton.classList.add('invisible');
        if (isNextPageAvailable(filtredReviews, pageNumber, pageSize)) {
          reviewsMoreButton.classList.remove('invisible');
        }
      }
    });
  };

  getDataReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setFilterEnabled();
    setFiltrationEnabled();
    showMoreReviews();
  });
})();
