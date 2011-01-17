var fs = require('fs'),
    join = require('path').join;

/**
 * Sync files search.
 * @param {String} root root directory.
 * @param {Object} filter optional regexp to filter files.
 * @param {Boolean} rec optional recursively.
 * @return {Array} files list of files with abs paths.
 */
exports.find = function find(root, filter, rec) {
    if (typeof filter === 'boolean') {
        rec = filter;
        filter = undefined;
    }

    var files = [];

    fs.readdirSync(root).forEach(function(file) {
        var path = join(root, file);
        if (!filter || filter.test(path)) {
            files.push(path);
        }
        if (rec && fs.statSync(path).isDirectory()) {
            files = files.concat(find(path, filter, rec));
        }
    });

    return files;
};
