'use strict';

(function() {
  var browserCookies = require('browser-cookies');
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formName = document.querySelector('#review-name');
  var formText = document.querySelector('#review-text');
  var formCheckbox = document.getElementsByName('review-mark');
  var labelCheck = document.querySelector('.review-form-group');
  var tipName = document.querySelector('.review-fields-name');
  var tipText = document.querySelector('.review-fields-text');
  var formSubButton = document.querySelector('.review-submit');
  var formTip = document.querySelector('.review-fields');
  var formSubmit = document.querySelector('overlay');
  formName.value = browserCookies.get('formName');
  formCheckbox.value = browserCookies.get('formCheckbox');
  formSubButton.disabled = true;
  formName.required = true;
  function checked(a, b, c, d) {
    for (var i = 0; i < a.length; i++) {
      if ((a[i].checked) && (a[i].value < 3)) {
        b.required = true;
        c.disabled = true;
      }
      if ((a[i].checked) && (a[i].value >= 3) && (d.value.length > 5)) {
        b.required = false;
        c.disabled = false;
      }
    }
  }

  function checkValid(a, b, c) {
    if (a.value.length >= c) {
      b.classList.add('invisible');
    }
    if (a.value.length < c) {
      b.classList.remove('invisible');
    }
  }

  function tipClose(a, b, c, d, e, f) {
    if ((a.value.length >= d) && (e.value.length >= d)) {
      b.disabled = false;
      c.classList.add('invisible');
    }
    if ((a.value.length < d) || (e.value.length < d)) {
      b.disabled = true;
      c.classList.remove('invisible');
    }
    if ((f.required === false) && (a.value.length > d)) {
      b.disabled = false;
    }
  }

  formName.addEventListener('keyup', function() {
    checkValid(formName, tipName, 5, formSubButton);
  });

  formText.addEventListener('keydown', function() {
    checkValid(formText, tipText, 5);
  });

  formContainer.addEventListener('keydown', function() {
    tipClose(formName, formSubButton, formTip, 5, formText, formText);
  });

  labelCheck.onclick = function() {
    checked(formCheckbox, formText, formSubButton, formName);
  };

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    formName.focus();
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  formSubButton.onclick = function(evt) {
    evt.preventDefault();
    browserCookies.set('formName', formName.value, {
      expires: Date.now() - Date.parse('Jan 03, 1990')
    });
    browserCookies.set('formCheckbox', formCheckbox.value);
    formSubmit.onclick();
  };
})();
