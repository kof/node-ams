/*
 * css processor.
 *
 * Inline css using @import
 */

var n = require('natives');

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.css$/
};

// @import "../style.css" all print;
// @import url ( "../style.css" ) all print;
var rimport = /@import +[url *\(]*["|']([^"|']+).*;/gim;

// remote url
var rremote = /^\w+:\/\//;

/**
 * Read file, resolve the url.
 * @param {string} url parsed from @import.
 * @param {string} path to the current css.
 * @param {string} root abs. path to the current css.
 * @return {string} css file data.
 */
function getData(url, path, root) {
    // its remote url
    if (rremote.test(url)) {
        return false;
    }
    
    // its relative
    if (url.substr(0, 1) === '/') {
        url = n.path.join(n.path.dirname(path), url);    
    }
    
    return n.fs.readFileSync(url, 'utf8');
}

/**
 * Find all @import declarations and replace them with inline css.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @this Build
 * @return {string} css data.
 * @export
 */
exports.run = function run(path, data, o) {
    var self = this;

    return data.replace(rimport, function(search, url) {
        // its remote url
        if (rremote.test(url)) {
            return search;
        }
        
        var cssPath, data;
        
        // its absolute, find the file using lookup paths
        if (url.substr(0, 1) !== '.') {
            self.paths.some(function(lookupPath) {
                var path = n.path.join(lookupPath, url);
                try {
                    n.fs.statSync(path);
                    cssPath = path;
                    return true;    
                } catch(e) {}
            });
        }

        if (!cssPath) {
            cssPath = n.path.join(n.path.dirname(path), url);    
        }

        data = n.fs.readFileSync(cssPath, 'utf8');
        
        // now parse this css data too
        data = run.call(self, cssPath, data, o);
        
        // remove this css file from this.data to avoid double load
        if (self.data[cssPath]) {
            delete self.data[cssPath];
        }
        
        return data;
    });
};
