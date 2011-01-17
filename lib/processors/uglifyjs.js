/*
 * Javascript processor.
 *
 * Wrapper for uglifyjs minifier
 * https://github.com/mishoo/UglifyJS
 */

var min = require('../../deps/uglifyjs');

/**
 * Minify javascript.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    // don't wrap if not js
    if (!/\.js$/.test(path)) {
        return data;
    }

    var ast = min.parser.parse(data);
    ast = min.uglify.ast_mangle(ast);
    ast = min.uglify.ast_squeeze(ast);
    return min.uglify.gen_code(ast);
};
