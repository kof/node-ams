/*
 * CSS processor.
 * 
 * Add vendor specific css for such stuff like box-shadow.
 */

exports.pattern = /\.css$/;

/**
 * Add vendor specific declarations for some css 3 properties.
 * @param {String} path path to file.
 * @param {String} data module body.
 * @param {Object} o current configuration.
 * @return {String} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    
    return data;
}; 