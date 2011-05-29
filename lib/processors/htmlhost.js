/*
 * HTML processor.
 * Add hostname to the urls.
 */

var htmlabspath = require('./htmlabspath');


/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = htmlabspath.options;

/**
 * Add hostname to the urls.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @this Build
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    if (!o.host) {
        throw new Error('host ist not defined');
    }
    
    return htmlabspath.run.apply(this, arguments);
};
