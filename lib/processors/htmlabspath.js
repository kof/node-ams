/*
 * HTML processor.
 * Replace relative urls in html tags "link", 'img' and "script" with absolute.
 */

var utils = require('../utils'),
    n = require('natives');

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.html$/
};

// <link href="css/index.css" rel="stylesheet" type="text/css" />
var rtags = [
    /<link.*href\s*=\s*["']([^"']+).*>/gi,
    /<script.*src\s*=\s*["']([^"']+).*>/gi,
    /<img.*src\s*=\s*["']([^"']+).*>/gi
];

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
    var self = this,
        paths = this.paths.slice(0);

    // add dirname of the file to lookup array
    // to look in currend dir first
    // f.e. url("a.png");
    // otherwise the file will not be found like its expected in browser env.
    paths.unshift(n.path.dirname(path));

    function resolve(url) {
        var resolvedUrl;

        try {
            resolvedUrl = utils.resolvePath(url, path, self.root, paths);
        } catch(err) {
            console.error(err.message);
            return url;
        }

        // its remote url, don't change it
        if (resolvedUrl === false) {
            resolvedUrl = url;
        } else {
            // make the url relative to root
            resolvedUrl = resolvedUrl.replace(self.root, '');
            // add host
            if (o.host) {
                resolvedUrl = o.host + resolvedUrl;
            }
        }

        return resolvedUrl;
    }

    rtags.forEach(function(regexp) {
        data = data.replace(regexp, function(search, url, offset, str) {
            return search.replace(url, resolve(url));
        });
    });

    return data;
};
