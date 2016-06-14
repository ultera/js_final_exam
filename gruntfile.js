module.exports = function(grunt) {

  grunt.initConfig({

    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['js/script.js'],
        dest: 'release/js/script.main.js'
      },
       js_ie8: {
        src: ['js/script-ie8.js'],
        dest: 'release/js/script-ie8.main.js'
      },
      css: {
        src: ['stylesheets/style.css'],
        dest: 'release/css/style.main.css'
      },
      css_ie8: {
        src: ['stylesheets/style-ie8.css'],
        dest: 'release/css/style-ie8.main.css'
      },
      dist: {
        src: ['stylesheets/style.css'],
        dest: 'release/css/style.main.css'
      },
      dist_ie8: {
        src: ['stylesheets/style-ie8.css'],
        dest: 'release/css/style-ie8.main.css'
      },
    },
    uglify: {
      dist: {
        src: ['release/js/script.main.js'],
        dest: 'release/js/script.main.min.js'
      },
      dist_ie8: {
        src: ['release/js/script-ie8.main.js'],
        dest: 'release/js/script-ie8.main.min.js'
      },
    },
    cssmin: {
      target: {
        files: {
          'release/css/style.main.min.css': ['stylesheets/style.css']
        }
      },
      target_ie8: {
        files: {
          'release/css/style-ie8.main.min.css': ['stylesheets/style-ie8.css']
        }
      },
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'stylesheets',
          src: ['style.scss'],
          dest: 'stylesheets',
          ext: '.css'
        }]
      },
    },
    watch: {
      sass: {
        files: ['stylesheets/**/*.scss'],
        tasks: ['sass'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'cssmin']);

};
