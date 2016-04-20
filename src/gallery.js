'use strict';

(function() {
  var galleryContainer = document.querySelector('.overlay-gallery');
  var currentPictureContainer = document.querySelector('.overlay-gallery-preview');
  var btnCloseGallery = document.querySelector('.overlay-gallery-close');
  var photoGallery = document.querySelector('.photogallery');
  var photos = document.querySelectorAll('section > a > img');
  var photoNumberCurrent = document.querySelector('.preview-number-current');
  var btnShowPrevImage = document.querySelector('.overlay-gallery-control-left');
  var btnShowNextImage = document.querySelector('.overlay-gallery-control-right');
  var overlayGallery = [{}];
  var numberOfPhoto;
  var showCurrentImage;
  var showCurrentNumber;
  var currentId;
  var numberNull;

  var galleryLoop = function(_photos, _overlayGallery) {
    for (var i = 0; i < _photos.length; i++) {
      _overlayGallery[i] = _photos[i].getAttribute('src');
      _photos[i].id = 'img-' + [i];

      if (_photos[i].classList.contains('overlay-image-active')) {
        _photos[i].classList.remove('overlay-image-active');
      }
    }
  };

  var getGallery = function(imgNumber, _numberOfPhoto) {
    var checkImage = document.querySelector('div[class=overlay-gallery-preview] > img');

    if (checkImage) {
      currentPictureContainer.removeChild(checkImage);
    }

    var getPicture = new Image();

    currentPictureContainer.appendChild(getPicture);
    getPicture.src = overlayGallery[imgNumber];
    photoNumberCurrent.textContent = _numberOfPhoto + 1;
    galleryContainer.classList.remove('invisible');    
  };

  var closeGallery = function() {
    galleryContainer.classList.add('invisible');
  };

  window.addEventListener('keydown', function(esc) {
    if (esc.keyCode === 27) {
      closeGallery();
    }
  });

  btnCloseGallery.addEventListener('click', function(evt) {
    evt.preventDefault();
    closeGallery();
  });

  photoGallery.addEventListener('click', function(evt) {
    evt.preventDefault();
    galleryLoop(photos, overlayGallery);
    numberOfPhoto = parseFloat(numberOfPhoto);
    if (evt.target.tagName === 'IMG') {
      evt.target.classList.add('overlay-image-active');
      if (evt.target.id.length === 5) {
        numberOfPhoto = +evt.target.id.slice(-1);
      } else if (evt.target.id.length === 6) {
        numberOfPhoto = +evt.target.id.slice(-2);
      } else if (evt.target.id.length === 7) {
        numberOfPhoto = +evt.target.id.slice(-3);
      }
      getGallery(numberOfPhoto, numberOfPhoto);
    }
  });
  
  var getCurrentImage = function() {
    showCurrentImage = document.querySelector('.overlay-image-active');
    return showCurrentNumber = showCurrentImage.id.slice(-1);
  };
  
  var showAnotherImage = function(_getNumber) {
    getGallery(_getNumber, _getNumber);    
    galleryLoop(photos, overlayGallery);
    currentId = document.getElementById('img-' + _getNumber);
    currentId.classList.add('overlay-image-active');
  };

  btnShowPrevImage.addEventListener('click', function(evt) {
    evt.preventDefault(); 
    getCurrentImage();
    numberNull = showCurrentNumber - 1;
    if (showCurrentNumber > 0) {
      showAnotherImage(numberNull);
    }
  });

  btnShowNextImage.addEventListener('click', function(evt) {
    evt.preventDefault();
    getCurrentImage();
    numberNull = parseFloat(showCurrentNumber) + 1;
    if (overlayGallery.length - 1 > showCurrentNumber) {
      showAnotherImage(numberNull);
    }
  });
})();
