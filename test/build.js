var fixtures = __dirname + '/fixtures/build',
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

test('.add', function() {
    var build;

    build = create(fixtures);
    build.add(fixtures + '/1/a.js');
    ok(build.data[fixtures + '/1/a.js'] != null, 'absolute path without targetDir');

    build = create(fixtures);
    build.add(fixtures + '/1/a.js', fixtures);
    ok(build.data[fixtures + '/a.js'] != null, 'absolute path with targetDir');
    
    build = create(fixtures);
    build.add([fixtures + '/1/a.js', fixtures + '/2/1/b.js']);
    ok(build.data[fixtures + '/1/a.js'] != null && build.data[fixtures + '/2/1/b.js'] != null, 'array of paths without targetDir');
});


