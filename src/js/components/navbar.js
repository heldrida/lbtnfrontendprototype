console.log('navbarjs loaded!');

(function (App) {

	var header = document.querySelector('header'),
		header_height = getComputedStyle(header).height.split('px')[0],
		fixedClassName = 'minimize',
		headerLogo = document.querySelector('.header-logo img'),
		headerLogoMinimal = document.querySelector('.header-logo-minimal img'),
		nav = document.querySelector('nav'),
		topMenuList = header.querySelectorAll('.tm'),
		topMenuLeftLiList = topMenuList[0].querySelectorAll('li'),
		navOffset = '20px',
		topMenuLeftRightOffset = '54px',
		tl, tlPos;

	function stickyScroll(e) {

		fixNavbar(e);

		if( window.pageYOffset > 1 ) {
			if (typeof tl === 'undefined') {
				setTimelineAnim();
			} else {
				tl.play();
			}
		}

		if( window.pageYOffset < 1 ) {
			if (typeof tl === 'undefined') {
				setTimelineAnim();
			} else {
				tl.reverse();
			}
		}
	}

	function setTimelineAnim() {

		tl = new TimelineLite({
			onStart: function () {
				header.classList.add('minimized');
			},
			onReverseComplete: function () {
				header.classList.remove('minimized');
			}
		});

		tlPos = 0;
		tl.to(headerLogo, 0.3, { scale: 0 }, tlPos);
		tl.to(headerLogoMinimal, 0.3, { opacity: 1, scale: 1 }, 0.1);
		tl.to(nav, 0.3, { css: { y: navOffset }}, tlPos);

		for (var y = 0; y < topMenuLeftLiList.length; y++) {
			tl.to(topMenuLeftLiList[y], 0.2, { css: { width: '16px' } }, 0.2);
		}

		for (var i = 0; i < topMenuList.length; i++) {
			tl.to(topMenuList[i], 0.3, { css: { y: topMenuLeftRightOffset }}, tlPos);
		}

	}

	function fixNavbar(event) {

		var y = window.pageYOffset,
			maxY = 55,
			vendorTransform = Modernizr.prefixed('transform');

		if (y < maxY) {
			header.style[vendorTransform] = 'translateY(' + (-y + 'px') + ')';
		} else {
			header.style[vendorTransform] = 'translateY(' + (-maxY) + 'px)';
		}

	}

	// Scroll handler to toggle classes.
	window.addEventListener('scroll', _.throttle(stickyScroll, 0), false);

}(window.App));