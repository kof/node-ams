QUnit.module('jstransport');

test('correct transport wrapping', function() {
    var context = {
            paths: ['/']
        };

    equal(
        run.call(context, '/test/test.js', 'exports.test = 123;'),
        ';define("test/test", ["require", "exports", "module"], function(require, exports, module) {\nexports.test = 123;\n});\n',
        'transport text is correct'  
    );

    equal(
        run.call(context, '/test/test.js', '/*`$`*/exports.test = 123;'),
        ';define("test/test", ["require", "exports", "module"], function(require, exports, module) {\n/*`$`*/exports.test = 123;\n});\n',
        'strange thingy if using `$` inside of comments happens with processor'  
    );

    context.paths = ['/fui/fui/fui/'];

    equal(
        run.call(context, '/fui/fui/fui/test/test.js', 'exports.test = 123;'),
        ';define("test/test", ["require", "exports", "module"], function(require, exports, module) {\nexports.test = 123;\n});\n',
        'root was applied correctly'  
    ); 
    
});
