var tpl = 'require.def("{id}", function transport(require, exports, module){' +
              '{body}' +
          '});';

/**
 * Wrap module with transport function.
 * @param {String} path path to file.
 * @param {String} data module body.
 * @return {String} wraped module string.
 * @export
 */
exports.transport = function(path, data) {
    return tpl.replace('{id}', path).replace('{body}', data);
};
