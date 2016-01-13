/* global window, require, App */

// intro credits displayed in the brower console
require('./introCredits.js');

(function () {

	"use strict";

	// The global App property
	window.App = window.App || {};

	// load the config object
	var config = require('./config.js');

	// place the config object into the App
	App.config = config;

	var Helpers = require('./helpers.js');
	var Globals = require('./globals.js');

	// Set the helper obj to the App
	App.helpers = new Helpers();

	// Load components
	require('./components/all.js');

}());