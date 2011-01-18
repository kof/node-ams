var qunit = require('qunit'),
    join = require('path').join,
    test = join(__dirname, '..', 'test'),
    lib = join(__dirname, '..', 'lib');

qunit.options.coverage = false;

qunit.run([
    {
        code: lib + '/utils.js',
        tests: test + '/utils.js'
    },
    {
        code: lib + '/processors/transport.js',
        tests: test + '/transport.js'
    },
    {
        code: lib + '/deps.js',
        tests: test + '/deps.js'
    }     
]);