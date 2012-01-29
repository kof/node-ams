QUnit.module('cssabspath');

var fixtures = __dirname + '/fixtures/cssabspath';

var context = {
        paths: [fixtures],
        root: fixtures
    };

function read(path) {
    return require('fs').readFileSync(path, 'utf8')
}

function runTests(o) {
    var res, path,
        url = o.host + '/a.png';

    path = fixtures + '/a.css';
    res = run.call(context, path, read(path), o);
    equal(res, 'a { background: url("'+ url +'") }', 'relative path' );

    path = fixtures + '/b.css';
    res = run.call(context, path, read(path), o);
    equal(res, 'a { background: url("'+ url +'") }', 'absolute path' );

    path = fixtures + '/c.css';
    res = run.call(context, path, read(path), o);
    equal(res, 'a { background: url("' + url + '") }', 'relative path using ./' );

    url = o.host + '/a.css';

    path = fixtures + '/d.css';
    res = run.call(context, path, read(path), o);
    equal(res, '@import url("'+url+'") all;@import url("'+url+'") all;@import url("'+url+'") all;', '@import url()' );

    path = fixtures + '/e.css';
    res = run.call(context, path, read(path), o);
}

test('without host', function() {
    runTests({host: ''});
});

test('with host', function() {
    runTests({
        host: 'http://nodejs.org'
    });
});

test('url with query or hash', function() {
    var res, path,
        o = {host: ''},
        url = o.host + '/a.png';

    path = fixtures + '/f.css';
    res = run.call(context, path, read(path), o);
    equal(res, '@import "/a.css?query=123" all;@import "/a.css#hash" all;', 'url with query and hash' );
});
