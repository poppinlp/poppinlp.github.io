module.exports = function(grunt) {
    var configObj = {};

    // uglify
    configObj.uglify = {
        dist: {
            files: [{
                expand: true,
                cwd: 'src/js',
                src: '*.js',
                dest: 'js'
            }]
        }
    };

    // sass
    configObj.sass = {
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
    };

    // imagemin
    configObj.imagemin = {
        dynamic: {
            files: [{
                expand: true,
                cwd: 'src/img/',
                src: ['*.{png,jpg}'],
                dest: 'img/'
            }]
        }
    };

    // htmlmin
    configObj.htmlmin = {
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            files: {
                'index.html': 'src/index.html'
            }
        }
    };

    // jshint
    configObj.jshint = {
        options: grunt.file.readJSON(__dirname + '/grunt/config/jshintrc'),
        www: {
            src: ['src/js/*.js']
        }
    };

    // watch
    configObj.watch = {
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
    };

    // sprite
    var fs = require('fs'), dirList, dir, spritePath = 'src/sprite/';
    configObj.sprite = {};
    dirList = fs.readdirSync(spritePath);
    while (dir = dirList.pop()) {
        configObj.sprite[dir] = {
            src: spritePath + dir + '/*.png',
            destImg: 'src/img/' + dir + '.png',
            destCSS: 'src/sass/sprite/_' + dir + '.scss',
            imgPath: '../img/' + dir + '.png',
            imgOpts: {
                format: 'png',
                quality: 100
            }
        }
    }

    grunt.config.init(configObj);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadTasks('./grunt/task/');

    grunt.registerTask('default', ['jshint', 'uglify', 'sprite', 'sass', 'imagemin', 'md2html', 'htmlmin', 'htmlhint']);
};
