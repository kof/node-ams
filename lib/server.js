/*
 * Production mode: handle request and serve files.
 * Tracking mode: recieve dependencies json, analyze them and save original json,
 * write merge informations and loader json to disk.
 */ 

var connect = require('connect'),
    $ = require('../deps/sharedjs');

exports.options = {
    root: null,
    path: '/update',
    tracking: false,
    port: 3000
};

exports.run = function(opts) {
    var o = $.extend({}, exports.options, opts),
        server; 

    function assets(app) {
        app.get(o.path + '/:path', function(req, res, next){
            
        });    
    }
    
    server = connect.createServer(
        connect.staticProvider(o.root),
        connect.router(assets)
    );

    server.listen(o.port);
};
