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
    this.overlayGallery = [];
    this.urlCheck = /#photo\/(\S+)/;

    this.keyCloseGallery = this.keyCloseGallery.bind(this);
    this.closeGallery = this.closeGallery.bind(this);
    this.clickBtnShowNextImage = this.clickBtnShowNextImage.bind(this);
    this.clickBtnShowPrevImage = this.clickBtnShowPrevImage.bind(this);
    this.setHashImage = this.setHashImage.bind(this);

    window.addEventListener('hashchange', this.getHachImage.bind(this));
    window.addEventListener('load', this.getHachImage.bind(this));
  };

  Gallery.prototype.createGallery = function() {
    this.overlayGallery = Array.prototype.map.call(photos, function(img) {
      return img.getAttribute('src');
    });
  };

  Gallery.prototype.getGallery = function(_numberOfPhoto, currentSrc) {
    this.createGallery();
    var checkImage = document.querySelector('.overlay-gallery-preview > img');
    if (checkImage) {
      currentPictureContainer.removeChild(checkImage);
    }

    this.getPicture = new Image();

    currentPictureContainer.appendChild(this.getPicture);
    this.getPicture.src = currentSrc;
    photoNumberCurrent.textContent = parseFloat(_numberOfPhoto) + 1;
    totalPhotos.textContent = this.overlayGallery.length;
    galleryContainer.classList.remove('invisible');
  };

  Gallery.prototype.closeGallery = function() {
    galleryContainer.classList.add('invisible');
    this.remove();
    location.hash = '';
  };

  Gallery.prototype.keyCloseGallery = function(evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      galleryContainer.classList.add('invisible');
      this.remove();
      location.hash = '';
    }
  };

  Gallery.prototype.showGallery = function(numberOfPhoto, _currentSrc) {
    this.getGallery(numberOfPhoto, _currentSrc);

    window.addEventListener('keydown', this.keyCloseGallery);
    btnCloseGallery.addEventListener('click', this.closeGallery);
    btnShowPrevImage.addEventListener('click', this.clickBtnShowPrevImage);
    btnShowNextImage.addEventListener('click', this.clickBtnShowNextImage);
  };

  Gallery.prototype.clickBtnShowPrevImage = function(evt) {
    evt.preventDefault();

    if (this.imgNumber > 0) {
      this.showCurrenImg = this.overlayGallery[this.imgNumber - 1];
      this.saveHashImage(this.showCurrenImg);
    } else {
      this.currentImgNumber = this.imgNumber + this.overlayGallery.length;
      this.currentImgNumber = this.currentImgNumber - 1;
      this.saveHashImage(this.overlayGallery[this.currentImgNumber]);
    }
  };

  Gallery.prototype.clickBtnShowNextImage = function(evt) {
    evt.preventDefault();

    if (this.overlayGallery.length - 1 > this.imgNumber) {
      this.showCurrenImg = this.overlayGallery[this.imgNumber + 1];
      this.saveHashImage(this.showCurrenImg);
    } else {
      this.currentImgNumber = this.imgNumber - this.overlayGallery.length;
      this.currentImgNumber = this.currentImgNumber + 1;
      this.saveHashImage(this.overlayGallery[this.currentImgNumber]);
    }
  };

  Gallery.prototype.setHashImage = function(evt) {
    evt.preventDefault();
    this.createGallery();
    if (evt.target.tagName === 'IMG') {
      this.targetSrc = evt.target.getAttribute('src');
      this.saveHashImage(this.targetSrc);
    }
  };

  Gallery.prototype.getHachImage = function() {

    var currentHash = location.hash;
    var checkURL = currentHash.match(this.urlCheck);

    if (checkURL) {
      this.imgNumber = this.overlayGallery.indexOf(checkURL[1]);

      if (this.imgNumber !== -1) {
        this.showGallery(this.imgNumber, checkURL[1]);
      } else {
        this.closeGallery();
      }
    }
  };

  Gallery.prototype.saveHashImage = function(_targetImage) {
    var currentUrl;

    if (_targetImage) {
      currentUrl = pathPhoto + _targetImage;
    } else {
      currentUrl = '';
    }
    location.hash = currentUrl;
  };

  Gallery.prototype.remove = function() {
    btnShowPrevImage.removeEventListener('click', this.clickBtnShowPrevImage);
    btnShowNextImage.removeEventListener('click', this.clickBtnShowNextImage);
    window.removeEventListener('keydown', this.keyCloseGallery);
    btnCloseGallery.removeEventListener('click', this.closeGallery);
  };

  module.exports = new Gallery();
})();
