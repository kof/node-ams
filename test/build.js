var n = require('../deps/natives'),
    tmp = __dirname + '/tmp',
    target = tmp + '/combined.js';
    
QUnit.module('build', {
    setup: function() {
        try {
            n.fs.mkdirSync(tmp, 0777);
        } catch(e) {
            n.fs.unlinkSync(target);    
        }
    }
});

function check() {
    try {
        n.fs.statSync(target).isFile();
        ok(true, 'file was created');
    } catch(e) {
        ok(false, 'file was created');
    }    
}

test('merge all dependencies to one file', 2, function() {
    var root = n.path.join(__dirname, 'fixtures', 'build'); 
    
    build({
        src: root + '/1/a.js',
        target: target,
        root: root
    });
    
    check();

    n.fs.unlinkSync(target);    
    build({
        src: root + '/2/a.js',
        target: target,
        root: root
    });    

    check();
});