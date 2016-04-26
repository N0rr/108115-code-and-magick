'use strict';

(function() {
  var gallery = require('./gallery');
  var photoGallery = document.querySelector('.photogallery');

  photoGallery.addEventListener('click', gallery.showGallery);
})();
