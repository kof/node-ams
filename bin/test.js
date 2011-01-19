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
        code: lib + '/processors/vendorcss.js',
        tests: test + '/vendorcss.js'
    },
    {
        code: lib + '/processors/uglifyjs.js',
        tests: test + '/uglifyjs.js'
    },    
    {
        code: lib + '/processors/transport.js',
        tests: test + '/transport.js'
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
        code: lib + '/processors/dataimg.js',
        tests: test + '/dataimg.js'
    },    
      
]);