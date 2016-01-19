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
			this.menuCategories = this.menuDropDownContainer.querySelector('.menu-categories');
			this.categoryMenus = document.querySelectorAll('.menu-categories [data-category]');
			this.darkOverlay = document.querySelector('.dark-overlay');
			this.discoveryModule = document.querySelector('.dd-bottom-discoveries');
			this.discoveryModuleHeight = 176;
		},

		setEventListeners: function () {

			_.forEach(this.mainMenuOptList, function(v, k) {
				this.mainMenuOptList[k].addEventListener('click', _.throttle(this.menuOptionHandler.bind(this), 800));
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
						this.menuCategories.style.opacity = 1;
						this.header.classList.add('drop-down-menu-open');
						TweenLite.to(this.darkOverlay, 0.3, { opacity: 0.3, onStart: function () {
								this.darkOverlay.style.display = 'block';
							}.bind(this)
						});
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

					var callback = function () {
						this.timelineDropdown.reverse();
					};

					this.resetMenuCategoryHeight(callback);

				}

			}

		},

		revealCategoryMenu: function (category) {

			// reset visibility of all category modules
			this.resetCategoryMenuVisibility();

			var element = this.menuDropDownContainer.querySelector('[data-category="' + category + '"]');

			this.revealDiscoverModule(category);

			// prevent running if element doesn't exist
			// and close the drop down container if in open state
			if (!element) {

				var callback = function () {
					this.timelineDropdown.reverse();
				};

				this.resetMenuCategoryHeight(callback);

				return;

			}

			var tl = new TimelineLite({

				onStart: function () {

					element.classList.remove('hiden');

					setTimeout(function () {
						TweenLite.to(this.menuCategories, 0.3, { css: { height: this.discoveryModuleHeight + element.offsetHeight + 'px' } });
					}.bind(this), 0);

				}.bind(this),

				onComplete: function () {

				}.bind(this)

			});

			tl.to(element, 0.6, { opacity: 1 }, 0.4);

			tl.to(this.discoveryModule, 0.6, { opacity: 1 }, 0);

		},

		resetCategoryMenuVisibility: function () {

			_.forEach(this.categoryMenus, function (v, k) {
				this.categoryMenus[k].classList.add('hiden');
				this.categoryMenus[k].style.opacity = '';
			}.bind(this));

		},

		resetMenuCategoryHeight: function (callback) {

			// hide the dark overlay first
			TweenLite.to(this.darkOverlay, 0.3, { opacity: 0, onComplete: function () {
					this.darkOverlay.style.display = '';
				}.bind(this)
			});

			// hide the categories container
			var tl = new TimelineLite();

			tl.to(this.menuCategories, 0.3, { css: { opacity: 0 } });

			// minimize the menu categories and then reverse timelineDropdown animation
			tl.to(this.menuCategories, 0.3, { css: { height: '0px' }, onComplete: function () {
					if (typeof callback === "function") {
						callback.call(this);
					}
				}.bind(this)
			}, 0.3);

		},

		revealDiscoverModule: function (category) {

			this.discoveryModule.setAttribute('data-active-category', category);

			// hide any existing module
			var modules = this.discoveryModule.querySelectorAll('[data-category]');

			_.forEach(modules, function (v, k) {
				modules[k].classList.add('hiden');
			}.bind(this));

			// show active
			var tl = new TimelineLite();
			var module = this.discoveryModule.querySelector('[data-category="' + category +'"]');

			// remove hiden class
			module.classList.remove('hiden');

			tl.to(module, 0.3, { css: { opacity: 1 } }, 0);

		}

	};

	module.exports = MainMenu;

}(window.App));