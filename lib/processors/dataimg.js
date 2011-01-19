/*
 * CSS processor.
 *
 * Replace linked images in css with base64 encoded inlined image data.
 */

var n = require('../../deps/natives'),
    $ = require('../../deps/sharedjs');

/**
 * Default options.
 * @enum {*}
 * @export
 */
exports.options = {
    pattern: /\.css$/,
    maxSize: 32768 // in bytes
};

// match url(xxx)
var r = /url *\( *(?:"|')*([^"')]+)(?:"|')* *\)/gi;


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
 * @param {Object} opts current configuration.
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, opts) {
    var o = $.extend({}, exports.options, opts.processors.dataimg);

    return data.replace(r, function(search, url) {
        var imagePath = n.path.join(opts.copy.target, url);
        return 'url("' + (getData(imagePath, o) || url) + '")';
    });
};
