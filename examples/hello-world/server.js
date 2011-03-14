var ams = require('../../index');

ams.server.create({
    root: __dirname + '/public'
}).listen(8888);
