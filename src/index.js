'use strict';

require('es6-promise').polyfill();
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', () => {


  let calc = require('./parts/calc'),
    modal = require('./parts/modal'),
    tabs = require('./parts/tabs'),
    pictures = require('./parts/pictures'),
    form = require('./parts/form'),
    input = require('./parts/input'),
    timer = require('./parts/timer');

  let windowSettings = calc();
  form(windowSettings);
  modal();
  tabs();
  input();
  pictures();
  timer();

});


if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

