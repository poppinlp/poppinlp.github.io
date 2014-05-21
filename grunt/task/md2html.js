module.exports = exports = function(grunt) {
    grunt.registerTask('md2html', 'Build html pages from markdown file', function () {
        var done = this.async(),
            md = require('marked'),
            markup = grunt.file.read('src/template.html', { encoding: 'utf8' }),
            jsonFile = 'list.json',
            destPath, text, urlList = [];

        md.setOptions({
            renderer: new md.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            smartLists: true
        });

        grunt.file.recurse('src/md', function (path, rootdir, subdir, file) {
            file = file.slice(0, -3);
            text = md(grunt.file.read(path, { encoding: 'utf8' }));
            markup = markup.replace('{{Title}}', file);
            markup = markup.replace('{{Content}}', text);
            file += '.html';
            destPath = subdir ? 'pages/' + subdir + '/' + file : 'pages/' + file;
            urlList.push(destPath);
            grunt.file.write(destPath, markup, { encoding: 'utf8' });
            grunt.log.ok('Build ' + destPath + ' successfully.');
        });

        grunt.file.write(jsonFile, JSON.stringify(urlList), { encoding: 'utf8' });
        done();
    });
}
