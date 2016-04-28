'use strict';

(function() {
  var photoGallery = document.querySelector('.photogallery');
  var Gallery = require('./gallery');

  photoGallery.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'IMG') {
        var targetImg =  evt.target.src;      
        location = location.hash.indexOf(targetImg) !== -1 ? '' : targetImg;        
      }
  });
})();
