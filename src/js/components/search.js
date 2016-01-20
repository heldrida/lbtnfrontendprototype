console.log('%c search.js loaded!', 'background: #0C0; padding: 2px; color: #FFF');

(function (App) {

	"use strict";

	function Search () {
		this.init();
		this.setEventListeners();
	}

	Search.prototype = {
		init: function () {
			this.timelineDropdown = undefined;
			this.hasParentElement = App.helpers.hasParentElement;
			this.header = document.querySelector('header');
			this.mainMenu = document.querySelector('.main-menu');
			this.searchContainer = document.querySelector('.search-container');
			this.form = this.searchContainer.querySelector('form');
			this.iconMagnifier = document.querySelector('header .icon-magnifier');
			this.layerBottom = document.querySelector('header .layer-bottom');
			this.containerHeight = '140px';
		},

		setEventListeners: function () {
			this.iconMagnifier.addEventListener('click', this.dropDownSearchHandler.bind(this));
			document.body.addEventListener('click', this.searchDropDownStateHandler.bind(this));
			this.form.search.addEventListener('focus', this.caretFocusHandler.bind(this));
			this.form.search.addEventListener('blur', this.caretBlurHandler.bind(this));
		},

		dropDownSearchHandler: function () {

			if (typeof this.timelineDropdown === 'undefined') {

				// animation process
				this.timelineDropdown = new TimelineLite({

					onStart: function () {
						this.header.classList.add('drop-down-open');
					}.bind(this),

					onComplete: function () {

						this.header.classList.add('search-open');

					}.bind(this),

					onReverseComplete: function () {
						this.header.classList.remove('drop-down-open');
						this.resetPlaceholder();
					}.bind(this)

				});

				this.timelineDropdown.to(this.layerBottom, 0.3, { css: { y: 0 } });
				this.timelineDropdown.to(this.searchContainer, 0.3, { css: { height: this.containerHeight } }, 0);

			} else {

				// play cached timeline
				this.timelineDropdown.play();

			}

		},

		searchDropDownStateHandler: function (e) {

			if (this.header.classList.contains('search-open')) {

				if (this.hasParentElement(e.target, this.mainMenu)) {

					return null;

				} else if (!this.hasParentElement(e.target, this.searchContainer) && e.target !== this.searchContainer) {

					this.header.classList.remove('search-open');
					this.timelineDropdown.reverse();

				}

			}

		},

		caretFocusHandler: function () {

			this.searchContainer.classList.add('focus');

		},

		caretBlurHandler: function () {

			this.searchContainer.classList.remove('focus');

		},

		resetPlaceholder: function () {

			this.form.search.value = '';

		}

	};

	module.exports = Search;

}(window.App));