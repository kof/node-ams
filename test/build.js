var n = require('natives'),
    fixtures = __dirname + '/fixtures/build',
    tmp = __dirname + '/tmp',
    target = tmp + '/main.js';

QUnit.module('build');

test('functional build test with all options enabled', function() {
    create(fixtures)
        .find()
        .process()
        .combine()
        .write(tmp);
    ok(true, 'functional test worked');
});


