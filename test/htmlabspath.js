QUnit.module('htmlabspath');

var fixtures = __dirname + '/fixtures/htmlabspath';

var context = {
        paths: [fixtures],
        root: fixtures
    };

function read(path) {
    return require('fs').readFileSync(path, 'utf-8');
}

function runTest(o) {
    var res, path, url = o.host + '/a.css';

    path = fixtures + '/a.html';
    res = run.call(context, path, read(path), o);
    equal(res, '<link href="'+url+'" rel="stylesheet" type="text/css"/>', 'relative path' );

    path = fixtures + '/b.html';
    res = run.call(context, path, read(path), o);
    equal(res, '<script type="text/javascript" src="'+url+'"></script>', 'absolute path' );

    path = fixtures + '/c.html';
    res = run.call(context, path, read(path), o);
    equal(res, '<img src="'+url+'" alt="image"/>', 'relative path using ./' );
}

test('with host', function() {
    runTest({
        host: 'http://nodejs.org'
    });
});

test('without host', function() {
    runTest({
        host: ''
    });
});

test('url with query or hash', function() {
    var res, path, url, o;

    o = {host: ''};
    path = fixtures + '/d.html';
    res = run.call(context, path, read(path), o);
    url = o.host + '/a.css?query=true'
    equal(res, '<img src="'+url+'" alt="image"/>', 'absolute path with query' );

    path = fixtures + '/e.html';
    res = run.call(context, path, read(path), o);
    url = o.host + '/a.css#hash=true'
    equal(res, '<img src="'+url+'" alt="image"/>', 'absolute path with hash' );

});