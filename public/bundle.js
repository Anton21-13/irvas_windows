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

/***/ "../node_modules/es6-promise/dist/es6-promise.js":
/*!*******************************************************!*\
  !*** ../node_modules/es6-promise/dist/es6-promise.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.6+9869a4bc
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var calc = __webpack_require__(/*! ./parts/calc */ "./parts/calc.js"),
      modal = __webpack_require__(/*! ./parts/modal */ "./parts/modal.js"),
      slider = __webpack_require__(/*! ./parts/slider */ "./parts/slider.js"),
      tabs = __webpack_require__(/*! ./parts/tabs */ "./parts/tabs.js"),
      pictures = __webpack_require__(/*! ./parts/pictures */ "./parts/pictures.js"),
      form = __webpack_require__(/*! ./parts/form */ "./parts/form.js"),
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

// import submissionForm from './index';
function calc() {
  var popupCalcBtn = document.querySelectorAll('.popup_calc_btn'),
      // Кнопки вызова первого окна
  popupCalc = document.querySelector('.popup_calc'),
      // Модальное окно выбора формы балкона
  balconIcons = document.querySelectorAll('.balcon_icons a'),
      // меню выбора формы балкона
  bigImg = document.querySelectorAll('.big_img img'),
      // Блоки с большыми картинками
  popupCalcButton = document.querySelector('.popup_calc_button'),
      // Кнопка "Далее"
  popupCalcProfile = document.querySelector('.popup_calc_profile'),
      // Второе модальное окно
  popupCalcProfileButton = document.querySelector('.popup_calc_profile_button'),
      // Третье модальное окно
  popupCalcEnd = document.querySelector('.popup_calc_end'),
      // Третье модальное окно
  popupCalcInput = popupCalc.querySelectorAll('input'),
      popupCalcSelect = document.querySelector('select'),
      popupCalcLabel = popupCalcProfile.querySelectorAll('label'),
      windowSettings = {};
  popupCalcBtn.forEach(function (element) {
    element.addEventListener('click', function () {
      popupCalc.style.display = "block";
      windowSettings.type = balconIcons[0].getAttribute('class');
    });
  });
  popupCalc.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('popup_calc_close') || target.parentNode.classList.contains('popup_calc_close') || target.classList.contains('popup_calc')) {
      popupCalc.style.display = 'none';
      windowSettings = {};
    }
  });
  balconIcons.forEach(function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      var typeWindowCalc = event.target.parentNode.getAttribute('class');
      bigImg.forEach(function (el) {
        var typeSelectedWindow = el.getAttribute('id');

        if (typeSelectedWindow == typeWindowCalc) {
          el.style.display = 'inline-block';
          windowSettings.type = typeWindowCalc;
        } else {
          el.style.display = 'none';
        }
      });
      console.log(windowSettings);
    });
  });
  popupCalcInput.forEach(function (input) {
    input.addEventListener('keyup', function () {
      this.value = this.value.replace(/[^0-9]+/g, '');
      input.textContent = this.value;
    });
  });
  popupCalcButton.addEventListener('click', function () {
    if (popupCalcInput[0].value && popupCalcInput[1].value) {
      popupCalc.style.display = 'none';
      popupCalcProfile.style.display = 'block';
      windowSettings.width = popupCalcInput[0].value;
      windowSettings.heigh = popupCalcInput[1].value;
      windowSettings.glazingType = popupCalcSelect.options[0].value;
    } else {
      popupCalcInput.forEach(function (input) {
        if (!input.value) {
          input.focus();
        }
      });
    }
  });
  popupCalcSelect.addEventListener('change', function () {
    windowSettings.glazingType = this.options[this.selectedIndex].value;
  });
  popupCalcLabel.forEach(function (label) {
    label.addEventListener('change', function (event) {
      if (event.target.classList.contains('checkbox')) {
        [].slice.call(document.querySelectorAll('.checkbox')).forEach(function (c) {
          return c.checked = false;
        });
        event.target.checked = true;
      }

      windowSettings.glazingProfile = label.querySelector('.checkbox-custom').getAttribute('id');
    });
  });
  popupCalcProfileButton.addEventListener('click', function () {
    if (windowSettings.glazingProfile) {
      popupCalcProfile.style.display = 'none';
      popupCalcEnd.style.display = 'block';
    }
  });
  popupCalcProfile.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('popup_calc_profile_close') || target.parentNode.classList.contains('popup_calc_profile_close') || target.classList.contains('popup_calc_profile')) {
      popupCalcProfile.style.display = 'none';
      windowSettings = {};
    }
  });
  popupCalcEnd.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('popup_calc_end_close') || target.parentNode.classList.contains('popup_calc_end_close') || target.classList.contains('popup_calc_end')) {
      popupCalcEnd.style.display = 'none';
      windowSettings = {};
    }
  }); // const popupCalcEndForms = document.querySelector('.popup_calc_end form');
  // submissionForm(popupCalcEndForms, windowSettings);
}

module.exports = calc;

/***/ }),

/***/ "./parts/form.js":
/*!***********************!*\
  !*** ./parts/form.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Promise = typeof Promise === 'undefined' ? __webpack_require__(/*! es6-promise */ "../node_modules/es6-promise/dist/es6-promise.js").Promise : Promise;

function form() {
  var message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжимся!',
    failure: 'Что-то пошло не так...'
  };
  var form = document.querySelectorAll('form'),
      input = document.getElementsByTagName('input'),
      statusMessage = document.createElement('div'),
      inputPhone = document.getElementsByName('user_phone');
  form.forEach(function submissionForm(element) {
    element.addEventListener('submit', function (a) {
      a.preventDefault();
      element.appendChild(statusMessage);
      var formData = new FormData(element);
      var obj = {};
      formData.forEach(function (value, key) {
        obj[key] = value;
      });
      var json = JSON.stringify(obj);

      function postData() {
        return new _Promise(function (resolve, reject) {
          var request = new XMLHttpRequest();
          request.open('POST', 'server.php');
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

          request.onreadystatechange = function () {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4) {
              if (request.status == 200) {
                resolve();
              } else {
                reject();
              }
            }
          };

          request.send(json);
        });
      }

      function clearInput() {
        for (var i = 0; i < input.length; i++) {
          input[i].value = '';
        }
      }

      postData(formData).then(function () {
        return statusMessage.innerHTML = message.loading;
      }).then(function () {
        statusMessage.innerHTML = message.success;
        setTimeout(cleaner, 3000);
      }).catch(function () {
        return statusMessage.innerHTML = message.failure;
      }).then(clearInput);
    });
  });

  function cleaner() {
    statusMessage.innerHTML = "";
  }

  inputPhone.forEach(function (item) {
    item.addEventListener('focus', function () {
      if (!/^\+\d*$/.test(item.value)) item.value = '+';
    });
    item.addEventListener('keypress', function (e) {
      if (!/\d/.test(e.key)) {
        e.preventDefault();
        alert("Прошу вводить только цифры");
      } else {
        if (item.value.length == 2) item.value = item.value + "(";
        if (item.value.length == 6) item.value = item.value + ")-";
        if (item.value.length == 11) item.value = item.value + "-";
        if (item.value.length == 14) item.value = item.value + "-";
        if (item.value.length > 16) item.value = item.value.substring(0, 16);
      }
    });
  });

  function calc() {
    var popupCalcBtn = document.querySelectorAll('.popup_calc_btn'),
        // Кнопки вызова первого окна
    popupCalc = document.querySelector('.popup_calc'),
        // Модальное окно выбора формы балкона
    balconIcons = document.querySelectorAll('.balcon_icons a'),
        // меню выбора формы балкона
    bigImg = document.querySelectorAll('.big_img img'),
        // Блоки с большыми картинками
    popupCalcButton = document.querySelector('.popup_calc_button'),
        // Кнопка "Далее"
    popupCalcProfile = document.querySelector('.popup_calc_profile'),
        // Второе модальное окно
    popupCalcProfileButton = document.querySelector('.popup_calc_profile_button'),
        // Третье модальное окно
    popupCalcEnd = document.querySelector('.popup_calc_end'),
        // Третье модальное окно
    popupCalcInput = popupCalc.querySelectorAll('input'),
        popupCalcSelect = document.querySelector('select'),
        popupCalcLabel = popupCalcProfile.querySelectorAll('label'),
        windowSettings = {};
    popupCalcBtn.forEach(function (element) {
      element.addEventListener('click', function () {
        popupCalc.style.display = "block";
        windowSettings.type = balconIcons[0].getAttribute('class');
      });
    });
    popupCalc.addEventListener('click', function (event) {
      var target = event.target;

      if (target.classList.contains('popup_calc_close') || target.parentNode.classList.contains('popup_calc_close') || target.classList.contains('popup_calc')) {
        popupCalc.style.display = 'none';
        windowSettings = {};
      }
    });
    balconIcons.forEach(function (element) {
      element.addEventListener('click', function (event) {
        event.preventDefault();
        var typeWindowCalc = event.target.parentNode.getAttribute('class');
        bigImg.forEach(function (el) {
          var typeSelectedWindow = el.getAttribute('id');

          if (typeSelectedWindow == typeWindowCalc) {
            el.style.display = 'inline-block';
            windowSettings.type = typeWindowCalc;
          } else {
            el.style.display = 'none';
          }
        });
        console.log(windowSettings);
      });
    });
    popupCalcInput.forEach(function (input) {
      input.addEventListener('keyup', function () {
        this.value = this.value.replace(/[^0-9]+/g, '');
        input.textContent = this.value;
      });
    });
    popupCalcButton.addEventListener('click', function () {
      if (popupCalcInput[0].value && popupCalcInput[1].value) {
        popupCalc.style.display = 'none';
        popupCalcProfile.style.display = 'block';
        windowSettings.width = popupCalcInput[0].value;
        windowSettings.heigh = popupCalcInput[1].value;
        windowSettings.glazingType = popupCalcSelect.options[0].value;
      } else {
        popupCalcInput.forEach(function (input) {
          if (!input.value) {
            input.focus();
          }
        });
      }
    });
    popupCalcSelect.addEventListener('change', function () {
      windowSettings.glazingType = this.options[this.selectedIndex].value;
    });
    popupCalcLabel.forEach(function (label) {
      label.addEventListener('change', function (event) {
        if (event.target.classList.contains('checkbox')) {
          [].slice.call(document.querySelectorAll('.checkbox')).forEach(function (c) {
            return c.checked = false;
          });
          event.target.checked = true;
        }

        windowSettings.glazingProfile = label.querySelector('.checkbox-custom').getAttribute('id');
      });
    });
    popupCalcProfileButton.addEventListener('click', function () {
      if (windowSettings.glazingProfile) {
        popupCalcProfile.style.display = 'none';
        popupCalcEnd.style.display = 'block';
      }
    });
    popupCalcProfile.addEventListener('click', function (event) {
      var target = event.target;

      if (target.classList.contains('popup_calc_profile_close') || target.parentNode.classList.contains('popup_calc_profile_close') || target.classList.contains('popup_calc_profile')) {
        popupCalcProfile.style.display = 'none';
        windowSettings = {};
      }
    });
    popupCalcEnd.addEventListener('click', function (event) {
      var target = event.target;

      if (target.classList.contains('popup_calc_end_close') || target.parentNode.classList.contains('popup_calc_end_close') || target.classList.contains('popup_calc_end')) {
        popupCalcEnd.style.display = 'none';
        windowSettings = {};
      }
    });
    var popupCalcEndForms = document.querySelector('.popup_calc_end form');
    submissionForm(popupCalcEndForms, windowSettings);
  }
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
  var modalPopup = document.querySelector('.popup'),
      callBack = document.querySelectorAll('.phone_link'),
      modalPopupEngineer = document.querySelector('.popup_engineer'),
      popupBtn = document.querySelector('.header_btn'),
      closePopup = document.getElementsByClassName('popup_close')[0],
      closePopupEngineer = document.getElementsByClassName('popup_close')[1];
  callBack.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      modalPopup.style.display = 'block';
      document.body.parentElement.style.overflow = 'hidden';
    });
  });
  popupBtn.addEventListener('click', function (e) {
    e.preventDefault();
    modalPopupEngineer.style.display = 'block';
    document.body.parentElement.style.overflow = 'hidden';
  });
  setTimeout(function () {
    modalPopup.style.display = "block";
    document.body.parentElement.style.overflow = 'hidden';
  }, 60 * 1000);
  closePopup.addEventListener('click', function () {
    modalPopup.style.display = 'none';
    document.body.parentElement.style.overflow = '';
  });
  window.addEventListener('click', function (e) {
    if (e.target == modalPopup) {
      modalPopup.style.display = 'none';
      document.body.parentElement.style.overflow = '';
    }
  });
  closePopupEngineer.addEventListener('click', function () {
    modalPopupEngineer.style.display = 'none';
    document.body.parentElement.style.overflow = '';
  });
  window.addEventListener('click', function (e) {
    if (e.target == modalPopupEngineer) {
      modalPopupEngineer.style.display = 'none';
      document.body.parentElement.style.overflow = '';
    }
  });
}

module.exports = modal;

/***/ }),

/***/ "./parts/pictures.js":
/*!***************************!*\
  !*** ./parts/pictures.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

function pictures() {
  // let works = document.querySelectorAll('.works .row div');
  // works.forEach((work) => {
  //   work.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     let popupImage = document.createElement('div');
  //     let curentImage = document.createElement('img');
  //     let curentImageHref = work.querySelector('a').getAttribute('href');
  //     popupImage.classList.add('popup');
  //     curentImage.setAttribute('src', curentImageHref);
  //     popupImage.appendChild(curentImage);
  //     document.body.appendChild(popupImage);
  //     popupImage.style.display = 'flex';
  //     popupImage.style.alignItems = 'center';
  //     popupImage.style.justifyContent = 'center';
  //     popupImage.addEventListener('click', (e) => {
  //       if (e.target.classList.contains('popup')) {
  //         popupImage.style.display = 'none';
  //         document.body.removeChild(popupImage);
  //       }
  //     });
  //   });
  // });
  var overlay = document.createElement('div');
  overlay.classList.add('works_overlay');
  document.body.addEventListener('click', function (e) {
    var t = e.target;

    if (t.classList.contains('works_overlay')) {
      overlay.parentElement.removeChild(overlay);
      document.body.parentElement.style.overflow = '';
    }

    if (t.classList.contains('lightbox') && t.tagName == 'IMG' && !t.classList.contains('lupa')) {
      e.preventDefault();
      overlay.innerHTML = '';
      var block = document.createElement('img'),
          tsrc = t.getAttribute('src');
      tsrc = tsrc.slice(0, 13) + "/big_img" + tsrc.slice(13, tsrc.length);
      block.setAttribute("src", tsrc);
      overlay.appendChild(block);
      document.body.appendChild(overlay);
      document.body.parentElement.style.overflow = 'hidden';
    }
  });
}

module.exports = pictures;

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
  //Табы остекления
  var info = document.querySelector('.glazing_slider'),
      tabImg = document.querySelectorAll('.img'),
      tabText = document.querySelectorAll('.tab-link'),
      tabContent = document.querySelectorAll('.info-tabcontent-1'); //Табы отделки

  var info2 = document.querySelector('.decoration_slider'),
      tabText2 = document.querySelectorAll('.decoration_slider-link'),
      tabContent2 = document.querySelectorAll('.info-tabcontent-2'); // табы в калькуляторе

  var info3 = document.querySelector('.balcon_icons'),
      tabLinck = info3.querySelectorAll('.balcon_icons a'),
      tabImg3 = info3.querySelectorAll('.type_img'),
      tabContent3 = document.querySelectorAll('.big_img-item');
  tabLinck.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  function hideTabContent(a, b) {
    for (var i = a; i < b.length; i++) {
      b[i].classList.remove('show');
      b[i].classList.add('hide');

      if (b[i].classList.contains('big_img-item')) {
        b[i].style.margin = 'auto';
        b[i].style.marginBottom = '10px';
      }
    }
  }

  hideTabContent(1, tabContent);
  hideTabContent(1, tabContent2);
  hideTabContent(1, tabContent3);

  function showTabContent(b, c) {
    if (c[b].classList.contains('hide')) {
      c[b].classList.add('show');
      c[b].classList.remove('hide');
    }
  }

  function wrap(params) {
    params.addEventListener('click', function (event) {
      var target = event.target;

      if (target || target.classList.contains('glazing_block') || target.classList.contains('tab-link') || target.classList.contains('img') || target.classList.contains('decoration_slider-link')) {
        var tab = function tab(_tab, tabContent) {
          for (var i = 0; i < _tab.length; i++) {
            if (target == _tab[i]) {
              hideTabContent(0, tabContent);
              showTabContent(i, tabContent);
              break;
            }
          }
        };

        tab(tabImg, tabContent);
        tab(tabText, tabContent);
        tab(tabText2, tabContent2);
        tab(tabImg3, tabContent3);
      }
    });
  }

  ;
  wrap(info);
  wrap(info2);
  wrap(info3); //Табы, добовляющие стиль

  var slideIndex = 1;
  showSlides(slideIndex);

  function showSlides(slideIndex) {
    tabText2.forEach(function (item) {
      return item.parentNode.classList.remove('after_click');
    });
    tabText2[slideIndex - 1].parentNode.classList.add('after_click');
  }

  info2.addEventListener('click', function (event) {
    for (var i = 0; i < tabText2.length + 1; i++) {
      if (event.target.classList.contains('decoration_slider-link') && event.target == tabText2[i - 1]) {
        showSlides(i);
      }
    }
  }); //Увеличение картинок остекления в калькуляторе

  var imgIndex = 1;
  activeImg(imgIndex);

  function activeImg(imgIndex) {
    tabImg3.forEach(function (item) {
      return item.classList.remove('do_image_more');
    });
    tabImg3[imgIndex - 1].classList.add('do_image_more');
  }

  info3.addEventListener('click', function (event) {
    for (var i = 0; i < tabImg3.length + 1; i++) {
      if (event.target.classList.contains('type_img') && event.target == tabImg3[i - 1]) {
        activeImg(i);
      }
    }
  });
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
        hours = Math.floor(t / 1000 / 60 / 60 % 24),
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