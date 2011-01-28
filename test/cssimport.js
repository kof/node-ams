var n = require('natives');

QUnit.module('cssimport');

var fixtures = __dirname + '/fixtures/cssimport';
 
test('base', function() {
    var path, res;
    var context = {
        data: {},
        paths: []    
    };
    var a = 'a {font-size: 14px;}';
    
    
    path = fixtures + '/a.css';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'));
    equal(res, a, 'no @import'); 
    
    path = fixtures + '/b.css';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'));
    equal(res, a, 'import using relative path and without url()'); 

    path = fixtures + '/c.css';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'));
    equal(res, a, 'import using relative path and with url() and medias'); 

    path = fixtures + '/d.css';
    context.paths = [fixtures];
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'));
    equal(res, a, 'import using absolute path - paths lookup test');

    path = fixtures + '/e.css';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'));
    equal(res, '@import "http://test.com/test.css";', 'import from remote url');

    path = fixtures + '/f.css';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'));
    equal(res, a, 'recursive import');
});
