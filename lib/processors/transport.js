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
 * @param {String} id path to file.
 * @param {String} data module body.
 * @param {Object} o current configuration.
 * @return {String} wraped module string.
 * @export
 */
exports.run = function(id, data, o) {
    if (o && o.root) {
        id = id.replace(o.root, '');
    }
    return tpl.replace('{id}', id).replace('{body}', data);
};
