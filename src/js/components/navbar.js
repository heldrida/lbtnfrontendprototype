console.log('navbarjs loaded!');

(function (App) {

	function Navbar () {
		this.init();
	}

	Navbar.prototype = {
		init: function () {
			this.setProperties();
			this.setEventListeners();
		},

		setProperties: function () {
			this.header = document.querySelector('header');
			this.header_height = getComputedStyle(this.header).height.split('px')[0];
			this.fixedClassName = 'minimize';
			this.headerLogo = document.querySelector('.header-logo img');
			this.headerLogoMinimal = document.querySelector('.header-logo-minimal img');
			this.nav = document.querySelector('nav');
			this.topMenuList = this.header.querySelectorAll('.tm');
			this.topMenuLeftLiList = this.topMenuList[0].querySelectorAll('li');
			this.navOffset = '20px';
			this.topMenuLeftRightOffset = '54px';
			this.tl;
			this.tlPos;
		},

		setEventListeners: function () {

			// Scroll handler to toggle classes.
			window.addEventListener('scroll', this.stickyScroll.bind(this), false);

		},

		stickyScroll: function (e) {

			this.fixNavbar(e);

			if( window.pageYOffset > 1 ) {
				if (typeof this.tl === 'undefined') {
					this.setTimelineAnim();
				} else {
					this.tl.play();
				}
			}

			if( window.pageYOffset < 1 ) {
				if (typeof this.tl === 'undefined') {
					this.setTimelineAnim();
				} else {
					this.tl.reverse();
				}
			}

		},

		fixNavbar: function (event) {

			var y = window.pageYOffset,
				maxY = 55,
				vendorTransform = Modernizr.prefixed('transform');

			if (y < maxY) {

				this.header.style[vendorTransform] = 'translateY(' + (-y + 'px') + ')';

			} else {

				this.header.style[vendorTransform] = 'translateY(' + (-maxY) + 'px)';

			}

		},

		setTimelineAnim: function () {

			this.tl = new TimelineLite({
				onStart: function () {
					this.header.classList.add('minimized');
				}.bind(this),
				onReverseComplete: function () {
					this.header.classList.remove('minimized');
				}.bind(this)
			});

			this.tlPos = 0;
			this.tl.to(this.headerLogo, 0.3, { scale: 0 }, this.tlPos);
			this.tl.to(this.headerLogoMinimal, 0.3, { opacity: 1, scale: 1 }, 0.1);
			this.tl.to(this.nav, 0.3, { css: { y: this.navOffset }}, this.tlPos);

			for (var y = 0; y < this.topMenuLeftLiList.length; y++) {

				this.tl.to(this.topMenuLeftLiList[y], 0.2, { css: { width: '16px' } }, 0.2);

			}

			for (var i = 0; i < this.topMenuList.length; i++) {

				this.tl.to(this.topMenuList[i], 0.3, { css: { y: this.topMenuLeftRightOffset }}, this.tlPos);

			}

		}


	};

	module.exports = Navbar;

}(window.App));