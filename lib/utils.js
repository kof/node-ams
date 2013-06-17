var n = require('natives'),
    $ = require('sharedjs');

/**
 * Sync files search.
 * @param {string} root root directory.
 * @param {RegExp=} pattern optional regexp to filter files.
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

        if (n.fs.statSync(path).isDirectory() && rec) {
            files = files.concat(find(path, pattern, rec));
        }

        if (!pattern || pattern.test(path)) {
            files.push(path);
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
   var curesolvedPath = '';

   path.split('/').forEach(function(name) {
       if (!name) {
           return;
       }

       curesolvedPath += '/' + name;

       var stat;

       try {
           stat = n.fs.statSync(curesolvedPath);
       } catch (e) {
           // nothing there, make a dir
           n.fs.mkdirSync(curesolvedPath, mode || 511);
       }

       if (stat && stat.isFile()) {
           throw new Error('there is a file in the way: ' + curesolvedPath);
       }
   });
};

/**
 * Remove files and directories.
 * @param {string} root path to the dir where to search.
 * @param {RegExp=} pattern regexp to filter files.
 */
exports.rmSync = function rmSync(root, pattern) {
    try {
        n.fs.statSync(root);
    } catch (e) {
        // directory doesn't exist
        return;
    }

    n.fs.readdirSync(root).forEach(function(filename) {
        var path = n.path.join(root, filename);
        if (pattern && !pattern.test(path)) {
            return;
        }

        if (n.fs.statSync(path).isFile()) {
            n.fs.unlinkSync(path);
        } else {
            rmSync(path);
            n.fs.rmdirSync(path);
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
            targetPath = targetPaths[i] = n.path.join(target, relPath);

        if (n.fs.statSync(srcPath).isDirectory()) {
            exports.mkdirSync(targetPath);
        } else {
            exports.mkdirSync(n.path.dirname(targetPath));
            n.fs.writeFileSync(
                targetPath,
                n.fs.readFileSync(srcPath)
            );
        }

        ++i;
        copy(i);
    }

    copy(0);

    return {
        src: srcPaths,
        target: targetPaths
    };
};

/**
 * Resolve a path like browser would resolve it + consider require like `paths`.
 * TODO rewrite this mess!
 *
 * @param {string} path to resolve.
 * @param {string} hostFilePath path to the file, which is trying to resolve.
 * @param {string} root path to the root dir.
 * @param {Array=} lookup paths where we should look for the file
 *     if the path doesn't start with "." or "/".
 * @return {string|boolean} absolute path to file or false if not resolved.
 */
exports.resolvePath = function(path, hostFilePath, root, lookup) {
    var resolvedPath,
        firstChar;

    // its remote url
    if (/^\w+:\/\//.test(path)) {
        return false;
    }

    // remove query from path
    path = path.replace(/(.*)[\?|#].*/, '$1');

    firstChar = path.substr(0, 1);
    // path is absolute, find it in the root
    // /path/to/file.css
    if (firstChar === '/') {
        // check if the path is already the correct one
        try {
            if (n.fs.statSync(path).isFile()) {
                resolvedPath = path;
            }
        } catch(e) {}

        if (!resolvedPath) {
            resolvedPath = n.path.join(root, path);
        }
    // path is relative, try to find it in the current dir
    // ./path/to/file.css, ../path/to/file.css
    } else if (firstChar === '.') {
        resolvedPath = n.path.join(n.path.dirname(hostFilePath), path);
    // use lookup
    } else if (Array.isArray(lookup)) {
        lookup.some(function(lookupPath) {
            var curResolvedPath = n.path.join(lookupPath, path);

            try {
                if (n.fs.statSync(curResolvedPath).isFile()) {
                    resolvedPath = curResolvedPath;
                    return true;
                }
            } catch (e) {}
        });
    }

    try {
        if (!n.fs.statSync(resolvedPath).isFile()) {
            throw new Error('is not a file')
        }
    } catch(e) {
        // add '.js' extention and try again
        if (!/\.js$/.test(path)) {
            return exports.resolvePath(path + '.js', hostFilePath, root, lookup);
        }

        throw new Error(
            'resolved path is wrong.\n' +
            'resolved path: ' + resolvedPath + '\n' +
            'path: ' + path + '\n' +
            'file: ' + hostFilePath + '\n'
        );
    }

    return resolvedPath;
};

/**
 * Merge 2 urls without to overwrite anything, but concatenate.
 * @param {string} url 1.
 * @param {string} url 2.
 * @return {string} new url
 */
function mergeUrls(url1, url2) {
    var obj1 = n.url.parse(url1, true),
        obj2 = n.url.parse(url2, true),
        obj = {};

    $.each(obj1, function(val, key) {
        if (val) {
            obj[key] = val;
        }
    });

    $.each(obj2, function(val, key) {
        if (val) {
            obj[key] = val;
        }
    });

    if (obj1.pathname.substr(-1) == '/' && obj2.pathname[0] == '/') {
        obj1.pathname = obj1.pathname.substr(0, obj1.pathname.length - 1);
    }

    obj.pathname = obj1.pathname + obj2.pathname;
    delete obj.path;
    delete obj.host;

    return n.url.format(obj);
}
/**
 * Resolve url considering a root dir, paths array and optionally host.
 *
 * Don't add host to unresolvable urls, becuase you can end up with doubled host
 * in case where url is a variable passed to the template and containing baseUrl
 * already.
 *
 * <img src="${url}"> -> build -> <img src="http://nodejs.org/${url}">
 * -> <img src="http://nodejs.org/http://nodejs.org/${url}">
 *
 * TODO rewrite this mess!
 *
 * @param {string} url to resolve.
 * @param {string} path to the file within the url has been found.
 * @param {string} root directory relative to which the url pathname shold be resolved.
 * @param {Array} node like lookup paths to resolve the path.
 * @param {Object=} `host` which have to be added to the path, `verbose` - log errors.
 * @return {String} resolved url.
 */
exports.resolveUrl = function(url, path, root, paths, o) {
    var pathname;

    if (/^\w+:\/\//.test(url)) {
        return url;
    }

    paths = paths.slice(0);

    // add dirname of the file to lookup array
    // to look in currend dir first
    // f.e. url("a.png");
    // otherwise the file will not be found like its expected in browser env.
    paths.unshift(n.path.dirname(path));

    try {
        pathname = exports.resolvePath(url, path, root, paths);
    } catch(err) {
        if (o.verbose) {
            console.error(err.message);
        }
    }

    if (typeof pathname == 'string') {

        // make the url relative to root
        paths.slice(1).forEach(function(path) {
            pathname = pathname.replace(path, '');
        });

        // add query back
        if (url.indexOf('?') >= 0) {
            pathname += url.substr(url.indexOf('?'));
        }

        // add hash back
        if (url.indexOf('#') >= 0) {
            pathname += url.substr(url.indexOf('#'));
        }

        // add host
        if (o.host) {
            url = mergeUrls(o.host, pathname);
        } else {
            url = pathname;
        }
    } else {
        pathname = url;
    }

    return url;
};
