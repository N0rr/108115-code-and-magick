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
  function checked(checkbox, formtext, button, formname, tip, tiptext) {
    for (var i = 0; i < checkbox.length; i++) {
      if ((checkbox[i].checked) && (checkbox[i].value < 3)) {
        formText.required = true;
        button.disabled = true;
      }
      if ((checkbox[i].checked) && (checkbox[i].value >= 3)) {
        formText.required = false;
        if (formname.validity.valid) {
          button.disabled = false;
          tiptext.classList.add('invisible');
          tip.classList.add('invisible');
        }
      }
      if ((!formtext.validity.valid) && (checkbox[i].checked) && (checkbox[i].value < 3)) {
        tiptext.classList.remove('invisible');
        tip.classList.remove('invisible');
      }
      if ((formname.validity.valid) && (checkbox[i].checked) && (checkbox[i].value < 3) && (formtext.validity.valid)) {
        button.disabled = false;
      }
    }
  }

  function checkValid(nameform, tipform) {
    if (nameform.validity.valid) {
      tipform.classList.add('invisible');
    }
    if (!nameform.validity.valid) {
      tipform.classList.remove('invisible');
    }
  }

  function tipClose(formname, button, formtip, formtext) {
    if ((formname.validity.valid) && (formtext.validity.valid)) {
      button.disabled = false;
      formTip.classList.add('invisible');
    }
    if ((!formname.validity.valid) || (!formtext.validity.valid)) {
      button.disabled = true;
      formTip.classList.remove('invisible');
    }
    if ((formtext.required === false) && (formname.validity.valid)) {
      button.disabled = false;
    }
  }

  formName.onkeyup = function() {
    if (formName.validity.valid) {
      formName.setCustomValidity('Запомните это поле');
    }
    if (!formName.validity.valid) {
      formName.setCustomValidity('');
    }
  };

  formText.onkeyup = function() {
    if (formText.validity.valid) {
      formText.setCustomValidity('Запомните это поле');
    }
    if (!formText.validity.valid) {
      formText.setCustomValidity('');
    }
  };

  formName.onkeyup = function() {
    checkValid(formName, tipName);
  };

  formName.onfocus = function() {
    checkValid(formName, tipName);
    checked(formCheckbox, formText, formButton, formName, formTip, tipText);
  };

  formText.addEventListener('keyup', function() {
    checkValid(formText, tipText);
  });

  formTipp.addEventListener('keyup', function() {
    tipClose(formName, formButton, formTip, formText);
  });

  labelCheck.addEventListener('click', function() {
    checked(formCheckbox, formText, formButton, formName, formTip, tipText);
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
})();
