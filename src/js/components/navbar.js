console.log('navbarjs loaded!');

(function (App) {

	var header = document.querySelector('header'),
		header_height = getComputedStyle(header).height.split('px')[0],
		fixedClassName = 'minimize',
		headerLogo = document.querySelector('.header-logo'),
		nav = document.querySelector('nav'),
		topMenuList = header.querySelectorAll('.tm'),
		tl, tlPos;

		console.log('topMenuList', topMenuList);

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
		tl = new TimelineLite(),
		tlPos = 0;
		tl.to(headerLogo, 0.3, { scale: 0 }, tlPos);
		tl.to(nav, 0.3, { css: { y: '20px' }}, tlPos);
		//tl.to(header, 0.3, { css: { y: '-50px' }}, tlPos);

		for (var i = 0; i < topMenuList.length; i++) {
			tl.to(topMenuList[i], 0.3, { css: { y: '54px' }}, tlPos);
		}

	}

	function fixNavbar(event) {

		var y = window.pageYOffset,
			maxY = 55,
			vendorTransform = Modernizr.prefixed('transform');

		console.log('y', y);

		if (y < maxY) {
			header.style[vendorTransform] = 'translateY(' + (-y + 'px') + ')';
		} else {
			header.style[vendorTransform] = 'translateY(' + (-maxY) + 'px)';
		}

	}

	// Scroll handler to toggle classes.
	window.addEventListener('scroll', _.throttle(stickyScroll, 0), false);

}(window.App));