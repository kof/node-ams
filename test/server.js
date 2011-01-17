var join = require('path').join;


QUnit.module('server');

test('merge information', function() {
    start({root: join(__dirname, 'fixtures', 'server')}); 
});