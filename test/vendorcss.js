QUnit.module('vendorcss');

var inspect = require('util').inspect;

test('replace', function() {
    
    var ocss = 'a { box-shadow: #000 5px 3px 5px; }';
    
    expcss = 'a {\n  box-shadow: #000 5px 3px 5px;\n  -moz-box-shadow: #000 5px 3px 5px;\n  -webkit-box-shadow: #000 5px 3px 5px;\n  -o-box-shadow: #000 5px 3px 5px;\n  -ms-box-shadow: #000 5px 3px 5px;\n}\n';
    
    equal(
        run('/test/test.css', ocss),
        expcss,
        'vendor css are replaced'  
    );
});
