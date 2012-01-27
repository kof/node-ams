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
        code: lib + '/deps.js',
        tests: test + '/deps.js'
    },
    {
        code: lib + '/build.js',
        tests: test + '/build.js'
    },
    {
        code: lib + '/processors/cssvendor.js',
        tests: test + '/cssvendor.js'
    },
    {
        code: lib + '/processors/uglifyjs.js',
        tests: test + '/uglifyjs.js'
    },
    {
        code: lib + '/processors/jstransport.js',
        tests: test + '/jstransport.js'
    },
    {
        code: lib + '/processors/placeholder.js',
        tests: test + '/placeholder.js'
    },
    {
        code: lib + '/processors/cssmin.js',
        tests: test + '/cssmin.js'
    },
    {
        code: lib + '/processors/dataimage.js',
        tests: test + '/dataimage.js'
    },
    {
        code: lib + '/processors/cssimport.js',
        tests: test + '/cssimport.js'
    },
    {
        code: lib + '/processors/cssabspath.js',
        tests: test + '/cssabspath.js'
    },
    {
        code: lib + '/processors/htmlabspath.js',
        tests: test + '/htmlabspath.js'
    },
    {
        code: lib + '/processors/texttransport.js',
        tests: test + '/texttransport.js'
    },
]);