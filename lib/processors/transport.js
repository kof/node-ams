/*
 * Javascript processor.
 * 
 * Wrap js module with transport string.
 * It enables you to use require on the client, automatically generate module id from
 * file path and inject require, exports and module as private variables into the
 * module closure.
 */

var tpl = 'require.def("{id}", function factory(require, exports, module){' +
              '{body}' +
          '});';

/**
 * Wrap module with transport function.
 * @param {String} path path to file.
 * @param {String} data module body.
 * @param {Object} o current configuration.
 * @return {String} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    if (o.root) {
        path = path.replace(o.root, '');
    }
    return tpl.replace('{id}', path).replace('{body}', data);
};
