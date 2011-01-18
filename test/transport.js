QUnit.module('transport');

test('correct transport wrapping', 2, function() {
    equal(
        run('test/test.js', 'exports.test = 123;', {target: ''}),
        'require.def("test/test.js", function factory(require, exports, module){\nexports.test = 123;\n});\n',
        'transport text is correct'  
    );
    
    equal(
        run('/fui/fui/fui/test/test.js', 'exports.test = 123;', {target: '/fui/fui/fui/'}),
        'require.def("test/test.js", function factory(require, exports, module){\nexports.test = 123;\n});\n',
        'root was applied correctly'  
    ); 
});
