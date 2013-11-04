/*
 * Find dependencies using static parsing.
 * All dynamic require arguments can't be tracked.
 */

var n = require('natives'),
    utils = require('./utils');

var rrequire = /require\s*\(\s*(?:'|")(\S*)(?:'|")\s*\)/gi;

/**
 * Parse module id string from require call in js code string.
 * @param {String} code passed code.
 * @param {Boolean} [hash] return output as a hash if true.
 * @return {Object|Array} returns hash or array with files.
 */
exports.parse = function(code, hash) {
    var paths = {};

    code.replace(rrequire, function(match, search) {
        // Avoid duplicates.
        paths[search] = true;
    });

    return hash ? paths : Object.keys(paths);
};

/**
 * Find all files, which depend on each other recursively.
 * @param {String|Object} opts
 * @param {String} opts.path Path to the bootstrap file.
 * @param {RegExp} [opts.filter] Don't parse files matched by filter.
 * @param {Array} [paths] array of lookup paths like require.paths.
 * @param {Object} [aliases]
 * @return {Array} deps paths.
 */
exports.find = function(opts, paths, aliases) {
    var map = {},
        path = opts.path || opts,
        filter = opts.filter;

    function read(path) {
        if (map[path]) {
            return;
        }

        if (!n.fs.statSync(path).isFile()) {
            throw new Error('is not a file: ' + path);
        }

        map[path] = true;

        if (filter && filter.test(path)) {
            return;
        }

        var deps = exports.parse(n.fs.readFileSync(path, 'utf-8'), true),
            dir = n.path.dirname(path),
            id,  _path, i;

        for (id in deps) {
            if (aliases && aliases[id]) {
                id = aliases[id];
            }

            // css and html files can be also included
            if (!/\.js|\.css|\.html$/.test(id)) {
                id += '.js';
            }

            // like require('fs'), then look for dir path in paths
            if (id.substr(0, 1) !== '.' && Array.isArray(paths)) {
                for (i = 0; i < paths.length; ++i) {
                    _path = n.path.join(paths[i], id);
                    try {
                        n.fs.statSync(_path);
                        path = _path;
                        break;
                    } catch(e) {}
                }
            } else {
                path = n.path.join(dir, id);
            }

            read(path);
        }
    }

    read(path);

    return Object.keys(map);
};
