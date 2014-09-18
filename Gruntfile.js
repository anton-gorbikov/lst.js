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
				forin: true,
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
				maxparams: 3,
				maxdepth: 3
			},
			uses_defaults: ['src/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint']);
};