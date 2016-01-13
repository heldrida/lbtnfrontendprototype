/* global module */

console.log('%c helpers.js loaded!', 'background: #0C0; padding: 2px; color: #FFF');

(function(App) {

	"use strict";

	function Helpers() {

	}

	Helpers.prototype = {
		hasParentElement: function (el, parentEl) {
			while (el.parentNode) {
			    el = el.parentNode;
			    if (el === parentEl) {
			        return true;
			    }
			}
			return false;
		}
	};

	module.exports = Helpers;

}(window.App));