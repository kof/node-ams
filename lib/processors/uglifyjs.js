/*
 * Javascript processor.
 *
 * Wrapper for uglifyjs minifier
 * https://github.com/mishoo/UglifyJS
 */

var min = require('../../deps/uglifyjs');

/**
 * Regexp pattern which validates if this processor
 * can accept any file
 * @type {RegExp}
 * @export
 */
exports.pattern = /\.js$/;

/**
 * Minify javascript.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    var ast = min.parser.parse(data);
    ast = min.uglify.ast_mangle(ast);
    ast = min.uglify.ast_squeeze(ast);
    return min.uglify.gen_code(ast);
};
