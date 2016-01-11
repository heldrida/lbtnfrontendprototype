console.log('navbarjs loaded!');

(function () {

	var header = document.querySelector('header'),
		header_height = getComputedStyle(header).height.split('px')[0],
		fixedClassName = 'minimize',
		headerLogo = document.querySelector('.header-logo'),
		nav = document.querySelector('nav'),
		tl, tlPos;

	function stickyScroll(e) {
		if( window.pageYOffset > (header_height) / 2 ) {
			if (typeof tl === 'undefined') {
				setTimelineAnim();
			} else {
				tl.play();
			}
		}

		if( window.pageYOffset < (header_height) / 2 ) {
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
		tl.to(header, 0.3, { top: '-50px' }, tlPos);
	}

	// Scroll handler to toggle classes.
	window.addEventListener('scroll', _.throttle(stickyScroll, 200), false);

}());