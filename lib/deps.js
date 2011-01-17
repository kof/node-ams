/*
 * Find dependencies using static parsing.
 * All dynamic require arguments can't be tracked.
 */

var n = require('../deps/natives'),
    utils = require('./utils');

var rrequire = /require\s*\(\s*(?:'|")(\S*)(?:'|")\s*\)/gi;

function parse(str) {
    var paths = {};
    
    str.replace(rrequire, function(match, search) {
        // use hash to avoid dublicates
        paths[search] = true;
    });    

    return paths;
}

exports._parse = parse;

/**
 * Find all js files, which depend on each other.
 * @param {String} bootstrap
 * @return {Array} deps
 */
exports.find = function(bootstrap) {
    var hash = {},
        deps = [],
        path;
    
    function read(path) {
        if (hash[path]) {
            return;
        }    

        if (!n.fs.statSync(path).isFile()) {
            throw new Error("file doesn't exist: " + path);    
        }
        
        hash[path] = true;
        
        var curDir = n.path.dirname(path),
            deps = parse(n.fs.readFileSync(path, 'utf-8')),
            id;
        
        for (id in deps) {
            read(n.path.join(curDir, path + '.js'));
        }
    }
    
    read(bootstrap);
    
    // convert it to array
    for (path in hash) {
        deps.push(path);    
    }
        
    return deps;
};