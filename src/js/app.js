/* global window, require, App */

// intro credits displayed in the browser console
require('./introCredits.js');

(function () {

	"use strict";

	// the global App property
	window.App = window.App || {};

	// set the main container property to the app object
	App.container = document.querySelector('.ns-clv5');

	// load the config object
	var config = require('./config.js');

	// place the config object into the App
	App.config = config;

	var Helpers = require('./helpers.js');
	var Globals = require('./globals.js');

	// set the helper obj to the App
	App.helpers = new Helpers();

	// load event management
	var Mediator = require( 'mediator-js' ).Mediator;

	// place the mediator in the app attr
	App.mediator = new Mediator;

	// load components
	require('./components/all.js');

}());