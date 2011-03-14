var ams = require('../../index');

var publ = __dirname + '/public',
    src = __dirname + '/src',
    host = 'http://localhost:8888';

// build all files except of require.js, because require shouldn't be wrapped into
// transport string in our case
ams.build
    .build(src)
    .find({
        filter: /require\.js/
    })
    .process({
        cssabspath: {
            host: host
        },
        htmlabspath: {
            host: host
        },
        texttransport: false
    })
    .combine({
        js: 'main.js'
    })
    .write(publ)
    .end();


ams.build
    .build(src)
    .add(src + '/require.js')
    .process({
        // don't wrap into transport string
        jstransport: false
    })
    .write(publ)
    .end();
    