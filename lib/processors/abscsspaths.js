/*
 * CSS processor.
 * Replace relative urls in css with absolute one.
 */

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.css$/
};

/**
 * Make relative pathes in css absolute.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    return data;
};
