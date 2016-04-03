'use strict';

(function() {
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
  var formTipp = document.querySelector('.overlay-container');
  formButton.disabled = true;
  formName.required = true;
  function checked(checkbox, formtext, button, tipname) {
    for (var i = 0; i < checkbox.length; i++) {
      if ((checkbox[i].checked) && (checkbox[i].value < 3)) {
        formText.required = true;
        button.disabled = true;
      }
      if ((checkbox[i].checked) && (checkbox[i].value >= 3)) {
        formText.required = false;
        if (tipname.contains('invisible')) {
          button.disabled = false;
        }
      }
    }
  }

  function checkValid(nameform, tipform, number) {
    if (nameform.value.length >= number) {
      tipform.classList.add('invisible');
    }
    if (nameform.value.length < number) {
      tipform.classList.remove('invisible');
    }
  }

  function tipClose(formname, button, formtip, number, formtext) {
    if ((formname.value.length >= number) && (formtext.value.length >= number)) {
      button.disabled = false;
      formTip.classList.add('invisible');
    }
    if ((formname.value.length < number) || (formtext.value.length < number)) {
      button.disabled = true;
      formTip.classList.remove('invisible');
    }
    if ((formtext.required === false) && (formname.value.length >= number)) {
      button.disabled = false;
    }
  }
  formName.addEventListener('keyup', function() {
    checkValid(formName, tipName, 5);
  });

  formText.addEventListener('keyup', function() {
    checkValid(formText, tipText, 5);
  });

  formTipp.addEventListener('keyup', function() {
    tipClose(formName, formButton, formTip, 5, formText);
  });

  labelCheck.addEventListener('click', function() {
    checked(formCheckbox, formText, formButton, tipName);
  });

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();
