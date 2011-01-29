QUnit.module('utils');

var n = require('natives');

var fixtures = __dirname + '/fixtures/utils';

var tmp = __dirname + '/tmp';

test('findSync', function() {

   same( findSync(fixtures), [fixtures + '/a', fixtures + '/a.js', fixtures + '/b.js'], 'no regexp no rec');
   
   same( 
       findSync(fixtures, /\.js$/), 
       [fixtures + '/a.js', fixtures + '/b.js'], 
       'regexp for js files only, no rec'
   );
   
   same( 
       findSync(fixtures, /\.js$/, true), 
       [fixtures + '/a/c.js', fixtures + '/a.js', fixtures + '/b.js'], 
       'regexp for js files only, recursively'
   );    
});

test('mkdirSync', function() {
    var dir = tmp + '/test';
    mkdirSync(dir);
    n.fs.statSync(dir);
    ok(true, 'dir '+dir+' was created');

    dir = tmp + '/test/test';
    mkdirSync(dir);
    n.fs.statSync(dir);
    ok(true, 'dir '+dir+' was created');
});

test('copySync', 1, function() {
   copySync(fixtures, tmp);
   n.fs.statSync(tmp + '/a.js');
   n.fs.statSync(tmp + '/b.js');
   n.fs.statSync(tmp + '/a/c.js');
   ok(true, 'dir '+fixtures+' was copied');
});

test('rmSync', function(){
   rmSync(tmp);
   ok(true, 'all files removed');
});

test('resolvePath', function(){
    var res;
    
    res = resolvePath('/a.js', null, fixtures);    
    equal(res, fixtures + '/a.js', 'abs path');
    
    res = resolvePath('./b.js', fixtures + '/a.js');    
    equal(res, fixtures + '/b.js', 'relative path');
    
    res = resolvePath('../a.js', fixtures+'/a/c.js');    
    equal(res, fixtures + '/a.js', 'relative path');
    
    res = resolvePath('a.js', null, null, [fixtures]);    
    equal(res, fixtures + '/a.js', 'path from lookup array');

    res = resolvePath('http://nodejs.org/a.js');    
    equal(res, false, 'remote url cant be resolved');
});
