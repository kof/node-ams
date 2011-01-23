/*
 * Find dependencies using static parsing.
 * All dynamic require arguments can't be tracked.
 */

var n = require('../deps/natives'),
    utils = require('./utils');

var rrequire = /require\s*\(\s*(?:'|")(\S*)(?:'|")\s*\)/gi;

/**
 * Parse module id string from require call in js code string. 
 * @param {string} code passed code.
 * @param {boolean=} toArray convert output to array optional.
 * @return {Object|Array} paths returns hash or array with files.
 * @export
 */
exports.parse = function(code, toArray) {
    var paths = {},
        path,
        pathsArr;
    
    code.replace(rrequire, function(match, search) {
        // use hash to avoid dublicates
        paths[search] = true;
    });    
    
    if (toArray) {
        pathsArr = [];
        for (path in paths) {
            pathsArr.push(path);
        }
        paths = pathsArr;
    }

    return paths;
};

/**
 * Find all js files, which depend on each other.
 * @param {string} path path to the bootstrap file.
 * @param {Array} paths array of lookup paths like require.paths.
 * @return {Array} deps paths.
 * @export
 */
exports.find = function(path, paths) {
    var hash = {},
        deps = [],
        p;
    
    function read(path) {
        if (hash[path]) {
            return;
        }    

        if (!n.fs.statSync(path).isFile()) {
            throw new Error('is not a file: ' + path);    
        }
        
        hash[path] = true;
        
        var deps = exports.parse(n.fs.readFileSync(path, 'utf-8')),
            dir = n.path.dirname(path),
            id, _path, i;

        for (id in deps) {
            // like require('fs'), then look for dir path in paths
            if (id.substr(0, 1) !== '.' && paths instanceof Array) {
                for (i = 0; i < paths.length; ++i) {
                    _path = n.path.join(paths[i], id + '.js');
                    try {
                        n.fs.statSync(_path);
                        path = _path;
                        break;
                    } catch(e) {}           
                }
            } else {
                path = n.path.join(dir, id + '.js');
            }
            
            read(path);
        }
    }

    read(path);
    
    // convert it to array
    for (p in hash) {
        deps.push(p);    
    }
        
    return deps;
};