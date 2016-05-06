'use strict';

var utilities = require('../utilities');

var reviewContainer = document.querySelector('.reviews-list');
var reviewsDataURL = '//o0.github.io/assets/json/reviews.json';
var reviewsMoreButton = document.querySelector('.reviews-controls-more');
var reviewsBlock = document.querySelector('.reviews');
var reviewFilter = document.querySelector('.reviews-filter');


/*review*/
reviewFilter.classList.add('invisible');

var filtredReviews = [];
var renderedReviews = [];

var Review = require('./review');
/*
 * @constant {number}
 */

var PAGE_SIZE = 3;
var PAGE_NUMBER = 0;

var ReviewLoad = function() {
  this.reviewCallback = this.reviewCallback.bind(this);
  this.reviewFilterChange = this.reviewFilterChange.bind(this);
  this.showMoreReviewsButton = this.showMoreReviewsButton.bind(this);

  utilities.getDataAjax(this.reviewCallback, reviewsDataURL);
};

ReviewLoad.prototype.reviewShow = function() {
  reviewsBlock.classList.add('reviews-list-loading');
};

ReviewLoad.prototype.isNextPageAvailable = function(_reviews, _page, pagesize) {
  return _page < Math.floor(_reviews.length / pagesize);
};

ReviewLoad.prototype.renderReviews = function(putReviews, page, replace) {
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

ReviewLoad.prototype.getReviewsFilter = function(putHereReviews, putFilter) {
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

ReviewLoad.prototype.setFilterEnabled = function(filter) {
  filtredReviews = this.getReviewsFilter(this.reviews, filter);
  PAGE_NUMBER = 0;
  this.renderReviews(filtredReviews, 0, true);
  localStorage.setItem('filter', filter);
};

ReviewLoad.prototype.showMoreReviewsButton = function() {
  if (this.isNextPageAvailable(filtredReviews, PAGE_NUMBER, PAGE_SIZE)) {
    PAGE_NUMBER++;
    this.renderReviews(filtredReviews, PAGE_NUMBER);
  }
};

ReviewLoad.prototype.showMoreReviews = function() {
  if (this.isNextPageAvailable(filtredReviews, PAGE_NUMBER, PAGE_SIZE)) {
    reviewsMoreButton.classList.remove('invisible');
  }
  reviewsMoreButton.addEventListener('click', this.showMoreReviewsButton);
};

ReviewLoad.prototype.reviewFilterChange = function(evt) {
  if (evt.target.checked) {
    this.setFilterEnabled(evt.target.id);
  }
};

ReviewLoad.prototype.reviewCallback = function(error, loadedData) {
  var filterStorage = localStorage.getItem('filter');
  reviewsBlock.classList.remove('reviews-list-loading');
  if (error) {
    reviewsBlock.classList.add('reviews-load-failure');
  } else {
    this.reviews = loadedData;
    filtredReviews = this.reviews;
    this.setFilterEnabled();
    reviewFilter.addEventListener('click', this.reviewFilterChange);
    if (filterStorage) {
      reviewFilter.elements['reviews'].value = filterStorage;
      this.setFilterEnabled(filterStorage);
      this.showMoreReviews();
    } else {
      this.showMoreReviews();
    }
  }
};

module.exports = new ReviewLoad();
