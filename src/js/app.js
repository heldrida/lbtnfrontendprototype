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