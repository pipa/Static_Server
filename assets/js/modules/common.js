/*
// Common JS
// Date: September 2014
// Developers:
// 	Luis Matute     - lmatute@sanservices.hn
// Description:
//	Code here is available site wide
// 	Note: jQuery is available, so we dont need to
//	declare it as a dependency
// --------------------------------------------------
*/

// This is the definition of the module
	define('common',[],function(){
		$(document).ready(function() {
			_util.legacy();
			bind_events();
			_.log("[common]: Initiated");
		});
	});

// General event binding
	function bind_events () {
	}