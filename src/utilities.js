'use strict';

module.exports = {

  /*ajax*/

  getDataAjax: function getDataAjax(callback, url) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function(evt) {
      var dataReviews = JSON.parse(evt.target.response);
      callback(null, dataReviews);
    });

    xhr.addEventListener('error', function() {
      callback(true);
    });

    xhr.timeout = 10000;
    xhr.addEventListener('timeout', function() {
      callback(true);
    });

    xhr.open('GET', url);
    xhr.send();
  },

  /*Проверка элемента на видимость в окне*/

  iSeeYou: function iSeeYou(block) {
    return block.getBoundingClientRect().bottom >= 0;
  },

  /*Создать новое изображение*/

  createNewImage: function createNewImage(imageURL, callback) {
    var timeOut = 10000;

    var image = new Image();
    var imageLoadTimeOut;

    image.addEventListener('load', function() {
      clearTimeout(imageLoadTimeOut);
      callback();
    });

    image.addEventListener('error', function() {
      callback(true);
    });

    imageLoadTimeOut = setTimeout(function() {
      callback(true);
      image.src = '';
    }, timeOut);

    image.src = imageURL;
  }
};
