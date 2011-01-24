var n = require('../deps/natives'),
    fixtures = __dirname + '/fixtures/build',
    tmp = __dirname + '/tmp',
    target = tmp + '/main.js';

QUnit.module('build');

test('functional build test with all options enabled', function() {
    find({
        root: fixtures        
    })
    .process()
    .combine()
    .write(tmp);
    ok(true, 'functional test worked');
});


