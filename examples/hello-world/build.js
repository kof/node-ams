var ams = require('../../index'),
    join = require('path').join;

var s = join(__dirname, 'public'),
    src = join(__dirname, 'src');

ams.build.build({
    copy: {
        src: src,
        target: s
    },
    combine: {
        main: s + '/main.js'
    }
});