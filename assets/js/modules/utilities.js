/*
// Utilities JS v 0.1
// Date: May 2014
// Developers:
// 	Luis Matute - lmatute@sanservices.hn
// Description:
//	Script here will be available everywhere since we are
//  defining it to be called as AMD
// --------------------------------------------------
*/


// Wrapping everything in a SEAF(Self Executing Anonymous Function)
// to maintain the global namespace clean
;(function (window, undefined){
	// window is passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	// Define a local copy of 'util'
	var _util = {
		// Console Log
			log: function ( message, bg, color ) {
				bg = (typeof bg === 'undefined')? '#00abe6': bg;
				color = (typeof color === 'undefined')? '#fff': color;
				to_console(message,bg,color);
			},

		// Console Debug
			debug: function ( message ) {
				bg = (typeof bg === 'undefined')? '#49B571': bg;
				color = (typeof color === 'undefined')? '#fff': color;
				to_console(message,bg,color);
			},

		// Console Error
			error: function ( message ) {
				bg = (typeof bg === 'undefined')? '#EF4836': bg;
				color = (typeof color === 'undefined')? '#fff': color;
				to_console(message,bg,color);
			},

		// Loads CSS Async.
		// * Comes with a optional callback that indicates when we have
		// finished adding the css file
			loadCSS: function ( links, callback ) {
				// Check if string or array to act accordingly
				if( typeof links === 'string' ) {
					add_css(links);
				} else {
					$.each(links, function (index){
						add_css(links[index])
					});
				}

				// Check if callback is present
				if(typeof callback === 'function') {
					callback();
				}

				// Local function to loadCSS
				function add_css( url ) {
					var link = document.createElement("link");
					link.type = "text/css";
					link.rel = "stylesheet";
					link.href = url;
					document.getElementsByTagName("head")[0].appendChild(link);
				}
			},

		// Legacy consoles fix
			legacy: function () {
				// Avoid `console` errors in browsers that lack a console. Placeholder fallback
				var method,
					noop = function () {},
					methods = [
						'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
						'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
						'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
						'timeStamp', 'trace', 'warn'
					],
					length = methods.length,
					console = (window.console = window.console || {});

				while (length--) {
					method = methods[length];

					// Only stub undefined methods.
					if (!console[method]) {
						console[method] = noop;
					}
				}

				//PlaceHolder support for older browsers
				if ( !("placeholder" in document.createElement("input")) ) {
					$("input[placeholder], textarea[placeholder]").each(function() {
						var val = $(this).attr("placeholder");
						if ( this.value == "" ) {
							this.value = val;
						}
						$(this).focus(function() {
							if ( this.value == val ) {
								this.value = "";
							}
						}).blur(function() {
							if ( $.trim(this.value) == "" ) {
								this.value = val;
							}
						})
					});

					// Clear default placeholder values on form submit
					$('form').submit(function() {
						$(this).find("input[placeholder], textarea[placeholder]").each(function() {
							if ( this.value == $(this).attr("placeholder") ) {
								this.value = "";
							}
						});
					});
				}

				// String trim
				if(typeof String.prototype.trim !== 'function') {
					String.prototype.trim = function() {
						return this.replace(/^\s+|\s+$/g, '');
					}
				}

				// Object
				if (!Object.keys) {
				  	Object.keys = (function () {
						var hasOwnProperty = Object.prototype.hasOwnProperty,
							hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
							dontEnums = [
								'toString',
								'toLocaleString',
								'valueOf',
								'hasOwnProperty',
								'isPrototypeOf',
								'propertyIsEnumerable',
								'constructor'
							],
							dontEnumsLength = dontEnums.length;

						return function (obj) {
						if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

						var result = [];

						for (var prop in obj) {
							if (hasOwnProperty.call(obj, prop)) result.push(prop);
						}

						if (hasDontEnumBug) {
							for (var i=0; i < dontEnumsLength; i++) {
								if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
							}
						}
						return result;
					};
				  })();
				}

				// Array Map
				if (!Array.prototype.map) {
					Array.prototype.map = function (callback, thisArg) {
						var T, A, k;

						if (this == null) {
							throw new TypeError(" this is null or not defined");
						}

						// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
						var O = Object(this);

						// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
						// 3. Let len be ToUint32(lenValue).
						var len = O.length >>> 0;

						// 4. If IsCallable(callback) is false, throw a TypeError exception.
						// See: http://es5.github.com/#x9.11
						if (typeof callback !== "function") {
							throw new TypeError(callback + " is not a function");
						}

						// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
						if (thisArg) {
							T = thisArg;
						}

						// 6. Let A be a new array created as if by the expression new Array( len) where Array is
						// the standard built-in constructor with that name and len is the value of len.
						A = new Array(len);

						// 7. Let k be 0
						k = 0;

						// 8. Repeat, while k < len
						while (k < len) {

							var kValue, mappedValue;

							// a. Let Pk be ToString(k).
							//   This is implicit for LHS operands of the in operator
							// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
							//   This step can be combined with c
							// c. If kPresent is true, then
							if (k in O) {

							var Pk = k.toString(); // This was missing per item a. of the above comment block and was not working in IE8 as a result

							// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
							kValue = O[Pk];

							// ii. Let mappedValue be the result of calling the Call internal method of callback
							// with T as the this value and argument list containing kValue, k, and O.
							mappedValue = callback.call(T, kValue, k, O);

							// iii. Call the DefineOwnProperty internal method of A with arguments
							// Pk, Property Descriptor {Value: mappedValue, Writable: true, Enumerable: true, Configurable: true},
							// and false.

							// In browsers that support Object.defineProperty, use the following:
							// Object.defineProperty( A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

							// For best browser support, use the following:
							A[Pk] = mappedValue;
							}
							// d. Increase k by 1.
							k++;
						}

						// 9. return A
						return A;
					};
				}
			},

		// Google Analytics: change UA-XXXXX-X to be your site's ID.
			gaSetup: function ( account_id ) {
				var _gaq=[['_setAccount',account_id],['_trackPageview']];
				(function (d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
				g.src=('https:'===location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
				s.parentNode.insertBefore(g,s)}(document,'script'));
			},

		// Create Popups
			create_popup: function (url, title, w, h) {
				var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left,
					dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top,
					left, top, newWindow;

				width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
				height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
				left = ((width / 2) - (w / 2)) + dualScreenLeft;
				top = ((height / 2) - (h / 2)) + dualScreenTop;
				newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
				if (window.focus){ newWindow.focus(); }
			}
	};

	// Private Functions
	function to_console ( message, bg, color ) {
		if( app.env.toLowerCase() === 'local' ) {
			console.log( '%c' + message, "background: "+bg+"; color: "+color+"; padding: 2px 4px;" );
		}
	}

	// Exposing Utilities as a global module
		if ( typeof module === "object" && module && typeof module.exports === "object" ) {
			// Expose utilites as module.exports in loaders that implement the Node
			// module pattern (including browserify). Do not create the global, since
			// the user will be storing it themselves locally, and globals are frowned
			// upon in the Node module world.
			module.exports = _util;
		} else {
			// Register as a named AMD module, since '_util' can be concatenated with other
			// files that may use define, but not via a proper concatenation script that
			// understands anonymous AMD modules. A named AMD is safest and most robust
			// way to register.
			if ( typeof define === "function" && define.amd ) {
				define( "_util", [], function () { return _util; } );
			}
		}

	// If there is a window object, that at least has a document property,
	// define 'util' and '_' identifiers
		if ( typeof window === "object" && typeof window.document === "object" ) {
			window._util = _util;
			if( window._ === undefined ) {
				window._ = _util;
			}
		}

})(window);