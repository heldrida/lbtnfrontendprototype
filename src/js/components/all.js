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

		}

	}

}(window.App));