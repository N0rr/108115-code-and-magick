'use strict';

(function() {
  var photoGallery = document.querySelectr('.photogallery');
  var gallery = require('./gallery');

  photoGallery.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'IMG') {
        var targetImg =  evt.target.src.id.split('-')[1];      
        location.hash = location.hash = 'fff';
      }
  });
})();
