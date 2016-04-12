'use strict';

(function() {
  var reviewFilter = document.querySelector('.reviews-filter');
  var reviewContainer = document.querySelector('.reviews-list');
  var templateReview = document.querySelector('#review-template');
  var reviewsDataURL = 'http://o0.github.io/assets/json/reviews.json';
  var imgTimeOut = 2000;
  var reviewClone;

  reviewFilter.classList.add('invisible');
  if ('content' in templateReview) {
    reviewClone = templateReview.content.querySelector('.review');
  } else {
    reviewClone = templateReview.querySelector('.review');
  }

  var reviews = [];
  var getReview = function(data, container) {
    reviewFilter.classList.remove('invisible');
    var clone = reviewClone.cloneNode(true);
    var reviewPreloader = document.createElement('div');
    reviewContainer.appendChild(reviewPreloader);
    reviewPreloader.classList.add('reviews-list-loading');
    reviewFilter.classList.remove('invisible');
    clone.querySelector('.review-text').textContent = data.description;
    reviewContainer.removeChild(reviewPreloader);
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
    }, imgTimeOut);
    return clone;
  };

  var getDataReviews = function(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(evt) {
      var dataReviews = JSON.parse(evt.target.response);
      callback(dataReviews);
    };

    xhr.open('GET', reviewsDataURL);
    xhr.send();
  };

  var renderReviews = function(putReviews) {
    reviewContainer.innerHTML = '';
    putReviews.forEach(function(review) {
      getReview(review, reviewContainer);
    });
  };

  var getReviewsFilter = function(putHereReviews, putFilter) {
    var reviewsToFilter = putHereReviews.slice(0);
    switch (putFilter) {
      case 'reviews-all':
        break;
      case 'reviews-recent':
        reviewsToFilter.sort(function(a, b) {
          return b.date > a.date;
        });
        break;
      case 'reviews-good':
        reviewsToFilter = reviewsToFilter.filter(function(a) {
          return a.rating > 2;
        });
        break;
      case 'reviews-bad':
        reviewsToFilter = reviewsToFilter.filter(function(a) {
          return a.rating < 3;
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
    var filtredReviews = getReviewsFilter(reviews, filter);
    renderReviews(filtredReviews);
  };

  var setFiltrationEnabled = function() {
    var filters = document.getElementsByName('reviews');
    for (var i = 0; i < filters.length; ++i) {
      filters[i].onclick = function() {
        setFilterEnabled(this.id);
      };
    }
  };

  getDataReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setFilterEnabled();
    setFiltrationEnabled();
  });
})();
