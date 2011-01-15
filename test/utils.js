QUnit.module('utils');
var join = require('path').join;
test('find method', 3, function() {
   var root = join(__dirname, 'fixtures', 'utils');
   
   same( find(root), [root + '/a', root + '/a.js', root + '/b.js'], 'no regexp no rec');
   
   same( 
       find(root, /\.js$/), 
       [root + '/a.js', root + '/b.js'], 
       'regexp for js files only, no rec'
   );
   
   same( 
       find(root, /\.js$/, true), 
       [root + '/a/c.js', root + '/a.js', root + '/b.js'], 
       'regexp for js files only, recursively'
   );    
});
