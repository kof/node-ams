/*
 * Javascript processor.
 *
 * Wrapper for uglifyjs minifier
 * https://github.com/mishoo/UglifyJS
 */

var min = require('uglify-js');

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.js$/,
    verbose: false
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
    var ast = min.parser.parse(data);

    if (o.verbose) {
        min.uglify.set_logger(console.log);
    }

    ast = min.uglify.ast_mangle(ast);
    ast = min.uglify.ast_squeeze(ast);
    return min.uglify.gen_code(ast);
};
