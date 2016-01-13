console.log('%c mainMenu.js loaded!', 'background: #0C0; padding: 2px; color: #FFF');

(function (App) {

	"use strict";

	function MainMenu (params) {
		this.init(params);
		this.setEventListeners();
	}

	MainMenu.prototype = {

		init: function (params) {
			this.header = document.querySelector('header');
			this.mainMenu = document.querySelector('.main-menu');
			this.mainMenuOptList = document.querySelectorAll('li');
			this.layerBottom = document.querySelector('header .layer-bottom');
			this.menuDropDownContainer = document.querySelector('.menu-drop-down-container');
			this.timelineDropdown = undefined;
			this.hasParentElement = App.helpers.hasParentElement;
		},

		setEventListeners: function () {

			_.forEach(this.mainMenuOptList, function(v, k) {
				this.mainMenuOptList[k].addEventListener('click', this.menuOptionHandler.bind(this));
			}.bind(this));

			document.body.addEventListener('click', this.dropDownMenuStateHandler.bind(this));

		},

		menuOptionHandler: function (e) {

			this.resetActiveItem();

			e.target.classList.add('active');

			if (typeof this.timelineDropdown === 'undefined') {

				this.timelineDropdown = new TimelineLite({
					onStart: function () {
						this.header.classList.add('drop-down-menu-open');
					}.bind(this),
					onReverseComplete: function () {
						this.header.classList.remove('drop-down-menu-open');
						this.resetActiveItem();
					}.bind(this)
				});

				this.timelineDropdown.to(this.layerBottom, 0.3, { css: { y: 0 } });

			} else {

				this.timelineDropdown.play();

			}

		},

		resetActiveItem: function () {

			_.forEach(this.mainMenuOptList, function(v, k) {
				this.mainMenuOptList[k].classList.remove('active');
			}.bind(this));

		},

		dropDownMenuStateHandler: function (e) {

			// close the drop down menu, if it's status is open and clicked outside the element
			if (this.header.classList.contains('drop-down-menu-open')) {

				if (!this.hasParentElement(e.target, this.menuDropDownContainer) && e.target !== this.menuDropDownContainer) {
					this.timelineDropdown.reverse();
				}

			}

		}

	};

	module.exports = MainMenu;

}(window.App));