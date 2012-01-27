/*
 * Universal processor.
 *
 * Replace placeholder strings.
 * Can be used f.e. to replace a version placeholder in a js file
 * or a path placeholder in a css file
 */

var regex = /\{(\S+)\}/gim;

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.js|\.css|\.html$/
};

/**
 * Replace placeholder strings.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @this Build
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    var str;

    if (typeof o !== 'object') {
        return data;
    }

    function replace(search, match) {
        // only replace if match is in hash
        if (o[match]) {
            return o[match];
        } else {
            return search;
        }
    }

    for (str in o) {
        data = data.replace(regex, replace);
    }

    return data;
};
