console.log('navbarjs loaded!');

(function () {

	var header = document.querySelector('header'),
		header_height = getComputedStyle(header).height.split('px')[0],
		fixedClassName = 'minimize',
		headerLogo = document.querySelector('.header-logo');

	function stickyScroll(e) {
		if( window.pageYOffset > (header_height) / 2 ) {

			var tl = new TimelineLite();
			tl.to(headerLogo, 0.3, { scale: 0 });
			tl.set(header, { className: '+=' + fixedClassName });

		}

		if( window.pageYOffset < (header_height) / 2 ) {

			var tl = new TimelineLite();

			tl.to(headerLogo, 0.3, { scale: 1 });
			tl.set(header, { className: '-=' + fixedClassName });

		}
	}

	// Scroll handler to toggle classes.
	window.addEventListener('scroll', _.throttle(stickyScroll, 200), false);

}());