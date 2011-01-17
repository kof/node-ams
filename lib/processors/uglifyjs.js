/*
 * Javascript processor.
 *
 * Wrapper for uglifyjs minifier
 * https://github.com/mishoo/UglifyJS
 */

var min = require('../../deps/uglifyjs');

/**
 * Minify javascript.
 * @param {String} id path to file.
 * @param {String} data module body.
 * @param {Object} o current configuration.
 * @return {String} wraped module string.
 * @export
 */
exports.run = function(id, data, o) {
    var ast = min.parser.parse(data);
    ast = min.uglify.ast_mangle(ast);
    ast = min.uglify.ast_squeeze(ast);
    return min.uglify.gen_code(ast);
};
