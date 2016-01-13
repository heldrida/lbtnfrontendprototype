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
			this.mainMenuOptList = document.querySelectorAll('li.drop-down');
			this.layerBottom = document.querySelector('header .layer-bottom');
			this.menuDropDownContainer = document.querySelector('.menu-drop-down-container');
			this.timelineDropdown = undefined;
			this.hasParentElement = App.helpers.hasParentElement;
			this.categoryMenus = document.querySelectorAll('.menu-categories [data-category]');

		},

		setEventListeners: function () {

			_.forEach(this.mainMenuOptList, function(v, k) {
				this.mainMenuOptList[k].addEventListener('click', this.menuOptionHandler.bind(this));
			}.bind(this));

			document.body.addEventListener('click', this.dropDownMenuStateHandler.bind(this));

		},

		menuOptionHandler: function (e) {

			this.resetActiveItem();

			var el = e.target;

			// read attr data category name to use to reveal category module
			// that is nested in the drop down container
			var category = el.getAttribute('data-category');

			el.classList.add('active');

			if (typeof this.timelineDropdown === 'undefined') {

				this.timelineDropdown = new TimelineLite({
					onStart: function () {
						this.header.classList.add('drop-down-menu-open');
					}.bind(this),

					onReverseComplete: function () {
						this.header.classList.remove('drop-down-menu-open');
						this.resetActiveItem();
						this.resetCategoryMenuVisibility();
					}.bind(this),

					onComplete: this.revealCategoryMenu.bind(this, category)
				});

				this.timelineDropdown.to(this.layerBottom, 0.3, { css: { y: 0 } });

			} else {

				// modify the onComplete event callback to use current category name
				this.timelineDropdown.eventCallback("onComplete", this.revealCategoryMenu.bind(this, category));

				// play cached timeline
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
			// if the dd menu is open and different category selection only change the dd menu options
			if (this.header.classList.contains('drop-down-menu-open')) {

				if (this.hasParentElement(e.target, this.mainMenu)) {

					return null;

				} else if (!this.hasParentElement(e.target, this.menuDropDownContainer) && e.target !== this.menuDropDownContainer) {

					this.timelineDropdown.reverse();

				}

			}

		},

		revealCategoryMenu: function (category) {

			// reset visibility of all category modules
			this.resetCategoryMenuVisibility();

			var element = this.menuDropDownContainer.querySelector('[data-category="' + category + '"]');

			// prevent running if element doesn't exist
			// and close the drop down container if in open state
			if (!element) {

				this.timelineDropdown.reverse();

				return;

			}

			var tl = new TimelineLite({

				onStart: function () {

					element.classList.remove('hiden');

				}.bind(this),

				onComplete: function () {

				}.bind(this)

			});

			tl.to(element, 0.6, { opacity: 1 });

		},

		resetCategoryMenuVisibility: function () {

			_.forEach(this.categoryMenus, function (v, k) {
				this.categoryMenus[k].classList.add('hiden');
			}.bind(this));

		}

	};

	module.exports = MainMenu;

}(window.App));