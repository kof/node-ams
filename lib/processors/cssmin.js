/*
 * CSS processor.
 *
 * Minify css using js port of yuicompressor
 * https://github.com/stoyan/yuicompressor
 * https://github.com/stoyan/yuicompressor/blob/master/ports/js/cssmin.js
 */

var minPath = __dirname + '/../../deps/yuicompressor/ports/js/cssmin.js',
    fs = require('fs'),
    sandbox = {};

require('vm').runInNewContext(fs.readFileSync(minPath), sandbox, minPath);

/**
 * Minify css.
 * @param {String} path path to file.
 * @param {String} data module body.
 * @param {Object} o current configuration.
 * @return {String} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    // don't wrap if not css
    if (!/\.css$/.test(path)) {
        return data;
    }

    return sandbox.YAHOO.compressor.cssmin(data);
};
