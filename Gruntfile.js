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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('md2html', 'Build html pages from markdown file', function() {
        var done = this.async(),
            md = require('marked'),
            destPath, text;

        md.setOptions({
            renderer: new md.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            smartLists: true,
            highlight: true
        });

        grunt.file.recurse('src/md', function (path, rootdir, subdir, file) {
            text = md(grunt.file.read(path, { encoding: 'utf8' }));
            file = file.slice(0, -2) + 'html';
            destPath = subdir ? 'pages/' + subdir + '/' + file : 'pages/' + file;
            grunt.file.write(destPath, text, { encoding: 'utf8' });
            grunt.log.ok('Build ' + destPath + ' successfully.');
            done();
        });
    });

    grunt.registerTask('default', ['uglify', 'sass', 'imagemin', 'htmlmin']);
};
