'use strict';

var photoGallery = document.querySelector('.photogallery');
var gallery = require('./gallery');

photoGallery.addEventListener('click', gallery.setHashImage);
