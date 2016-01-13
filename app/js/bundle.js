(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global window, require, App */

// intro credits displayed in the brower console
require('./introCredits.js');

(function () {

	"use strict";

	// the global App property
	window.App = window.App || {};

	// set the main container property to the app object
	App.container = document.querySelector('.ns-clv4');

	// load the config object
	var config = require('./config.js');

	// place the config object into the App
	App.config = config;

	var Helpers = require('./helpers.js');
	var Globals = require('./globals.js');

	// set the helper obj to the App
	App.helpers = new Helpers();

	// load components
	require('./components/all.js');

}());
},{"./components/all.js":2,"./config.js":6,"./globals.js":7,"./helpers.js":8,"./introCredits.js":9}],2:[function(require,module,exports){
console.log('%c all.js loaded!', 'background: #0C0; padding: 2px; color: #FFF');

(function (App) {

	// set required component variables
	var Navbar = require('./navbar.js');
	var Buttons = require('./buttons.js');
	var MainMenu = require('./mainMenu.js');

	// create collection of component variables
	var componentsList = {
		'Navbar': Navbar,
		'MainMenu': MainMenu,
		'Buttons': Buttons
	};

	// iterate and initialise collection of components
	// place it on the main Application object
	for (var name in componentsList) {

		if (!App.hasOwnProperty(name)) {

			App[name] = new componentsList[name]();

			// displays in the console the status of the component for development only
			if (typeof App[name] !== 'undefined') {
				console.log('%c ' + name + ' component initialised!', 'background: #AEA; padding: 2px; color: #999');
			}

		} else {

			throw "Components intialisation error: Name collision detected, you're trying to initialise an object named after an existing property in the main App object, please fix!";

		}

	}

}(window.App));
},{"./buttons.js":3,"./mainMenu.js":4,"./navbar.js":5}],3:[function(require,module,exports){
console.log('%c buttons.js loaded!', 'background: #0C0; padding: 2px; color: #FFF');

(function (App) {

	"use strict";

	function Buttons () {
		this.init();
	}

	Buttons.prototype = {
		init: function () {

		}
	};

	module.exports = Buttons;

}(window.App));
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
console.log('%c navbar.js loaded!', 'background: #0C0; padding: 2px; color: #FFF');

(function (App) {

	"use strict";

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
},{}],6:[function(require,module,exports){
console.log('%c config.js loaded!', 'background: #0C0; padding: 2px; color: #FFF');

(function (App) {

	"use strict";

	var config = {}

	module.exports = config;

}(window.App));
},{}],7:[function(require,module,exports){
console.log('%c globals.js loaded!', 'background: #0C0; padding: 2px; color: #FFF');

(function (App) {

	"use strict";

	require('./polyfills');

}(window.App));
},{"./polyfills":10}],8:[function(require,module,exports){
/* global module */

console.log('%c helpers.js loaded!', 'background: #0C0; padding: 2px; color: #FFF');

(function(App) {

	"use strict";

	function Helpers() {

	}

	Helpers.prototype = {
		hasParentElement: function (el, parentEl) {
			while (el.parentNode) {
			    el = el.parentNode;
			    if (el === parentEl) {
			        return true;
			    }
			}
			return false;
		}
	};

	module.exports = Helpers;

}(window.App));
},{}],9:[function(require,module,exports){
(function () {

	"use strict";

	//var css = "font-size: 18px; text-shadow: -1px -1px hsl(0,300%,70%), 1px 1px hsl(2.4, 100%, 50%), 3px 2px hsl(43.8, 100%, 50%), 5px 3px hsl(16.2, 100%, 50%), 7px 4px hsl(21.6, 100%, 50%), 9px 5px hsl(27, 100%, 50%), 11px 6px hsl(72.4, 100%, 50%), 13px 7px hsl(37.8, 100%, 50%), 14px 8px hsl(43.2, 100%, 50%), 16px 9px hsl(48.6, 100%, 50%), 18px 10px hsl(54, 100%, 50%), 20px 11px hsl(59.4, 100%, 50%), 22px 12px hsl(64.8, 100%, 50%), 23px 13px hsl(70.2, 100%, 50%), 25px 14px hsl(75.6, 100%, 50%), 27px 15px hsl(81, 100%, 50%), 28px 16px hsl(86.4, 100%, 50%), 30px 17px hsl(91.8, 100%, 50%), 32px 18px hsl(97.2, 100%, 50%), 33px 19px hsl(102.6, 100%, 50%), 35px 20px hsl(108, 100%, 50%), 36px 21px hsl(113.4, 100%, 50%), 38px 22px hsl(118.8, 100%, 50%), 39px 23px hsl(124.2, 100%, 50%), 41px 24px hsl(129.6, 100%, 50%), 42px 25px hsl(135, 100%, 50%), 43px 26px hsl(140.4, 100%, 50%), 45px 27px hsl(145.8, 100%, 50%), 46px 28px hsl(151.2, 100%, 50%), 47px 29px hsl(156.6, 100%, 50%), 48px 30px hsl(162, 100%, 50%), 49px 31px hsl(167.4, 100%, 50%), 50px 32px hsl(172.8, 100%, 50%), 51px 33px hsl(178.2, 100%, 50%), 52px 34px hsl(183.6, 100%, 50%), 53px 35px hsl(189, 100%, 50%), 54px 36px hsl(194.4, 100%, 50%), 55px 37px hsl(199.8, 100%, 50%), 55px 38px hsl(205.2, 100%, 50%), 56px 39px hsl(210.6, 100%, 50%), 57px 40px hsl(216, 100%, 50%)";
	var css = "font-size: 14px; color: #FFF; text-shadow: -1px -1px 10px #FF0000, 2px 2px 20px #FF0055, 5px 8px 30px #FFAACC, 1px -2px 5px #FF4400";
	console.log("%c ♡ Christian Louboutin V4 ♡", css);

}());
},{}],10:[function(require,module,exports){
if (!window.Modernizr.classlist) {
	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
	if("document" in self){if(!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false,q;do{r=t[s]+"";q=g(this,r);while(q!==-1){this.splice(q,1);o=true;q=g(this,r)}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}if(q===true||q===false){return q}else{return !o}};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))}else{(function(){var b=document.createElement("_");b.classList.add("c1","c2");if(!b.classList.contains("c2")){var c=function(e){var d=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(h){var g,f=arguments.length;for(g=0;g<f;g++){h=arguments[g];d.call(this,h)}}};c("add");c("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var a=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(d,e){if(1 in arguments&&!this.contains(d)===!e){return e}else{return a.call(this,d)}}}b=null}())}};
}
},{}]},{},[1]);
