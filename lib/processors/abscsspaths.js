/*
 * CSS processor.
 * Replace relative urls in css with absolute one.
 */


exports.pattern = /\.css$/;



/**
 * Make relative pathes in css absolute.
 * @param {String} path path to file.
 * @param {String} data module body.
 * @param {Object} o current configuration.
 * @return {String} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    
    return data;
};