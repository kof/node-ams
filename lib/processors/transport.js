/*
 * Javascript processor.
 *
 * Wrap js module with transport string.
 * It enables you to use commonjs module system on the client,
 * automatically generate module id from file path and inject require,
 * exports and module as private variables into the module closure.
 */

var tpl = 'require.def("{id}", function factory(require, exports, module){\n' +
              '{body}' +
          '\n});\n';

/**
 * Wrap module with transport function.
 * @param {String} path path to file.
 * @param {String} data module body.
 * @param {Object} o current configuration.
 * @return {String} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    // don't wrap if not js
    if (!/\.js$/.test(path)) {
        return data;
    }
    
    if (o && o.root) {
        path = path.replace(o.root, '');
    }
    
    return tpl.replace('{id}', path).replace('{body}', data);
};
