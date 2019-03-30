/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var calc = __webpack_require__(/*! ./parts/calc */ "./parts/calc.js"),
      form = __webpack_require__(/*! ./parts/form */ "./parts/form.js"),
      modal = __webpack_require__(/*! ./parts/modal */ "./parts/modal.js"),
      slider = __webpack_require__(/*! ./parts/slider */ "./parts/slider.js"),
      tabs = __webpack_require__(/*! ./parts/tabs */ "./parts/tabs.js"),
      pictures = __webpack_require__(/*! ./parts/pictures */ "./parts/pictures.js"),
      timer = __webpack_require__(/*! ./parts/timer */ "./parts/timer.js");

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

/***/ }),

/***/ "./parts/calc.js":
/*!***********************!*\
  !*** ./parts/calc.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {// let persons = document.querySelectorAll('.counter-block-input')[0],
  //   restDays = document.querySelectorAll('.counter-block-input')[1],
  //   place = document.getElementById('select'),
  //   totalValue = document.getElementById('total'),
  //   personsSum = 0,
  //   daysSum = 0,
  //   total = 0;
  // totalValue.innerHTML = 0;
  // persons.addEventListener('change', function() {
  //   personsSum = +this.value;
  //   total = daysSum * personsSum * 4000;
  //   if(restDays.value == '' || persons.value == '') {
  //     totalValue.innerHTML = 0;
  //   } else {
  //     let a = total;
  //     totalValue.innerHTML = a * place.options[place.selectedIndex].value;
  //   }
  // });
  // restDays.addEventListener('change', function() {
  //   daysSum = +this.value;
  //   total = daysSum * personsSum * 4000 ;
  //   if(persons.value == '' || persons.value == '') {
  //     totalValue.innerHTML = 0;
  //   } else {
  //     let a = total;
  //     totalValue.innerHTML = a * place.options[place.selectedIndex].value;
  //   }
  // });
  // place.addEventListener('change', function() {
  //   if (restDays.value == '' || persons.value == '') {
  //     totalValue.innerHTML = 0;
  //   } else {
  //     let a = total;
  //     totalValue.innerHTML = a * this.options[this.selectedIndex].value;
  //   }
  // });
}

module.exports = calc;

/***/ }),

/***/ "./parts/form.js":
/*!***********************!*\
  !*** ./parts/form.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function form() {//   let message = {
  //     loading: 'Загрузка...',
  //     success: 'Спасибо! Скоро мы с вами свяжимся!',
  //     failure: 'Что-то пошло не так...'
  //   };
  //   let form = document.querySelector('.main-form'),
  //     contactForm = document.querySelector('#form'),
  //     input = document.querySelectorAll('input'),
  //     statusMessage = document.createElement('div'),
  //     inputPhone = document.querySelectorAll('input[type="tel"]');
  //   statusMessage.classList.add('status');
  //   input[2].setAttribute('name', 'email');
  //   input[3].setAttribute('name', 'phone');
  //   function submissionForm(element) {
  //     element.addEventListener('submit', (a) => {
  //       a.preventDefault();
  //       element.appendChild(statusMessage);
  //       let formData = new FormData(element);
  //       // let obj = {};
  //       // formData.forEach((value, key) => {
  //       //   obj[key] = value;
  //       // });
  //       //let json = JSON.stringify(obj);      
  //       function postData(data) {
  //         return new Promise((resolve, reject) => {
  //           let request = new XMLHttpRequest();
  //           request.open('POST', 'server.php');
  //           request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  //           request.onreadystatechange = () => {
  //             if (request.readyState < 4) {
  //               resolve();
  //             } else if (request.readyState === 4 && request.status == 200) {
  //               resolve();
  //             } else {
  //               reject();
  //             }
  //           };
  //           request.send(/*json*/data);
  //         });
  //       }
  //       function clearInput() {
  //         for (let i = 0; i < input.length; i++) {
  //           input[i].value = '';
  //         }
  //         statusMessage.innerHTML = '';
  //       }
  //       postData(formData)
  //       .then(() => statusMessage.innerHTML = message.loading)
  //       .then(() => statusMessage.innerHTML = message.success)
  //       .catch(() => statusMessage.innerHTML = message.failure)
  //       .then(() => setTimeout(clearInput, 4000));
  //     });
  //   }
  //   submissionForm(form);
  //   submissionForm(contactForm);
  //   inputPhone.forEach((elem) => {
  //     elem.addEventListener('focus', () => {
  //       if(!/^\+\d*$/.test(elem.value)) {
  //         elem.value = '+';
  //       }
  //     });
  //     elem.addEventListener('keydown', (e) => {
  //       if(!/\d/.test(e.key)) {
  //         e.preventDefault();
  //       }
  //     });
  //   });
}

module.exports = form;

/***/ }),

/***/ "./parts/modal.js":
/*!************************!*\
  !*** ./parts/modal.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
  var callBack = document.querySelectorAll('.phone_link'),
      btnPopupEngineer = document.querySelector('.popup_engineer_btn'),
      modalPopup = document.querySelector('.popup'),
      modalPopupForm = document.querySelectorAll('.popup_form'),
      modalPopupEngineer = document.querySelector('.popup_engineer'),
      closePopup = document.querySelectorAll('.popup_close')[0],
      closePopupEngineer = document.querySelectorAll('.popup_close')[1];

  function modalOpenPopup(event) {
    event.preventDefault();
    modalPopup.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function modalOpenPopupEngineer() {
    modalPopupEngineer.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function modalClosePopup() {
    modalPopup.style.display = 'none';
    document.body.style.overflow = '';
  }

  function modalClosePopupEngineer() {
    modalPopupEngineer.style.display = 'none';
    document.body.style.overflow = '';
  }

  callBack[0].addEventListener('click', modalOpenPopup);
  callBack[1].addEventListener('click', modalOpenPopup);
  closePopup.addEventListener('click', modalClosePopup); // modalPopup.addEventListener('click', modalClosePopup);

  btnPopupEngineer.addEventListener('click', modalOpenPopupEngineer);
  closePopupEngineer.addEventListener('click', modalClosePopupEngineer); // modalPopupEngineer.addEventListener('click', modalClosePopupEngineer);

  setTimeout(modalOpenPopup, 60000);
}

module.exports = modal;

/***/ }),

/***/ "./parts/pictures.js":
/*!***************************!*\
  !*** ./parts/pictures.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
  var pictures = document.querySelectorAll('.lupa_tab'),
      btnPopupEngineer = document.querySelector('.popup_engineer_btn'),
      modalWorks = document.querySelector('.works'),
      closePopup = document.querySelectorAll('.popup_close')[0],
      closePopupEngineer = document.querySelectorAll('.popup_close')[1];

  function modalOpenWorks() {
    modalWorks.style.display = 'block';
    document.body.style = 'background-color: rgba(0, 0, 0, 0.5)';
  } // function modalCloseWorks() {
  //   modalPopup.style.display = 'none';
  //   document.body.style.background = '#fff';
  // }


  pictures.forEach(function (item) {
    item.addEventListener('click', modalOpenWorks);
  });
}

module.exports = modal;

/***/ }),

/***/ "./parts/slider.js":
/*!*************************!*\
  !*** ./parts/slider.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {// let slideIndex = 1,
  //   slides = document.querySelectorAll('.slider-item'),
  //   prev = document.querySelector('.prev'),
  //   next = document.querySelector('.next'),
  //   dotsWrap = document.querySelector('.slider-dots'),
  //   dots = document.querySelectorAll('.dot');
  // showSlides(slideIndex);
  // function showSlides (n) {
  //   if(n > slides.length) {
  //     slideIndex = 1;
  //   }
  //   if(n < 1) {
  //     slideIndex = slides.length;
  //   }
  //   slides.forEach((item) => item.style.display = 'none');
  //   dots.forEach((item) => item.classList.remove('dot-active'));
  //   slides[slideIndex - 1].style.display = 'block';
  //   dots[slideIndex - 1].classList.add('dot-active');    
  // }
  // function plusSlides(n) {
  //   showSlides(slideIndex += n);
  // }
  // function currentSlides(n) {
  //   showSlides(slideIndex = n);
  // }
  // prev.addEventListener('click', () => {
  //   plusSlides(-1);
  // });
  // next.addEventListener('click', () => {
  //   plusSlides(1);
  // });
  // dotsWrap.addEventListener('click', (event) => {
  //   for (let i = 0; i < dots.length + 1; i++) {
  //     if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
  //       currentSlides(i);
  //     }
  //   }
  // });
}

module.exports = slider;

/***/ }),

/***/ "./parts/tabs.js":
/*!***********************!*\
  !*** ./parts/tabs.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
  var tab = document.querySelectorAll('.decoration_item'),
      tabLine = document.querySelectorAll('.decoration_slider_tab'),
      info = document.querySelector('.decoration_slider'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (var i = a; i < tabContent.length; i++) {
      tabContent[i].style.display = 'none';
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].style.display = 'none') {
      tabContent[b].style.display = 'block';
    }
  }

  info.addEventListener('click', function (event) {
    var target = event.target;

    if (target && target.classList.contains('decoration_item')) {
      for (var i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  }); // info.addEventListener('click', (event) => {
  //   let target = event.target;
  //   if (target && target.classList.contains('.decoration_slider_tab')) {
  //     for (let i = 0; i < tabLine.length; i++) {
  //       // tabContent[i].classList.remove('show');
  //       tabLine[i].classList.add('after_click');
  //     }
  //     // for (let i = 0; i < tab.length; i++) {
  //     //   if (target == tab[i]) {
  //     //     hideTabContent(0);
  //     //     showTabContent(i);
  //     //     break;
  //     //   }
  //     // }
  //   }
  // });
}

module.exports = tabs;

/***/ }),

/***/ "./parts/timer.js":
/*!************************!*\
  !*** ./parts/timer.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
  var deadline = '2019-04-07';

  function getTimeRamaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor(t / 1000 % 60),
        minutes = Math.floor(t / 1000 / 60 % 60),
        hours = Math.floor(t / 1000 / 60 / 60 % 24);
    days = Math.floor(t / 1000 / 60 / 60 / 24 % 24);

    if (days < 10) {
      days = "0 ".concat(days);
    }

    if (hours < 10) {
      hours = "0 ".concat(hours);
    }

    if (minutes < 10) {
      minutes = "0 ".concat(minutes);
    }

    if (seconds < 10) {
      seconds = "0 ".concat(seconds);
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function setClock(id, endtime) {
    var timer = document.getElementById(id),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      var t = getTimeRamaining(endtime);
      days.textContent = t.days;
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
        days.textContent = "00";
        hours.textContent = "00";
        seconds.textContent = "00";
        minutes.textContent = "00";
      }
    }
  }

  setClock('timer', deadline);
}

module.exports = timer;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map