console.log('navbarjs loaded!');

(function () {

	var header = document.querySelector('header'),
		header_height      = getComputedStyle(header).height.split('px')[0],
		fixedClassName = 'minimize';

	function stickyScroll(e) {
		if( window.pageYOffset > (header_height) / 2 ) {
			header.classList.add(fixedClassName);
		}

		if( window.pageYOffset < (header_height) / 2 ) {
			header.classList.remove(fixedClassName);
		}
	}

	// Scroll handler to toggle classes.
	window.addEventListener('scroll', stickyScroll, false);

}());