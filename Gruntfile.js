module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				bitwise: true,
				camelcase: true,
				curly: true,
				eqeqeq: true,
				es3: false,
				forin: false,
				freeze: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				noempty: true,
				nonbsp: true,
				nonew: true,
				plusplus: false,
				quotmark: 'single',
				undef: true,
				unused: true,
				strict: true,
				maxparams: 5,
				maxdepth: 3,
				globals: {
					window: true,
					document: true
				}
			},
			all: ['src/*.js']
		},

		copy: {
			major: {
				src: 'package.json',
				dest: 'package.json',
				options: {
					process: function(content) {
						return content.replace(/"version": "(\d+)\.(\d+)\.(\d+)"/, function(match, p1) {
							return '"version": "' + (Number(p1) + 1) + '.0.0"';
						});
					}
				}
			},
			minor: {
				src: 'package.json',
				dest: 'package.json',
				options: {
					process: function(content) {
						return content.replace(/"version": "(\d+)\.(\d+)\.(\d+)"/, function(match, p1, p2) {
							return '"version": "' + p1 + '.' + (Number(p2) + 1) + '.0"';
						});
					}
				}
			},
			patch: {
				src: 'package.json',
				dest: 'package.json',
				options: {
					process: function(content) {
						return content.replace(/"version": "(\d+)\.(\d+)\.(\d+)"/, function(match, p1, p2, p3) {
							return '"version": "' + p1 + '.' + p2 + '.' + (Number(p3) + 1) + '"';
						});
					}
				}
			},
			hooks: {
				src: 'hooks/*',
				dest: '.git/'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('major', ['copy:major']);
	grunt.registerTask('minor', ['copy:minor']);
	grunt.registerTask('patch', ['copy:patch']);
	grunt.registerTask('install', ['copy:hooks']);
	grunt.registerTask('default', ['jshint']);
};