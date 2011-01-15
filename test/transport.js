QUnit.module('transport');

test('correct transport wrapping', 1, function() {
    equal(
        run('test/test', 'exports.test = 123;'),
        'require.def("test/test", function factory(require, exports, module){exports.test = 123;});',
        'transport wrapper is correct'  
    );            
});
