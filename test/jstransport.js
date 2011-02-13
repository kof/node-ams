QUnit.module('jstransport');

test('correct transport wrapping', 2, function() {
    var context = {
            paths: ['/']
        };

    equal(
        run.call(context, '/test/test.js', 'exports.test = 123;'),
        ';define("test/test", ["require", "exports", "module"], function(require, exports, module) {\nexports.test = 123;\n});\n',
        'transport text is correct'  
    );
    
    context.paths = ['/fui/fui/fui/'];

    equal(
        run.call(context, '/fui/fui/fui/test/test.js', 'exports.test = 123;'),
        ';define("test/test", ["require", "exports", "module"], function(require, exports, module) {\nexports.test = 123;\n});\n',
        'root was applied correctly'  
    ); 
});
