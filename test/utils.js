QUnit.module('utils');

var n = require('natives');

var fixtures = n.path.join(__dirname, 'fixtures');

var tmp = n.path.join(__dirname, 'tmp');

test('findSync', 3, function() {
   var root = fixtures + '/utils';

   same( findSync(root), [root + '/a', root + '/a.js', root + '/b.js'], 'no regexp no rec');
   same( 
       findSync(root, /\.js$/), 
       [root + '/a.js', root + '/b.js'], 
       'regexp for js files only, no rec'
   );
   
   same( 
       findSync(root, /\.js$/, true), 
       [root + '/a/c.js', root + '/a.js', root + '/b.js'], 
       'regexp for js files only, recursively'
   );    
});

test('mkdirSync', 2, function() {
    var dir1 = tmp + '/test';
    
    try {
        mkdirSync(dir1);
        n.fs.statSync(dir1);
        ok(true, 'dir '+dir1+' was created');
    } catch(e) {
        ok(false, 'create '+dir1+' failed');
    }

    var dir2 = tmp + '/test/test';

    try {
        mkdirSync(dir2);
        n.fs.statSync(dir2);
        ok(true, 'dir '+dir2+' was created');
    } catch(e) {
        ok(false, 'create '+dir2+' failed');
    }    
    
});

test('copySync', 1, function() {
   
   var src = fixtures + '/utils'; 
    
   try {
       copySync(src, tmp);
       n.fs.statSync(tmp + '/a.js');
       n.fs.statSync(tmp + '/b.js');
       n.fs.statSync(tmp + '/a/c.js');
       ok(true, 'dir '+src+' was copied');
   } catch(e) {
       console.error(e);
       ok(false, 'dir '+src+' was copied');
   }
});

test('rmSync', function(){
   var done = false; 

   try {
       rmSync(tmp);
       done = true; 
   } catch(e) {
       console.error(e);
   }
   ok(done, 'all files removed');
});
