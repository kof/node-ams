/*
 * CSS processor.
 * Replace relative urls in css with absolute one to be able
 * to use a cdn.
 */

var utils = require('../utils'),
    n = require('natives');

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.css$/
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
        paths = this.paths.slice(0);

    // add dirname of the file to lookup array
    // to look in currend dir first
    // f.e. url("a.png");
    // otherwise the file will not be found like its expected in browser env.
    paths.unshift(n.path.dirname(path));

    function resolve(url) {
        // url is an emebeded image data
        if (/^data\:image/.test(url)) {
            return url;
        }

        var rurl = utils.resolvePath(url, path, self.root, paths);

        // its remote url, don't change it
        if (rurl === false) {
            rurl = url;
        } else {
            // make the url relative to root
            rurl = rurl.replace(self.root, '');
            // add host
            if (o.host) {
                rurl = o.host + rurl;
            }
        }

        return rurl;
    }

    data = data.replace(rimport, function(search, url, media) {
        return '@import "' + resolve(url) + '"' + media + ';';
    });

    data = data.replace(rurl, function(search, url) {
        return 'url("' + resolve(url) + '")';
    });

    return data;
};
