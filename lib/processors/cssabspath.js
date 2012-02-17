/*
 * CSS processor.
 * Replace relative urls in css with absolute one to be able
 * to use a cdn.
 */

var utils = require('../utils'),
    n = require('natives'),
    $ = require('sharedjs');

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.css$/,
    verbose: false
};

// @import "../style.css" all print;
var rimport = /@import +["']([^"']+)["']([^;]*);/gi;

// match url(../style.css)
var rurl = /url *\( *["']*([^"')]+)["']* *\)/gi;

/**
 * Make relative pathes in css absolute.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @this Build
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    var self = this,
        paths = this.paths.slice(0),
        baseUrlObj;

    if (o.host) {
        baseUrlObj = n.url.parse(o.host);
    }

    // add dirname of the file to lookup array
    // to look in currend dir first
    // f.e. url("a.png");
    // otherwise the file will not be found like its expected in browser env.
    paths.unshift(n.path.dirname(path));

    function resolve(url) {
        var pathname,
            urlObj = n.url.parse(url);

        try {
            pathname = utils.resolvePath(url, path, self.root, paths);
        } catch(err) {
            if (o.verbose) {
                console.log(err.message);
            }
            return url;
        }

        if (pathname !== false) {

            // make the url relative to root
            paths.slice(1).forEach(function(path) {
                pathname = pathname.replace(path, '');
            });

            // add host
            if (baseUrlObj) {
                urlObj = $.extend({}, baseUrlObj, urlObj);
            }

            urlObj.pathname = pathname;
        }

        return n.url.format(urlObj);
    }

    data = data.replace(rimport, function(search, url, media) {
        return '@import "' + resolve(url) + '"' + media + ';';
    });

    data = data.replace(rurl, function(search, url) {
        return 'url("' + resolve(url) + '")';
    });

    return data;
};
