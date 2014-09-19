// ==============================================
// 	File: gruntfile.js
// 	Author: Luis Matute
// 	Description:
//   Automatic compiling, cleaning, concatenation
// 	 and minification of assets and livereload
//	 for a basic static server
//
// You are not meant to understand this
// ==============================================

// Grunt Wrapper
module.exports = function (grunt) {
	'use strict';

	var livereloadPort = 35729;

	// Project Configuration ===================/
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				banner: '/*! ================================================================\n'+
						'\t<%= pkg.name %>\n'+
						'\tLast Update: <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT Z") %>\n'+
						'================================================================= */',
				style: 'compressed'
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'assets/sass/',
						src: ['**/*.scss'],
						dest: 'assets/css/',
						ext: '.css'
					}
				]
			}
		},
		connect: {
			server: {
				options:{
					port: 3000,
					hostname: "localhost"
				}
			}
		},
		watch: {
			css: {
				files: ['assets/**/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
					livereload: livereloadPort
				}
			},
			html: {
				files: ['**/*.html'],
				options: {
					livereload: livereloadPort
				}
			}
		}
	});

	// DEPENDENT PLUGINS =======================/
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	// TASKS ===================================/
	grunt.registerTask('default', ['connect','watch']);
};