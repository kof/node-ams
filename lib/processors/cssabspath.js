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

// match base64 encoded data image urls
var rdataurl = /^data:image/;

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
    var self = this;


    data = data.replace(rimport, function(search, url, media) {
        return '@import "' + utils.resolveUrl(url, path, self.root, self.paths, o) + '"' + media + ';';
    });

    data = data.replace(rurl, function(search, url) {

        // resolving paths to data image url's can be VERY slow!
        if (!rdataurl.test(url)) {
            url = utils.resolveUrl(url, path, self.root, self.paths, o);
        }

        return 'url("' + url + '")';
    });

    return data;
};
