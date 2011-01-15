module = QUnit.module;

module('deps');

test('require only', 6, function() {
    same( parse('require("test")'), ["test"], "simple require, double quots" );   
    same( parse("require('test')"), ["test"], "simple require, single quots" );    
    same( parse(" require ( 'test' ) "), ["test"], "simple require, with spaces" );    
    same( parse("require('test/test-test')"), ["test/test-test"], "simple require, with special chars" );
    same( 
        parse("require('test'); function test() { test() } require(\"test1\")"),
        ["test", "test1"], 
        "simple require, more real live code" 
    );    
    same( parse('require(test);require("fui")'), ["fui"], "simple require, take only if a string was passed" );   
});
