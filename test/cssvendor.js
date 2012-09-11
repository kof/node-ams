QUnit.module('cssvendor');


var fs = require('fs');

var fix = __dirname + '/fixtures/cssvendor',
    origin = fs.readFileSync(fix + '/style.css', 'utf-8'),
    prefixed = fs.readFileSync(fix + '/style-prefixed.css', 'utf-8');

test('replace', function() {
    equal(
        run(null, origin).replace(/\s*/g, ''),
        prefixed.replace(/\s/g, ''),
        'vendor css are replaced'
    );
});
