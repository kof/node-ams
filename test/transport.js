QUnit.module('transport');

test('correct transport wrapping', 2, function() {
    var o = {
            copy: {
                target: '/'
            }
        };  

    equal(
        run('/test/test.js', 'exports.test = 123;', o),
        ';require.def("test/test", ["require", "exports", "module"], function(require, exports, module) {\nexports.test = 123;\n});\n',
        'transport text is correct'  
    );
    
    o.copy.target = '/fui/fui/fui/';

    equal(
        run('/fui/fui/fui/test/test.js', 'exports.test = 123;', o),
        ';require.def("test/test", ["require", "exports", "module"], function(require, exports, module) {\nexports.test = 123;\n});\n',
        'root was applied correctly'  
    ); 
});
