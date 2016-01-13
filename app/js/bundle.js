(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global window, require, App */

(function () {

	"use strict";

	// The global App property
	window.App = window.App || {};

	var Helpers = require('./helpers.js');
	var Globals = require('./globals.js');

	// Set the helper obj to the App
	App.helpers = new Helpers();

	// Load components
	require('./components/all.js');

}());
},{"./components/all.js":2,"./globals.js":6,"./helpers.js":7}],2:[function(require,module,exports){
console.log('all.js loaded!');

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

		}

	}

}(window.App));
},{"./buttons.js":3,"./mainMenu.js":4,"./navbar.js":5}],3:[function(require,module,exports){
console.log('button.js loaded!');

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
console.log('mainMenu.js loaded!');

(function (App) {

	"use strict";

	function MainMenu (params) {
		this.init(params);
	}

	MainMenu.prototype = {
		init: function (params) {

		}
	};

	module.exports = MainMenu;

}(window.App));
},{}],5:[function(require,module,exports){
console.log('navbarjs loaded!');

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
console.log('global.js loaded!!');

require('./polyfills.js');
},{"./polyfills.js":8}],7:[function(require,module,exports){
"use strict";

function Helpers() {

}

Helpers.prototype = {};

module.exports = Helpers;
},{}],8:[function(require,module,exports){
if (!window.Modernizr.classlist) {
	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
	if("document" in self){if(!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false,q;do{r=t[s]+"";q=g(this,r);while(q!==-1){this.splice(q,1);o=true;q=g(this,r)}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}if(q===true||q===false){return q}else{return !o}};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))}else{(function(){var b=document.createElement("_");b.classList.add("c1","c2");if(!b.classList.contains("c2")){var c=function(e){var d=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(h){var g,f=arguments.length;for(g=0;g<f;g++){h=arguments[g];d.call(this,h)}}};c("add");c("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var a=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(d,e){if(1 in arguments&&!this.contains(d)===!e){return e}else{return a.call(this,d)}}}b=null}())}};
}
},{}]},{},[1]);
