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
  var formButton = document.querySelector('.review-submit');
  var formTip = document.querySelector('.review-fields');
  var formSubmit = document.querySelector('overlay');
  var checkforCookie = 0;
  var cookieStart = function() {
    formName.value = browserCookies.get('formName') || '';
    checkforCookie = browserCookies.get('checkforCookie') || 3;
    document.querySelector('#review-mark-' + checkforCookie).checked = true;
  };

  cookieStart();

  formButton.disabled = true;
  formName.required = true;
  function checked(checkbox, formtext, button, formname, tip, tiptext) {
    var check;

    for (var i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked && checkbox[i].value >= 3) {
        check = true;
      } else if (checkbox[i].checked && checkbox[i].value < 3) {
        check = false;
      }
    }
    if (!check) {
      formText.required = true;
      button.disabled = true;
      if (!formtext.validity.valid) {
        tiptext.classList.remove('invisible');
        tip.classList.remove('invisible');
      }
    } else {
      formText.required = false;
      tiptext.classList.add('invisible');
      if (formname.validity.valid && formtext.validity.valid) {
        button.disabled = false;
        tiptext.classList.add('invisible');
        tip.classList.add('invisible');
      }
    }
  }

  function checkValid(nameform, tipform) {
    if (nameform.validity.valid) {
      tipform.classList.add('invisible');
    } else {
      tipform.classList.remove('invisible');
    }
  }

  function tipClose(formname, button, formtip, formtext) {
    if (formname.validity.valid && formtext.validity.valid) {
      button.disabled = false;
      formTip.classList.add('invisible');
    } else {
      button.disabled = true;
      formTip.classList.remove('invisible');
    }
  }

  formName.oninput = function() {
    checkValid(formName, tipName);
  };

  formName.onfocus = function() {
    checkValid(formName, tipName);
    checked(formCheckbox, formText, formButton, formName, formTip, tipText);
  };

  formText.oninput = function() {
    checkValid(formText, tipText);
  };

  formContainer.oninput = function() {
    tipClose(formName, formButton, formTip, formText);
  };

  labelCheck.addEventListener('click', function() {
    checked(formCheckbox, formText, formButton, formName, formTip, tipText);
    return(checkforCookie = document.querySelector('input[name=review-mark]:checked').value);
  });

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    formName.focus();
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  formButton.onclick = function(evt) {
    evt.preventDefault();

    var presentDate = new Date();
    var birthday = new Date(presentDate.getFullYear(), 1, 3);
    var timeAfterBirthday = new Date(presentDate.valueOf() - birthday.valueOf());
    var cookieLife = new Date(presentDate.valueOf() + timeAfterBirthday.valueOf()).toUTCString();
    var oneYear = 365 * 24 * 60 * 60 * 1000;

    if (birthday.valueOf() > presentDate.valueOf()) {
      cookieLife = new Date(presentDate.valueOf() + timeAfterBirthday.valueOf() + oneYear);
    }

    browserCookies.set('formName', formName.value, {
      expires: cookieLife
    });
    browserCookies.set('checkforCookie', checkforCookie, {
      expires: cookieLife
    });
    formSubmit.submit();
  };
})();
