/*
 * CSS processor.
 *
 * Replace linked images in css with base64 encoded inlined image data.
 */

/**
 * Regexp pattern which validates if this processor
 * can accept any file
 * @type {RegExp}
 * @export
 */
exports.pattern = /\.css$/;

/**
 * Replace external background images with base64 encoded inlined.
 * @param {String} path path to file.
 * @param {String} data module body.
 * @param {Object} o current configuration.
 * @return {String} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    return data;
};
