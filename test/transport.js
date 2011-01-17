QUnit.module('transport');

test('correct transport wrapping', 2, function() {
    equal(
        run('test/test', 'exports.test = 123;'),
        'require.def("test/test", function factory(require, exports, module){\nexports.test = 123;\n});\n',
        'transport text is correct'  
    );
    
    equal(
        run('/fui/fui/fui/test/test', 'exports.test = 123;', {root: '/fui/fui/fui/'}),
        'require.def("test/test", function factory(require, exports, module){\nexports.test = 123;\n});\n',
        'root was applied correctly'  
    ); 
});
