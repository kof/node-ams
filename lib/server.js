/*
 * Production mode: handle request and serve files.
 * Tracking mode: recieve dependencies json, analyze
 * them and save original json,
 * write merge informations and loader json to disk.
 */

var connect = require('connect'),
    $ = require('sharedjs'),
    util = require('util');

/**
 * Default ptions.
 * @type {Object}
 * @export
 */
exports.options = {
    root: null,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    cache: true,
    compress: null
};

/**
 * Start the static file server.
 * @param {Object} opts extends default options.
 * @return {Object} server instance of connect.HTTPServer.
 * @export
 */
exports.create = function(opts) {
    var o = $.extend({}, exports.options, opts),
        server, listen,
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

    listen = server.listen;

    server.listen = function(port) {
        util.log('ams server is running on port ' + port);
        return listen.apply(this, arguments);
    };

    return server;
};
