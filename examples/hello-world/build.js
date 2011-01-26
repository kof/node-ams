var ams = require('../../index'),
    join = require('path').join;

var publ = join(__dirname, 'public'),
    src = join(__dirname, 'src');

ams.build
    .build(src)
    .find()
    .process()
    .combine({
        js: 'main.js'
    })
    .write(publ)
    .end();