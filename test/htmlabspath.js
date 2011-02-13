var n = require('natives');

QUnit.module('htmlabspath');

var fixtures = __dirname + '/fixtures/htmlabspath';

test('base', function() {
    var o = {
        host: 'http://nodejs.org'
    };
    
    var context = {
        paths: [fixtures],
        root: fixtures
    };
    
    var res, path;

    path = fixtures + '/a.html';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'), o);

    equal(res, '<link href="http://nodejs.org/a.css" rel="stylesheet" type="text/css"/>', 'relative path' );
    
    path = fixtures + '/b.html';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'), o);
    equal(res, '<script type="text/javascript" src="http://nodejs.org/a.css"></script>', 'absolute path' );

    path = fixtures + '/c.html';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'), o);
    equal(res, '<img src="http://nodejs.org/a.css" alt="image"/>', 'relative path using ./' );
});
