/*
 * Find dependencies using static parsing.
 * All dynamic require arguments can't be tracked.
 */

var utils = require('./utils'),
    fs = require('fs');

var r = /require\s*\(\s*(?:'|")(\S*)(?:'|")\s*\)/gi;

exports.parse = function(str) {
    var hash = {},
        paths = [],
        path;
    
    str.replace(r, function(match, search) {
        // use hash to avoid dublicates
        hash[search] = true;
    });    
    
    // convert it to array
    for (path in hash) {
        paths.push(path);    
    }
    
    return paths;
};

/**
 * Find js files
 * @param {Object} root
 * @param {Object} rec
 */
exports.run = function(root, rec) {
    var deps = {};
    
    utils.find(root, /\.js$/, rec).forEach(function(path) {
        deps[path] = exports.parse(fs.readfileSync(path, 'utf-8'));
    });
};