QUnit.module('utils');

var n = require('../deps/natives');

var fixtures = n.path.join(__dirname, 'fixtures');

test('findSync', 3, function() {
   var root = n.path.join(fixtures, 'utils');

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
    var dir1 = n.path.join(__dirname, 'tmp', 'test');
    
    try {
        mkdirSync(dir1);
        n.fs.statSync(dir1);
        n.fs.rmdirSync(dir1);    
        ok(true, 'dir '+dir1+' was created');
    } catch(e) {
        ok(false, 'create '+dir1+' failed');
    }

    dir2 = n.path.join(dir1, 'test');
    try {
        mkdirSync(dir2);
        n.fs.statSync(dir2);
        n.fs.rmdirSync(dir2);    
        n.fs.rmdirSync(dir1);    
        ok(true, 'dir '+dir2+' was created');
    } catch(e) {
        ok(false, 'create '+dir2+' failed');
    }    
    
});

test('copySync', 1, function() {
   
   var target = n.path.join(__dirname, 'tmp'),
       src = n.path.join(fixtures, 'utils'); 
    
   try {
       stop();
       copy(src, target, function() {
           try {
               n.fs.statSync(target + '/a.js');
               n.fs.statSync(target + '/b.js');
               n.fs.statSync(target + '/a/c.js');
               ok(true, 'dir '+src+' was copied');
           } catch(e) {
               ok(false, 'dir '+src+' was copied');
           }
           // cleanup
           n.fs.unlinkSync(target + '/a.js');
           n.fs.unlinkSync(target + '/b.js');
           n.fs.unlinkSync(target + '/a/c.js');
           n.fs.rmdirSync(target + '/a');
           start();
       });
   } catch(e) {
       ok(false, 'dir '+src+' was copied');
   }
});
