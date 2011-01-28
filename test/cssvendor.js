QUnit.module('vendorcss');

var inspect = require('util').inspect;

test('replace', function() {
    
    var ocss = 'a { box-shadow: #000 5px 3px 5px; font-size: 12px}';
    
    expcss = 'a {\
                box-shadow: #000 5px 3px 5px;\
                -moz-box-shadow: #000 5px 3px 5px;\
                -webkit-box-shadow: #000 5px 3px 5px;\
                -o-box-shadow: #000 5px 3px 5px;\
                -ms-box-shadow: #000 5px 3px 5px;\
                font-size: 12px;\
              }'.replace(/\s/g, '');
    equal(
        run('/test/test.css', ocss).replace(/\s*/g, ''),
        expcss,
        'vendor css are replaced'  
    );
});
