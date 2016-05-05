'use strict';

var browserCookies = require('browser-cookies');
var formContainer = document.querySelector('.overlay-container');
var formCloseButton = document.querySelector('.review-form-close');
var formName = document.querySelector('#review-name');
var formText = document.querySelector('#review-text');
var formCheckbox = document.getElementsByName('review-mark');
var labelCheck = document.querySelector('.review-form-group');
var tipName = document.querySelector('.review-fields-name');
var tipText = document.querySelector('.review-fields-text');
var formButton = document.querySelector('.review-submit');
var formTip = document.querySelector('.review-fields');
var formSubmit = document.querySelector('.overlay');
var checkforCookie;

var Formlistener = function() {
  this.cookieStart = this.cookieStart.bind(this);
  this.closeForm = this.closeForm.bind(this);
  this.focusCheck = this.focusCheck.bind(this);
  this.checkInputName = this.checkInputName(this);
  this.checkInputText = this.checkInputText(this);
  this.checkInputFormContainer = this.checkInputFormContainer.bind(this);
  this.checkLabelClick = this.checkLabelClick.bind(this);
  this.submitForm = this.submitForm.bind(this);
  this.openForm = this.openForm.bind(this);
  this.cookieStart();
};

Formlistener.prototype.loadForm = function() {
  formName.addEventListener('focus', this.focusCheck);
  formName.focus();
  formName.addEventListener('input', this.checkInputName);
  formText.addEventListener('input', this.checkInputText);
  formContainer.addEventListener('input', this.checkInputFormContainer);
  labelCheck.addEventListener('click', this.checkLabelClick);
  formCloseButton.addEventListener('click', this.closeForm);
  formSubmit.addEventListener('submit', this.submitForm);
};

Formlistener.prototype.openForm = function() {
  formContainer.classList.remove('invisible');
  this.loadForm();
};

Formlistener.prototype.cookieStart = function() {
  formName.value = browserCookies.get('formName') || '';
  checkforCookie = browserCookies.get('checkforCookie') || 3;
  document.querySelector('#review-mark-' + checkforCookie).checked = true;
};

formButton.disabled = true;
formName.required = true;

Formlistener.prototype.checked = function(checkbox, formtext, button, formname, tip, tiptext) {
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
};

Formlistener.prototype.checkValid = function(nameform, tipform) {
  if (nameform.validity.valid) {
    tipform.classList.add('invisible');
  } else {
    tipform.classList.remove('invisible');
  }
};

Formlistener.prototype.tipClose = function(formname, button, formtip, formtext) {
  if (formname.validity.valid && formtext.validity.valid) {
    button.disabled = false;
    formTip.classList.add('invisible');
  } else {
    button.disabled = true;
    formTip.classList.remove('invisible');
  }
};

Formlistener.prototype.focusCheck = function() {
  this.checkValid(formName, tipName);
  this.checked(formCheckbox, formText, formButton, formName, formTip, tipText);
};

Formlistener.prototype.checkInputName = function() {
  this.checkValid(formName, tipName);
};


Formlistener.prototype.checkInputText = function() {
  this.checkValid(formText, tipText);
};

Formlistener.prototype.checkInputFormContainer = function() {
  this.tipClose(formName, formButton, formTip, formText);
};

Formlistener.prototype.checkLabelClick = function() {
  this.checked(formCheckbox, formText, formButton, formName, formTip, tipText);
};

Formlistener.prototype.closeForm = function(evt) {
  evt.preventDefault();
  formContainer.classList.add('invisible');
  formName.removeEventListener('focus', this.focusCheck);
  formName.removeEventListener('input', this.checkInputName);
  formText.removeEventListener('input', this.checkInputText);
  formContainer.removeEventListener('input', this.checkInputFormContainer);
  labelCheck.removeEventListener('click', this.checkLabelClick);
  formCloseButton.removeEventListener('click', this.closeForm);
  formSubmit.removeEventListener('submit', this.submitForm);
};

Formlistener.prototype.submitForm = function(evt) {
  evt.preventDefault();
  var presentDate = new Date();
  var birthday = new Date(presentDate.getFullYear(), 1, 3);
  var oneYear = 365 * 24 * 60 * 60 * 1000;
  var oneDay = 24 * 60 * 60 * 1000;
  var timeAfterBirthday = Math.floor((presentDate.valueOf() - birthday.valueOf()) / oneDay);
  var cookieLife = new Date((timeAfterBirthday.valueOf() * oneDay) + presentDate.valueOf());

  checkforCookie = document.querySelector('input[name=review-mark]:checked');
  if (birthday.valueOf() > presentDate.valueOf()) {
    cookieLife = new Date(cookieLife.valueOf() + oneYear);
  }

  browserCookies.set('formName', formName.value, {
    expires: cookieLife
  });

  browserCookies.set('checkforCookie', checkforCookie.value, {
    expires: cookieLife
  });

  formSubmit.submit();
};

module.exports = new Formlistener();
