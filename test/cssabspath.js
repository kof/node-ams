var n = require('natives');

QUnit.module('cssabspath');

var fixtures = __dirname + '/fixtures/cssabspath';

test('base', function() {
    var o = {
        host: 'http://nodejs.org'
    };
    
    var context = {
        paths: [fixtures],
        root: fixtures
    };
    
    var res, path;

    path = fixtures + '/a.css';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'), o);
    equal(res, 'a { background: url("http://nodejs.org/a.png") }', 'relative path' );

    path = fixtures + '/b.css';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'), o);
    equal(res, 'a { background: url("http://nodejs.org/a.png") }', 'absolute path' );

    path = fixtures + '/c.css';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'), o);
    equal(res, 'a { background: url("http://nodejs.org/a.png") }', 'relative path using ./' );

    path = fixtures + '/d.css';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'), o);
    equal(res, '@import url("http://nodejs.org/a.css") all;@import url("http://nodejs.org/a.css") all;@import url("http://nodejs.org/a.css") all;', '@import url()' );

    path = fixtures + '/e.css';
    res = run.call(context, path, n.fs.readFileSync(path, 'utf8'), o);
    equal(res, '@import "http://nodejs.org/a.css" all;@import "http://nodejs.org/a.css" all;', '@import ""' );
});
