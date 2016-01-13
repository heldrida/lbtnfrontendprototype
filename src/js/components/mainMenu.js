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
		},

		setEventListeners: function () {

			for (var i = 0; i < this.mainMenuOptList.length; i++) {
				this.mainMenuOptList[i].addEventListener('click', this.menuOptionHandler.bind(this));
			}

		},

		menuOptionHandler: function (e) {

			this.menuDropDownContainer

			var tl = new TimelineLite({
				onStart: function () {
					this.header.classList.add('drop-down-menu-open');
				}.bind(this),
				onReverseComplete: function () {

				}.bind(this)
			});

			tl.to(this.layerBottom, 0.3, { css: { y: 0 } });

		}

	};

	module.exports = MainMenu;

}(window.App));