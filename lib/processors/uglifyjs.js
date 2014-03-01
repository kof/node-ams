/*
 * Javascript processor.
 *
 * Wrapper for uglifyjs minifier
 * https://github.com/mishoo/UglifyJS
 */

var uglify = require('uglify-js');

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.js$/,
    verbose: false,
    fromString: true
};

/**
 * Minify javascript.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @this Build
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    return uglify.minify(data, o).code
};
