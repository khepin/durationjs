/**
 * To use grunt, refer to http://gruntjs.com/
 */
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['duration.js', 'specs/**/*.js']
    },
    clean: {
      build: ['build/']
    },
    uglify: {
      build: {
        src: ['duration.js'],
        dest: './build/duration.min.js'
      }
    },
    jasmine: {
      specs: {
        src : 'duration.js',
        options: {
          specs: 'specs/specs.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', 'jshint');
  grunt.registerTask('spec', 'jasmine-server');
  grunt.registerTask('build', ['jshint', 'clean', 'uglify']);
};