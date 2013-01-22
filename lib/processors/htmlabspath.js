/*
 * HTML processor.
 * Replace relative urls in html tags "link", 'img' and "script" with absolute.
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
    pattern: /\.html$/,
    verbose: false
};

// <link href="css/index.css" rel="stylesheet" type="text/css" />
var rurl = /<(link|script|img)[^>]+(src|href)\s*=\s*["']([^"']+)[^>]*>/gi;

/**
 * Make relative pathes absolute.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @this Build
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    var self = this;

    return data.replace(rurl, function(search, tag, attr, url, offset, str) {
        var resolvedUrl = utils.resolveUrl(url, path, self.root, self.paths, o);
        return search.replace(url, resolvedUrl);
    });
};
