/*
 * Production mode: handle request and serve files.
 * Tracking mode: recieve dependencies json, analyze
 * them and save original json,
 * write merge informations and loader json to disk.
 */

var connect = require('../deps/connect'),
    $ = require('../deps/sharedjs'),
    util = require('util');

/**
 * Default ptions.
 * @enum {*}
 * @export
 */
exports.options = {
    root: null,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    cache: true,
    port: 8888,
    compress: null
};

/**
 * Start the static file server.
 * @param {Object} opts extends default options.
 * @export
 */
exports.start = function(opts) {
    var o = $.extend({}, exports.options, opts),
        server,
        connectTypes = connect.utils.mime.types,
        ext;

    // add all mime types from connect list
    if (!o.compress) {
        o.compress = [];
        for (ext in connectTypes) {
            o.compress.push(connectTypes[ext]);
        }
    }

    server = connect.createServer(
        connect.conditionalGet(),
        connect.cache(),
        connect.staticProvider(o),
        connect.gzip(),
        connect.staticGzip(o)
    );

    server.listen(o.port);

    util.log('ams server is running on localhost:' + o.port);
};
