QUnit.module('htmlabspath');

var fixtures = __dirname + '/fixtures/htmlabspath';

var context = {
        paths: [fixtures],
        root: fixtures
    };

function runTest(o) {
    var res,
        path = fixtures + '/a.html',
        url = o.host + '/a.css';

    res = run.call(context, path, '<link rel="stylesheet" href="a.css" type="text/css"/>', o);
    equal(res, '<link rel="stylesheet" href="'+url+'" type="text/css"/>', 'relative path' );

    res = run.call(context, path, '<link\nrel="stylesheet"\nhref="a.css"\t\ntype="text/css"\n/>', o);
    equal(res, '<link\nrel="stylesheet"\nhref="' + url + '"\t\ntype="text/css"\n/>', 'link contains white spaces');

    res = run.call(context, path, '<script type="text/javascript" src="/a.css"></script>', o);
    equal(res, '<script type="text/javascript" src="'+url+'"></script>', 'absolute path' );

    res = run.call(context, path, '<script\ntype="text/javascript"\n\tsrc="/a.css"></script>', o);
    equal(res, '<script\ntype="text/javascript"\n\tsrc="' + url + '"></script>', 'script contains whitespaces');

    res = run.call(context, path, '<img src="./a.css" alt="image"/>', o);
    equal(res, '<img src="'+url+'" alt="image"/>', 'relative path using ./');

    res = run.call(context, path, '<img\n\tsrc="./a.css"\n alt="image" \n/>', o);
    equal(res, '<img\n\tsrc="'+ url +'"\n alt="image" \n/>', 'img contains whitespaces');
}

test('with host', function() {
    runTest({
        host: 'http://nodejs.org'
    });
});

test('without host', function() {
    runTest({
        host: ''
    });
});

test('url with query or hash', function() {
    var res,
        path = fixtures + '/a.html',
        url,
        o = {host: ''};

    res = run.call(context, path, '<img src="/a.css?query=true" alt="image"/>', o);
    url = o.host + '/a.css?query=true'
    equal(res, '<img src="'+url+'" alt="image"/>', 'absolute path with query' );

    res = run.call(context, path, '<img src="/a.css#hash=true" alt="image"/>', o);
    url = o.host + '/a.css#hash=true'
    equal(res, '<img src="'+url+'" alt="image"/>', 'absolute path with hash' );

});
