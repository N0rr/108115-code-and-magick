'use strict';

(function() {
  var galleryContainer = document.querySelector('.overlay-gallery');
  var currentPictureContainer = document.querySelector('.overlay-gallery-preview');
  var btnCloseGallery = document.querySelector('.overlay-gallery-close');
  var photos = document.querySelectorAll('section > a > img');
  var photoNumberCurrent = document.querySelector('.preview-number-current');
  var btnShowPrevImage = document.querySelector('.overlay-gallery-control-left');
  var btnShowNextImage = document.querySelector('.overlay-gallery-control-right');
  var totalPhotos = document.querySelector('.preview-number-total');
  var pathPhoto = '#photo/';

  var Gallery = function() {
    var self = this;
    this.overlayGallery = [];
    this.urlCheck = /#photo\/(\S+)/;

    self.overlayGallery = Array.prototype.map.call(photos, function(img) {
      return img.getAttribute('src');
    });

    self.getGallery = function(_numberOfPhoto, currentSrc) {
      var checkImage = document.querySelector('.overlay-gallery-preview > img');
      if (checkImage) {
        currentPictureContainer.removeChild(checkImage);
      }

      self.getPicture = new Image();

      currentPictureContainer.appendChild(self.getPicture);
      self.getPicture.src = currentSrc;
      photoNumberCurrent.textContent = parseFloat(_numberOfPhoto) + 1;
      totalPhotos.textContent = self.overlayGallery.length;
      galleryContainer.classList.remove('invisible');
    };

    this.closeGallery = function() {
      galleryContainer.classList.add('invisible');
      self.remove();
      location.hash = '';
    };

    this.keyCloseGallery = function(evt) {
      evt.preventDefault();
      if (evt.keyCode === 27) {
        galleryContainer.classList.add('invisible');
        self.remove();
        location.hash = '';
      }
    };

    self.showGallery = function(numberOfPhoto, _currentSrc) {
      self.getGallery(numberOfPhoto, _currentSrc);

      window.addEventListener('keydown', self.keyCloseGallery);
      btnCloseGallery.addEventListener('click', self.closeGallery);
      btnShowPrevImage.addEventListener('click', self.clickBtnShowPrevImage);
      btnShowNextImage.addEventListener('click', self.clickBtnShowNextImage);
    };

    this.clickBtnShowPrevImage = function(evt) {
      evt.preventDefault();
      if (self.imgNumber > 0) {
        self.showCurrenImg = self.overlayGallery[self.imgNumber - 1];
        self.saveHashImage(self.showCurrenImg);
      } else {
        self.currentImgNumber = self.imgNumber + self.overlayGallery.length;
        self.currentImgNumber = self.currentImgNumber - 1;
        self.saveHashImage(self.overlayGallery[self.currentImgNumber]);
      }
    };

    this.clickBtnShowNextImage = function(evt) {
      evt.preventDefault();
      if (self.overlayGallery.length - 1 > self.imgNumber) {
        self.showCurrenImg = self.overlayGallery[self.imgNumber + 1];
        self.saveHashImage(self.showCurrenImg);
      } else {
        self.currentImgNumber = self.imgNumber - self.overlayGallery.length;
        self.currentImgNumber = self.currentImgNumber + 1;
        self.saveHashImage(self.overlayGallery[self.currentImgNumber]);
      }
    };

    this.setHashImage = function(evt) {
      evt.preventDefault();
      if (evt.target.tagName === 'IMG') {
        self.targetSrc = evt.target.getAttribute('src');
        self.saveHashImage(self.targetSrc);
      }
    };

    this.getHachImage = function() {
      var currentHash = location.hash;
      var checkURL = currentHash.match(self.urlCheck);
      if (checkURL) {
        self.imgNumber = self.overlayGallery.indexOf(checkURL[1]);

        if (self.imgNumber !== -1) {
          self.showGallery(self.imgNumber, checkURL[1]);
        } else {
          self.closeGallery();
        }
      }
    };

    this.saveHashImage = function(_targetImage) {
      var currentUrl;
      if (_targetImage) {
        currentUrl = pathPhoto + _targetImage;
      } else {
        currentUrl = '';
      }
      location.hash = currentUrl;
    };

    this.remove = function() {
      btnShowPrevImage.removeEventListener('click', self.clickBtnShowPrevImage);
      btnShowNextImage.removeEventListener('click', self.clickBtnShowNextImage);
      window.removeEventListener('keydown', self.keyCloseGallery);
      btnCloseGallery.removeEventListener('click', self.closeGallery);
    };

    window.addEventListener('hashchange', self.getHachImage);
    window.addEventListener('load', self.getHachImage);
  };

  module.exports = new Gallery();
})();
