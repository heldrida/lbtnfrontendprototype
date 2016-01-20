/* global window, require, App */

// intro credits displayed in the browser console
require('./introCredits.js');

(function () {

	"use strict";

	// the global App property
	window.App = window.App || {};

	// set the main container property to the app object
	App.container = document.querySelector('.ns-clv4');

	// load the config object
	var config = require('./config.js');

	// place the config object into the App
	App.config = config;

	var Helpers = require('./helpers.js');
	var Globals = require('./globals.js');

	// set the helper obj to the App
	App.helpers = new Helpers();

	// load components
	require('./components/all.js');

	/*
	// load event management library (implement the mediator pattern)
	var Mediator = require( 'mediator-js' ).Mediator;

	// place the mediator in the app attr
	App.mediator = new Mediator;

		Mediator usage
	App.mediator.subscribe("wat", function(param1, param2){ console.log(param1, param2); });

	setTimeout(function () {

		App.mediator.publish("wat", 7, "hi", { one: 1 });

	}.bind(this), 1000);
	*/

}());