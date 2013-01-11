QUnit.module('deps');

var join = require('path').join;
var root = join(__dirname, 'fixtures', 'deps');

test('require parser', 7, function() {
    deepEqual( parse('require("test")'), ["test"], "double quots" );
    deepEqual( parse("require('test')"), ["test"], "single quots" );
    deepEqual( parse(" require ( 'test' ) "), ["test"], "with spaces" );
    deepEqual( parse("require('test/test-test')"), ["test/test-test"], "with special chars" );
    deepEqual(
        parse("require('test');function test() { test() } require(\"test1\")"),
        ["test", "test1"],
        "more real live code"
    );
    deepEqual( parse('require(test);require("fui")'), ["fui"], "take only if a string was passed" );
    deepEqual( parse('require("fui")', true), {'fui': true}, "return hash" );
});

test('find dependencies', function() {
    deepEqual(
        find(root+'/1/a.js'),
        [root + '/1/a.js', root + '/1/b.js'],
        'deps test 1, required files without any path prefix'
    );

    deepEqual(
        find(root+'/2/a.js'),
        [root + '/2/a.js', root + '/2/b.js'],
        'deps test 2, path contains ./'
    );

    deepEqual(
        find(root+'/3/b.js'),
        [root + '/3/b.js', root + '/3/1/a.js'],
        'deps test 3, b->a'
    );

    deepEqual(
        find(root+'/3/1/a.js'),
        [root + '/3/1/a.js', root + '/3/b.js'],
        'deps test 4, a->b'
    );

    deepEqual(
        find(root+'/4/c.js'),
        [root + '/4/c.js', root + '/4/1/a.js', root + '/4/b.js'],
        'deps test 4, c->a->b'
    );
});

test('add paths', function() {
    deepEqual(
        find(root+'/paths/b/b.js', [root+'/paths/a']),
        [root+'/paths/b/b.js', root+'/paths/a/a.js'],
        'using paths array, b->a'
    );
});
