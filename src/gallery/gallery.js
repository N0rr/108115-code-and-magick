'use strict';

(function() {
  var galleryContainer = document.querySelector('.overlay-gallery');
  var currentPictureContainer = document.querySelector('.overlay-gallery-preview');
  var btnCloseGallery = document.querySelector('.overlay-gallery-close');
  var photos = document.querySelectorAll('section > a > img');
  var photoNumberCurrent = document.querySelector('.preview-number-current');
  var btnShowPrevImage = document.querySelector('.overlay-gallery-control-left');
  var btnShowNextImage = document.querySelector('.overlay-gallery-control-right');

  var Gallery = function() {
    var self = this;
    this.overlayGallery = [];

    self.galleryLoop = function() {
      for (var i = 0; i < self.overlayGallery.length; i++) {
        if (photos[i].classList.contains('overlay-image-active')) {
          photos[i].classList.remove('overlay-image-active');
        }
      }
    };

    self.overlayGallery = Array.prototype.map.call(photos, function(img, i) {
      img.id = 'img-' + i;
      return img.getAttribute('src');
    });

    self.getGallery = function(imgNumber, _numberOfPhoto) {
      var checkImage = document.querySelector('div[class=overlay-gallery-preview] > img');
      if (checkImage) {
        currentPictureContainer.removeChild(checkImage);
      }

      self.getPicture = new Image();

      currentPictureContainer.appendChild(self.getPicture);
      self.getPicture.src = self.overlayGallery[imgNumber];
      photoNumberCurrent.textContent = _numberOfPhoto + 1;
      galleryContainer.classList.remove('invisible');
    };

    this.closeGallery = function(evt) {
      evt.preventDefault();
      galleryContainer.classList.add('invisible');
      self.remove();
    };

    this.keyCloseGallery = function(evt) {
      evt.preventDefault();
      if (evt.keyCode === 27) {
        galleryContainer.classList.add('invisible');
        self.remove();
      }
    };

    this.showGallery = function(evt) {
      evt.preventDefault();
      if (evt.target.tagName === 'IMG') {
        evt.target.classList.add('overlay-image-active');
        if (evt.target.id.length === 5) {
          self.numberOfPhoto = +evt.target.id.slice(-1);
        }
        self.getGallery(self.numberOfPhoto, self.numberOfPhoto);

        window.addEventListener('keydown', self.keyCloseGallery);
        btnCloseGallery.addEventListener('click', self.closeGallery);
        btnShowPrevImage.addEventListener('click', self.clickBtnShowPrevImage);
        btnShowNextImage.addEventListener('click', self.clickBtnShowNextImage);
      }
    };

    this.getCurrentImage = function() {
      self.showCurrentImage = document.querySelector('.overlay-image-active');
      self.showCurrentNumber = self.showCurrentImage.id.slice(-1);
    };

    this.showAnotherImage = function(_getNumber) {
      self.getGallery(_getNumber, _getNumber);
      self.galleryLoop();
      self.currentId = document.getElementById('img-' + _getNumber);
      self.currentId.classList.add('overlay-image-active');
    };

    this.clickBtnShowPrevImage = function(evt) {
      evt.preventDefault();
      self.getCurrentImage();
      self.numberNull = self.showCurrentNumber - 1;
      if (self.showCurrentNumber > 0) {
        self.showAnotherImage(self.numberNull);
      }
    };

    this.clickBtnShowNextImage = function(evt) {
      evt.preventDefault();
      self.getCurrentImage();
      self.numberNull = parseFloat(self.showCurrentNumber) + 1;
      if (self.overlayGallery.length - 1 > self.showCurrentNumber) {
        self.showAnotherImage(self.numberNull);
      }
    };

    this.getHashImage = function(evt) {
      if (evt.target.tagName === 'IMG') {
        var targetImg = evt.target.src;
        location.hash = location.hash.indexOf(targetImg);
        
      }      
    };    

    this.remove = function() {
      btnShowPrevImage.removeEventListener('click', self.clickBtnShowPrevImage);
      btnShowNextImage.removeEventListener('click', self.clickBtnShowNextImage);
      window.removeEventListener('keydown', self.keyCloseGallery);
      btnCloseGallery.removeEventListener('click', self.closeGallery);
      self.galleryLoop();
    };
  };

  module.exports = new Gallery();
})();
