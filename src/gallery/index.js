'use strict';

(function() {
  var photoGallery = document.querySelector('.photogallery');
  var Gallery = require('./gallery');

  photoGallery.addEventListener('click', Gallery.showGallery);
})();
