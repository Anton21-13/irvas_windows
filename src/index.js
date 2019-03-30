
window.addEventListener('DOMContentLoaded', () => {

  'use strict';

  let calc = require('./parts/calc'),
    form = require('./parts/form'),
    modal = require('./parts/modal'),
    slider = require('./parts/slider'),
    tabs = require('./parts/tabs'),
    pictures = require('./parts/pictures'),
    timer = require('./parts/timer');

  calc();
  form();
  modal();
  slider();
  tabs();
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

