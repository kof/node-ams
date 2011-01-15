QUnit.module('deps');

var join = require('path').join;

test('require parser', 6, function() {
    same( _parse('require("test")'), {"test": true}, "simple require, double quots" );   
    same( _parse("require('test')"), {"test": true}, "simple require, single quots" );    
    same( _parse(" require ( 'test' ) "), {"test": true}, "simple require, with spaces" );    
    same( _parse("require('test/test-test')"), {"test/test-test": true}, "simple require, with special chars" );
    same( 
        _parse("require('test'); function test() { test() } require(\"test1\")"),
        {test: true, test1: true},
        "simple require, more real live code" 
    );    
    same( _parse('require(test);require("fui")'), {fui: true}, "simple require, take only if a string was passed" );   
});

test('find dependencies', function() {
    var root = join(__dirname, 'fixtures', 'deps');

    same(
        find(root+'/1/a.js'),
        [root + '/1/a.js', root + '/1/b.js'],
        'deps test 1, required files without any path prefix'
    );

    same(
        find(root+'/2/a.js'),
        [root + '/2/a.js', root + '/2/b.js'],
        'deps test 2, path contains ./'
    );

    same(
        find(root+'/3/b.js'),
        [root + '/3/b.js', root + '/3/1/a.js'],
        'deps test 3, b->a'
    );
    
    same(
        find(root+'/3/1/a.js'),
        [root + '/3/1/a.js', root + '/3/b.js'],
        'deps test 4, a->b'
    );  
    
    same(
        find(root+'/4/c.js'),
        [root + '/4/c.js', root + '/4/1/a.js', root + '/4/b.js'],
        'deps test 4, c->a->b'
    );  

});
