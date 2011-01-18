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

exports.pattern = /\.css$/;


/**
 * Minify css.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    return sandbox.YAHOO.compressor.cssmin(data);
};
