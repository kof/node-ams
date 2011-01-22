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
    pattern: /\.js|\.css$/
};

/**
 * Replace placeholder strings.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    var hash = o.processors.placeholder,
        str;

    if (typeof hash !== 'object') {
        return data;
    }

    function replace(search, match) {
        // only replace if match is in hash
        if (hash[match]) {
            return hash[match];
        } else {
            return search;
        }
    }

    for (str in hash) {
        data = data.replace(regex, replace);
    }

    return data;
};
