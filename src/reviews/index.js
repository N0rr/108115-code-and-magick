'use strict';

(function() {
  var utilities = require('../utilities');

  var reviewContainer = document.querySelector('.reviews-list');
  var reviewsDataURL = '//o0.github.io/assets/json/reviews.json';
  var reviewsMoreButton = document.querySelector('.reviews-controls-more');
  var reviewsBlock = document.querySelector('.reviews');
  var reviewFilter = document.querySelector('.reviews-filter');
  var hash1;
  
  var oldLocation = location;
  var changeLocation = function() {
    location.hash.replace
  };
  

  /*review*/
  reviewFilter.classList.add('invisible');

  var reviews = [];
  var filtredReviews = [];
  var renderedReviews = [];

  var Review = require('./review');
  /*
   * @constant {number}
   */

  var PAGE_SIZE = 3;
  var PAGE_NUMBER = 0;

  var isNextPageAvailable = function(_reviews, _page, pagesize) {
    return _page < Math.floor(_reviews.length / pagesize);
  };

  var renderReviews = function(putReviews, page, replace) {
    if (replace) {
      renderedReviews.forEach(function(review) {
        review.remove();
      });

      renderedReviews = [];
    }

    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;

    putReviews.slice(from, to).forEach(function(review) {
      renderedReviews.push(new Review(review, reviewContainer));
    });

    reviewFilter.classList.remove('invisible');
    if (to < putReviews.length) {
      reviewsMoreButton.classList.remove('invisible');
    } else {
      reviewsMoreButton.classList.add('invisible');
    }
  };
  
  var locationData = function(_hash) {
    location.hash = location.hash.indexOf(_hash) !== -1 ? '' : _hash;
  };
  var filters = {
    ALL: 'reviews-all', 
    RECENT: 'reviews-recent', 
    GOOD: 'reviews-good',
    BAD: 'reviews-bad',
    POPULAR: 'reviews-popular'
  };

  var getReviewsFilter = function(putHereReviews, putFilter, _location) {
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

  var checkHash = function(_location) {
    window.addEventListener('hashchange', function() {
      location.hash = location.hash.indexOf(_location) !== -1 ? '' : _hash;
    });
  };

  var setFilterEnabled = function(filter) {
    filtredReviews = getReviewsFilter(reviews, filter, hash1);
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
          locationData(evt.target.id);          
          if (checkHash(evt.target.id)) {
            setFilterEnabled(evt.target.id);
          }                    
        } 
      });
      showMoreReviews();
    }
  }

  reviewsBlock.classList.add('reviews-list-loading');
  utilities.getDataAjax(reviewCallback, reviewsDataURL);
})();
