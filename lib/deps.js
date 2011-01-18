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
 * @param {string} main path to the bootstrap file.
 * @return {Array} deps paths.
 * @export
 */
exports.find = function(main) {
    var hash = {},
        deps = [],
        path;
    
    function read(path) {
        if (hash[path]) {
            return;
        }    

        if (!n.fs.statSync(path).isFile()) {
            throw new Error("is not a file: " + path);    
        }
        
        hash[path] = true;
        
        var curDir = n.path.dirname(path),
            deps = exports.parse(n.fs.readFileSync(path, 'utf-8')),
            id;

        for (id in deps) {
            read(n.path.join(curDir, id + '.js'));
        }
    }

    read(main);
    
    // convert it to array
    for (path in hash) {
        deps.push(path);    
    }
        
    return deps;
};