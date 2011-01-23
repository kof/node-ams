var n = require('../deps/natives');

/**
 * Sync files search.
 * @param {string} root root directory.
 * @param {Object=} pattern optional regexp to filter files.
 * @param {boolean=} rec optional recursively.
 * @return {Array} files list of files with abs paths.
 * @export
 */
exports.findSync = function find(root, pattern, rec) {
    if (typeof pattern === 'boolean') {
        rec = pattern;
        pattern = undefined;
    }

    var files = [];

    n.fs.readdirSync(root).forEach(function(file) {
        var path = n.path.join(root, file);

        if (!pattern || pattern.test(path)) {
            files.push(path);
        }

        if (rec && n.fs.statSync(path).isDirectory()) {
            files = files.concat(find(path, pattern, rec));
        }
    });

    return files;
};

/**
 * Create a directory, recursive if needed
 * @param {string} path absolute path to the dir.
 * @param {string|number=} mode default to 511 in dec is 0777 in octal.
 * @export
 */
exports.mkdirSync = function(path, mode) {
   var curPath = '';

   path.split('/').forEach(function(name) {
       if (!name) {
           return;
       }

       curPath += '/' + name;

       var stat;

       try {
           stat = n.fs.statSync(curPath);
       } catch (e) {
           // nothing there, make a dir
           n.fs.mkdirSync(curPath, mode || 511);
       }

       if (stat && stat.isFile()) {
           throw new Error('there is a file in the way: ' + curPath);
       }
   });
};

/**
 * Copy files and directories.
 * @param {string} src absolute path to the src dir.
 * @param {string} target absolute path to the target dir.
 * @param {RegExp=} pattern optional regexp to filter dirs or files.
 * @return {Object} src and target files.
 * @export
 */
exports.copySync = function(src, target, pattern) {
    var srcPaths = exports.findSync(src, pattern, true),
        targetPaths = [];

    function copy(i) {
        if (!srcPaths[i]) {
            return;
        }

        var srcPath = srcPaths[i],
            relPath = srcPath.replace(src, ''),
            targetPath = targetPaths[i] = n.path.join(target, relPath),
            rs, ws;

        if (n.fs.statSync(srcPath).isDirectory()) {
            exports.mkdirSync(targetPath);
        } else {
            exports.mkdirSync(n.path.dirname(targetPath));
            n.fs.writeFileSync(
                targetPath,
                n.fs.readFileSync(srcPath)
            );
        }

        copy(++i);
    }
    
    copy(0);
    
    return {
        src: srcPaths,
        target: targetPaths    
    };
};
