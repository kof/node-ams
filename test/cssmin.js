QUnit.module('cssmin');

test('minify css code', 1, function() {
    equal(
        run('test/test.css', 'a { color: #000000; }'),
        'a{color:#000}',
        'minifier works'  
    );
});
