/*
 * CSS processor.
 *
 * Replace linked images in css with base64 encoded inlined image data.
 *
 */

var n = require('natives'),
    $ = require('sharedjs');

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.css$/,
    maxSize: 32768 // in bytes
};


var rurl = /url *\( *(?:"|')*([^"')]+)(?:"|')* *\)/gi, // match url(xxx)
    rremote = /^\w+:\/\//; // remote url


/**
 * Get data string ready to inline it.
 * @param {string} path path to the file.
 * @param {Object} o options.
 * @return {string|boolean} returns false if file size limit reached.
 */
function getData(path, o) {
    var stat, data;

    stat = n.fs.statSync(path);

    // some browser has inlined data size limits
    if (stat.size > o.maxSize) {
        return false;
    }

    data = 'data:image/';
    data += n.path.extname(path).substr(1) + ';';
    data += 'base64,';
    data += n.fs.readFileSync(path).toString('base64');
    return data;
}


/**
 * Replace external background images with base64 encoded inlined.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} opts current configuration.
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    var root = this.root,
        self = this;
    
    return data.replace(rurl, function(search, url) {
        var data, imagePath;

        if (rremote.test(url)) {
            data = url;
        // its relative url
        } else {
            imagePath = n.path.join(root, url);
            data = getData(imagePath, o);
            
            if (data) {
                if (self.data[imagePath]) {
                    delete self.data[imagePath];
                }                    
            } else {
                data = url;
            }
        }

        return 'url("' + data + '")';
    });
};
