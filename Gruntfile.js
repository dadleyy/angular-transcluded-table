var grunt = require('grunt'),
    fs = require('fs'),
    ejs = require('ejs');

module.exports = function( ) {
  
  grunt.loadNpmTasks('grunt-contrib-connect'); 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-smash');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    clean: ['build'],

    watch: {
      src: {
        files: ['src/**/*.js','templates/**/*.html'],
        tasks: ['build'],
        interrupt: true
      }
    },

    smash: {
      bundle: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.js'
      }
    },

    connect: {
      server: {
        options: {
          port: 1337,
          base: '',
          middleware: function( connect, options ) {
            return [
              connect.static(options.base),
              (function( request, response ) {
                var html = fs.readFileSync('example/index.html','utf8');
                response.end(ejs.render(html));
              })
            ];
          }
        }
      }
    },

    ngtemplates: {
      app: {
        options: {
          base: 'templates',
          prepend: '/tt/',
          module: 'tt'
        },
        src: 'templates/*.html',
        dest: 'build/templates.js'
      }
    }

  });

  grunt.registerTask('build', ['clean','smash','ngtemplates']);
  grunt.registerTask('dev', ['build','connect','watch']);
  grunt.registerTask('default', ['build']);

};
