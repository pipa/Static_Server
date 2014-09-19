/*
// App JS
// Date: June 2014
//
// Developers:
// 	Luis Matute     	- lmatute@sanservices.hn
// 	Jean-Pierre Sierens	- lmatute@sanservices.hn
//
// Description:
// 	This is the first JS file that's loaded.
// 	Takes care of the configuration for require
// 	and calls the common module(which loads lots of deps)
// -----------------------------------------------------
//
// Rule of thumb:
// 	Define: If you want to declare a module that other parts of your application will depend on.
// 	Require: If you just want to load and use stuff.
*/

// Setup common dependencies with shortcut alisases
require.config({
	baseUrl: app.js_filepath,
	paths: {
		// Libs
		jquery: [
			'//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min', // google cdn
			'/assets/js/libs/jquery' // fallback
        ],

		// Modules
		common: 	'modules/common',
		util: 		'modules/utilities'
	},
	shim: {
		util: 		['jquery'],
		common: 	['jquery','util']
	},
  	waitSeconds: 0
});

define(['common'], function(){
	return true;
});