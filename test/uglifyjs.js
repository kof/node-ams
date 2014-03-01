QUnit.module('uglifyjs');

test('minify js code', 1, function() {
    equal(
        run('test/test.js', 'exports.test = 123;\n var test = "test";\n', {fromString: true}),
        'exports.test=123;var test="test";',
        'minifier works'
    );
});
