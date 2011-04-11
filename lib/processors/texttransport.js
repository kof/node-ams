/*
 * Text processor.
 *
 * Wrap any text with transport string (f.e. html code).
 * It enables to load any text via require f.e. from the cdn.
 */

var tpl = ';define("{path}", function() {\n' +
              'return "{body}";' +
          '\n});\n';

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.html$/
};

/**
 * Wrap module with transport function string.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @this Build
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    // convert absolute path to relative one
    if (path.substr(0, 1) === '/') {
        this.paths.forEach(function(lookupPath) {
            path = path.replace(lookupPath, '');
        });
        // if the lookupPath defined with slash at the end
        // f.e. /my/lib/
        if (path.substr(0, 1) === '/') {
            path = path.substr(1);
        }
    }

    data = data.replace(/[\r\t\n]/g, '').replace(/"/g, '\\"');

    return tpl.replace('{path}', path).replace('{body}', data);
};
