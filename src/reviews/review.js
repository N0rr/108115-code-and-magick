'use strict';

(function() {
  var utilities = require('../utilities');

  var templateReview = document.querySelector('#review-template');
  var reviewClone;

  if ('content' in templateReview) {
    reviewClone = templateReview.content.querySelector('.review');
  } else {
    reviewClone = templateReview.querySelector('.review');
  }

  var Review = function(data, container) {
    var reviewQuizAnswer = 'review-quiz-answer';
    this.data = data;

    this.getReview = function() {

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

    this.onClickReviewQuiz = function(evt) {
      if (evt.target.classList.contains(reviewQuizAnswer)) {
        evt.preventDefault();
        evt.target.classList.add('review-quiz-answer-active');
      }
    };

    this.element = this.getReview(this.data, container);

    this.remove = function() {
      this.element.removeEventListener('click', this.onClickReviewQuiz);
      this.element.parentNode.removeChild(this.element);
    };

    this.element.addEventListener('click', this.onClickReviewQuiz);

  };
  module.exports = Review;
})();
