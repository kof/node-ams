/*
 * Text processor.
 *
 * Wrap any text with transport string (f.e. html code).
 * It enables to load any text via require f.e. from the cdn.
 */

var tpl = ';define("{id}", function() {\n' +
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
    var deps, id = path;

    // path is absolute
    if (id.substr(0, 1) === '/') {
        this.paths.forEach(function(lookupPath) {
            id = id.replace(lookupPath, '');
        });
        // if the lookupPath defined with slash at the end
        // f.e. /my/lib/
        if (id.substr(0, 1) === '/') {
            id = id.substr(1);
        }
    }

    data = data.replace(/[\r\t\n]/g, '')
        .replace(/"/g, '\\"');

    return tpl.replace('{id}', id)
        .replace('{body}', data);
};
