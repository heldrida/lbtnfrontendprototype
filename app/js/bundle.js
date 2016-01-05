(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global window, require */

'use strict';

var global = require('./global.js');
var components = require('./components/all.js');
},{"./components/all.js":2,"./global.js":5}],2:[function(require,module,exports){
console.log('all.js loaded!');

var navbar = require('./navbar.js');
var buttons = require('./buttons.js');
},{"./buttons.js":3,"./navbar.js":4}],3:[function(require,module,exports){
console.log('button.js loaded!');
},{}],4:[function(require,module,exports){
console.log('navbarjs loaded!');

(function () {

	var header = document.querySelector('header'),
		header_height      = getComputedStyle(header).height.split('px')[0],
		fixedClassName = 'minimize';

	function stickyScroll(e) {
		if( window.pageYOffset > (header_height) / 2 ) {
			header.classList.add(fixedClassName);
		}

		if( window.pageYOffset < (header_height) / 2 ) {
			header.classList.remove(fixedClassName);
		}
	}

	// Scroll handler to toggle classes.
	window.addEventListener('scroll', stickyScroll, false);

}());
},{}],5:[function(require,module,exports){
console.log('global.js loaded!!');
},{}]},{},[1]);
