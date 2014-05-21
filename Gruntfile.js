module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: '*.js',
                    dest: 'js'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    banner: '/* Please do not change this file. It is made by sass. */'
                },
                files: [{
                    expand: true,
                    cwd: 'src/sass',
                    src: '*.scss',
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['*.{png,jpg}'],
                    dest: 'img/'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'index.html': 'src/index.html'
                }
            }
        },
        jshint: {
            options: grunt.file.readJSON(__dirname + '/grunt/config/jshintrc'),
            www: {
                src: ['src/js/*.js']
            }
        },
        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    interrupt: true
                }
            },
            sass: {
                files: ['src/sass/*.scss'],
                tasks: ['sass'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadTasks('./grunt/task/');

    grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'imagemin', 'md2html', 'htmlmin', 'htmlhint']);
};
