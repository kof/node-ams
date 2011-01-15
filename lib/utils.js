var undefined,
    fs = require('fs'),
    join = require('path').join;

/**
 * Sync files search.
 * @param {String} root root directory.
 * @param {Object} regexp optional regexp to filter files.
 * @param {Boolean} rec optional recursively.
 * return {Array} files list of files with abs paths.
 */
exports.find = function find(root, regexp, rec) {
    if (typeof regexp === 'boolean') {
        rec = regexp;
        regexp = undefined;
    }
    
    var files = []; 
    
    fs.readdirSync(root).forEach(function(file) {
        var path = join(root, file);
        if (!regexp || regexp.test(path)) {
            files.push(path);
        }
        if (rec && fs.statSync(path).isDirectory()) {
            files = files.concat(find(path, regexp, rec));
        }       
    });
    
    return files;    
};
