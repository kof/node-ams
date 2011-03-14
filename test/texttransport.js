QUnit.module('texttransport');

test('correct transport wrapping', function() {
    var context = {
            paths: ['/']
        };
        
    equal(
        run.call(context, '/test/test.html', 'test'),
        ';define("test/test.html", function() {\nreturn "test";\n});\n',
        'transport text is correct'  
    );

    equal(
        run.call(context, '/test/test.html', '<div class="test">test</div>'),
        ';define("test/test.html", function() {\nreturn "<div class=\\"test\\">test</div>";\n});\n',
        'transport escaping of double quotes is correct'  
    );

    equal(
        run.call(context, '/test/test.html', "<div class='test'>test</div>"),
        ";define(\"test/test.html\", function() {\nreturn \"<div class='test'>test</div>\";\n});\n",
        'transport escaping of single quotes is correct'  
    );    

    
    context.paths = ['/fui/fui/fui/'];

    equal(
        run.call(context, '/fui/fui/fui/test/test.html', 'test'),
        ';define("test/test.html", function() {\nreturn "test";\n});\n',
        'root was applied correctly'  
    ); 
});

