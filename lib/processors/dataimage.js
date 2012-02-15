/*
 * CSS processor.
 *
 * Replace linked images in css with base64 encoded inlined image data.
 *
 */

var n = require('natives'),
    $ = require('sharedjs'),
    utils = require('../utils');

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.css|\.html$/,

    // in bytes
    maxSize: 32768,

    html: true,
    css: true,
    verbose: false
};


// match url(xxx)
var rurl = /url *\( *["']*([^"')]+)["']* *\)/gi,
    rimg = /<img.*src\s*=\s*["']([^"']+).*>/gi,
    extFilter = /\.jpg|\.png|\.gif$/;

/**
 * Get data string ready to inline it.
 * @param {string} path path to the file.
 * @param {Object} o options.
 * @return {string|boolean} returns false if file size limit reached.
 */
function getData(path, o) {
    var stat, data;

    stat = n.fs.statSync(path);

    // some browser has inlined data size limits
    if (stat.size > o.maxSize) {
        return false;
    }

    data = 'data:image/';
    data += n.path.extname(path).substr(1) + ';';
    data += 'base64,';
    data += n.fs.readFileSync(path).toString('base64');
    return data;
}


/**
 * Replace external background images with base64 encoded inlined.
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
        css = /\.css$/.test(path),
        html = /\.html$/.test(path);

    // add dirname of the file to lookup array
    // to look in currend dir first
    // f.e. url ("a.png");
    // otherwise the file will not be found like its expected in browser env.
    paths.unshift(n.path.dirname(path));

    // css files are disabled
    if (css && !o.css) {
        return data;
    }

    // html files are disabled
    if (html && !o.html) {
        return data;
    }

    return data.replace(css ? rurl : rimg, function(search, url) {
        var resolvedPath,
            data = url;

        // support image files only
        if (extFilter.test(url)) {
            try {
                resolvedPath = utils.resolvePath(url, path, self.root, paths);
            } catch(err) {
                if (o.verbose) {
                    console.log(err.message);
                }
            }
        }

        if (resolvedPath) {
            data = getData(resolvedPath, o);
            if (data) {
                // remove the image from the list for the case it was
                // added via .find
                delete self.data[resolvedPath];
            }
        }

        if (css) {
            return 'url("' + (data || url) + '")';
        } else {
            return search.replace(url, data);
        }

    });
};
