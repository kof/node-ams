/*
 * css processor.
 *
 * Inline css using @import
 */

var n = require('natives'),
    utils = require('../utils');

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.css$/
};

// @import "../style.css" all print;
// @import url ( "../style.css" ) all print;
// @import url (../style.css);
var rimport = /@import +(?:(?:url *\( *['"]*)|['"])([^ )"']+)[^;]+;/gi;

function cloneObject(obj) {
    function F() {}
    F.prototype = obj;
    return new F;
}

/**
 * Find all import declarations and replace them with inline css.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @this Build
 * @return {string} css data.
 * @export
 */
exports.run = function run(path, data, o) {
    var self = this,
        // clone this.paths
        paths = this.paths.slice(0);

    // add dirname of the file to lookup array
    // to look in currend dir first
    // f.e. @import "a.css";
    // otherwise the file will not be found like its expected in browser env.
    paths.unshift(n.path.dirname(path));

    return data.replace(rimport, function(search, url) {
        var importPath, fakeBuild;

        importPath = utils.resolvePath(url, path, self.root, paths);

        // its remote url, don't change it
        if (importPath === false) {
            return search;
        }


        fakeBuild = cloneObject(self);
        fakeBuild.data = {};
        fakeBuild.data[importPath] = n.fs.readFileSync(importPath);
        // process imported file, because there could other stuff
        // needed to be processed like urls.
        self.process.call(fakeBuild, o);

        // remove this css file from this.data to avoid double load
        delete self.data[importPath];

        return fakeBuild.data[importPath];
    });
};
