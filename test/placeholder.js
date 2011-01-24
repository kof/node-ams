QUnit.module('placeholder');

test('replace placeholder in code', 1, function() {
    var code = '{VER} exports.test = 123;\n var test = "test";\n {COPYRIGHT}',
        o = {
            'VER': '0.1.2',
            'COPYRIGHT': 'some text'
        };
        
    equal(
        run('test/test.js', code, o),
        '0.1.2 exports.test = 123;\n var test = "test";\n some text',
        'placeholder works'  
    );
});
