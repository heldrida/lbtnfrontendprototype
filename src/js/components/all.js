console.log('all.js loaded!');

(function (App) {

	// set required component variables
	var Navbar = require('./navbar.js');
	var Buttons = require('./buttons.js');
	var MainMenu = require('./mainMenu.js');

	// create collection of component variables
	var componentsList = {
		'Navbar': Navbar,
		'MainMenu': MainMenu,
		'Buttons': Buttons
	};

	// iterate and initialise collection of components
	// place it on the main Application object
	for (var name in componentsList) {

		if (!App.hasOwnProperty(name)) {

			App[name] = new componentsList[name]();

		} else {

			throw "Components intialisation error: Name collision detected, you're trying to initialise an object named after an existing property in the main App object, please fix!";

		}

	}

}(window.App));