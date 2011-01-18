/*
 * Javascript processor.
 *
 * Wrap js module with transport string.
 * It enables you to use commonjs module system on the client,
 * automatically generate module id from file path and inject require,
 * exports and module as private variables into the module closure.
 */

var parse = require('../deps').parse;

var tpl = ';require.def("{id}", {deps}, ' +
          'function(require, exports, module) {\n' +
              '{body}' +
          '\n});\n';

var extname = require('path').extname;

exports.pattern = /\.js$/;

/**
 * Wrap module with transport function.
 * @param {String} path path to file.
 * @param {String} data module body.
 * @param {Object} o current configuration.
 * @return {String} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    var deps, rootLength = o.copy.target.length;
    
    // remove abs path from the id
    if (path.substr(0, 1) === '/') {
        if (o.copy.target.substr(rootLength-1) !== '/') {
            rootLength += 1;
        }
        path = path.substr(rootLength);
    }        
    
    // remove ext from the name
    path = path.substr(0, path.length - extname(path).length);
    
    deps = parse(data, true);
    deps.unshift('require', 'exports', 'module');
    
    return tpl.replace('{id}', path)
              .replace('{deps}', '["' + deps.join('", "') + '"]')
              .replace('{body}', data);
};
