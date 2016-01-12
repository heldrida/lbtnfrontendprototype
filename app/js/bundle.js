(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global window, require, App */

'use strict';

(function appInit() {

	// The global App property
	window.App = window.App || {};

	var Helpers = require('./helpers.js');
	var Globals = require('./globals.js');

	// Set the helper obj to the App
	App.helpers = new Helpers();

	// Load components
	var Components = require('./components/all.js');

}());
},{"./components/all.js":2,"./globals.js":5,"./helpers.js":6}],2:[function(require,module,exports){
console.log('all.js loaded!');

var navbar = require('./navbar.js');
var buttons = require('./buttons.js');
},{"./buttons.js":3,"./navbar.js":4}],3:[function(require,module,exports){
console.log('button.js loaded!');
},{}],4:[function(require,module,exports){
console.log('navbarjs loaded!');

(function (App) {

	var header = document.querySelector('header'),
		header_height = getComputedStyle(header).height.split('px')[0],
		fixedClassName = 'minimize',
		headerLogo = document.querySelector('.header-logo'),
		nav = document.querySelector('nav'),
		topMenuList = header.querySelectorAll('.tm'),
		tl, tlPos;

		console.log('topMenuList', topMenuList);

	function stickyScroll(e) {

		fixNavbar(e);

		if( window.pageYOffset > 1 ) {
			if (typeof tl === 'undefined') {
				setTimelineAnim();
			} else {
				tl.play();
			}
		}

		if( window.pageYOffset < 1 ) {
			if (typeof tl === 'undefined') {
				setTimelineAnim();
			} else {
				tl.reverse();
			}
		}
	}

	function setTimelineAnim() {
		tl = new TimelineLite(),
		tlPos = 0;
		tl.to(headerLogo, 0.3, { scale: 0 }, tlPos);
		tl.to(nav, 0.3, { css: { y: '20px' }}, tlPos);
		//tl.to(header, 0.3, { css: { y: '-50px' }}, tlPos);

		for (var i = 0; i < topMenuList.length; i++) {
			tl.to(topMenuList[i], 0.3, { css: { y: '54px' }}, tlPos);
		}

	}

	function fixNavbar(event) {

		var y = window.pageYOffset,
			maxY = 55,
			vendorTransform = Modernizr.prefixed('transform');

		console.log('y', y);

		if (y < maxY) {
			header.style[vendorTransform] = 'translateY(' + (-y + 'px') + ')';
		} else {
			header.style[vendorTransform] = 'translateY(' + (-maxY) + 'px)';
		}

	}

	// Scroll handler to toggle classes.
	window.addEventListener('scroll', _.throttle(stickyScroll, 0), false);

}(window.App));
},{}],5:[function(require,module,exports){
console.log('global.js loaded!!');

},{}],6:[function(require,module,exports){
"use strict";

function Helpers() {

}

Helpers.prototype = {};

module.exports = Helpers;
},{}]},{},[1]);
