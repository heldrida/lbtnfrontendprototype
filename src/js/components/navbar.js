console.log('navbarjs loaded!');

(function () {

	var header = document.querySelector('header'),
		header_height      = getComputedStyle(header).height.split('px')[0],
		fixedClassName = 'minimize',
		headerLogo = document.querySelector('.header-logo');

	function stickyScroll(e) {
		if( window.pageYOffset > (header_height) / 2 ) {
			TweenLite.to(headerLogo, 0.3, { scale: 0, onComplete: function () {
					header.classList.add(fixedClassName);
				}
			});
		}

		if( window.pageYOffset < (header_height) / 2 ) {
			TweenLite.to(headerLogo, 0.3, { scale: 1, onComplete: function () {
					header.classList.remove(fixedClassName);
				}
			});
		}
	}

	// Scroll handler to toggle classes.
	window.addEventListener('scroll', _.throttle(stickyScroll, 100), false);

}());