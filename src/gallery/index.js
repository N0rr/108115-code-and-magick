'use strict';

(function() {
  var gallery = require('./gallery');
  var photoGallery = document.querySelector('.photogallery');

  gallery.getGallery();
  photoGallery.addEventListener('click', gallery.showGallery);
})();
