'use strict';

var utilities = require('../utilities');

var templateReview = document.querySelector('#review-template');
var reviewQuizAnswer = 'review-quiz-answer';
var reviewClone;

if ('content' in templateReview) {
  reviewClone = templateReview.content.querySelector('.review');
} else {
  reviewClone = templateReview.querySelector('.review');
}

var Review = function(data, container) {
  this.data = data;
  this.element = this.getReview(this.data, container);

  this.element.addEventListener('click', this.onClickReviewQuiz);
  this.onClickReviewQuiz = this.onClickReviewQuiz.bind(this);

};

Review.prototype.getReview = function(_data, _container) {

  var clone = reviewClone.cloneNode(true);

  var photoAvatar = clone.querySelector('.review-author');
  var reviewText = clone.querySelector('.review-text');

  reviewText.textContent = _data.description;

  utilities.createNewImage(_data.author.picture, function(error) {
    if (error) {
      clone.classList.add('review-load-failure');
    } else {
      photoAvatar.src = _data.author.picture;
      photoAvatar.width = 124;
      photoAvatar.height = 124;
    }
  });

  _container.appendChild(clone);

  return clone;
};

Review.prototype.onClickReviewQuiz = function(evt) {
  if (evt.target.classList.contains(reviewQuizAnswer)) {
    evt.preventDefault();
    evt.target.classList.add('review-quiz-answer-active');
  }
};

Review.prototype.remove = function() {
  this.element.removeEventListener('click', this.onClickReviewQuiz);
  this.element.parentNode.removeChild(this.element);
};

module.exports = Review;
