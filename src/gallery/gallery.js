'use strict';

(function() {
  var galleryContainer = document.querySelector('.overlay-gallery');
  var currentPictureContainer = document.querySelector('.overlay-gallery-preview');
  var btnCloseGallery = document.querySelector('.overlay-gallery-close');
  var photoGallery = document.querySelector('.photogallery');
  var TotalPhotos = document.querySelector('.preview-number-total');
  var photoNumberCurrent = document.querySelector('.preview-number-current');
  var btnShowPrevImage = document.querySelector('.overlay-gallery-control-left');
  var btnShowNextImage = document.querySelector('.overlay-gallery-control-right');
  var overlayGallery = [];
  var numberOfPhoto;
  var showCurrentImage;
  var showCurrentNumber;
  var currentId;
  var numberNull;

  var galleryLoop = function() {
    overlayGallery = [].map.call(document.querySelectorAll('.photogallery img'), function(img, i) {
      img.id = 'img-' + i;
      if (img.classList.contains('overlay-image-active')) {
        img.classList.remove('overlay-image-active');
      }
      return img.src;
    });
  };

  var getGallery = function(_numberOfPhoto) {
    var checkImage = document.querySelector('.overlay-gallery-preview > img');

    if (checkImage) {
      currentPictureContainer.removeChild(checkImage);
    }

    var getPicture = new Image();

    currentPictureContainer.appendChild(getPicture);
    getPicture.src = overlayGallery[_numberOfPhoto];
    photoNumberCurrent.textContent = _numberOfPhoto + 1;
    TotalPhotos.textContent = overlayGallery.length;
    galleryContainer.classList.remove('invisible');
  };

  var KeyClose = function(evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {      
      closeGallery();
    }
  };

  var clickClose = function(evt) {
    evt.preventDefault();    
    closeGallery();
  };

  var getCurrentImage = function() {
    showCurrentImage = document.querySelector('.overlay-image-active');
    showCurrentNumber = showCurrentImage.id.split('-')[1];
  };

  var showAnotherImage = function(_getNumber) {
    galleryLoop();
    getGallery(_getNumber);
    currentId = document.getElementById('img-' + _getNumber);
    currentId.classList.add('overlay-image-active');
  };

  var showPrevImage = function(evt) {
    evt.preventDefault();
    getCurrentImage();
    numberNull = showCurrentNumber - 1;
    if (showCurrentNumber > 0) {
      showAnotherImage(numberNull);
    }
  };

  var showNextImage = function(evt) {
    evt.preventDefault();
    getCurrentImage();
    numberNull = parseFloat(showCurrentNumber) + 1;
    if (overlayGallery.length - 1 > showCurrentNumber) {
      showAnotherImage(numberNull);
    }
  };

  var closeGallery = function() {
    galleryContainer.classList.add('invisible');
    window.removeEventListener('keydown', KeyClose);
    btnCloseGallery.removeEventListener('click', clickClose);
    photoGallery.removeEventListener('click', photoGallery);
    btnShowPrevImage.removeEventListener('click', showPrevImage);
    btnShowNextImage.removeEventListener('click', showNextImage);
  };

  module.exports = {
    showGallery: function showGallery(evt) {
      evt.preventDefault();
      galleryLoop();
      numberOfPhoto = parseFloat(numberOfPhoto);
      if (evt.target.tagName === 'IMG') {
        evt.target.classList.add('overlay-image-active');
        if (evt.target.id.length === 5) {
          numberOfPhoto = +evt.target.id.split('-')[1];
        } else if (evt.target.id.length === 6) {
          numberOfPhoto = +evt.target.id.split('-')[2];
        } else if (evt.target.id.length === 7) {
          numberOfPhoto = +evt.target.id.split('-')[3];
        }
        getGallery(numberOfPhoto);
        window.addEventListener('keydown', KeyClose);
        btnCloseGallery.addEventListener('click', clickClose);
        btnShowPrevImage.addEventListener('click', showPrevImage);
        btnShowNextImage.addEventListener('click', showNextImage);
      }
    }
  };
})();

