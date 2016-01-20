console.log('%c all.js loaded!', 'background: #0C0; padding: 2px; color: #FFF');

(function (App) {

	// set required component variables
	var Navbar = require('./navbar.js');
	var Buttons = require('./buttons.js');
	var MainMenu = require('./mainMenu.js');
	var Search = require('./search.js');

	// create collection of component variables
	var componentsList = {
		'Navbar': Navbar,
		'MainMenu': MainMenu,
		'Buttons': Buttons,
		'Search': Search
	};

	// iterate and initialise collection of components
	// place it on the main Application object
	for (var name in componentsList) {

		if (!App.hasOwnProperty(name)) {

			App[name] = new componentsList[name]();

			// displays in the console the status of the component for development only
			if (typeof App[name] !== 'undefined') {
				console.log('%c ' + name + ' component initialised!', 'background: #AEA; padding: 2px; color: #999');
			}

		} else {

			throw "Components intialisation error: Name collision detected, you're trying to initialise an object named after an existing property in the main App object, please fix!";

		}

	}

}(window.App));