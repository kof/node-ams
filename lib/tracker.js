/*
 * Track dependencies and send them to the tracker-server
 */

(function(global){
    
var exports = {},
    deps = {},
    require = global.require;

/**
 * Get tracked dependencies
 * @export
 */
exports.deps = function() {
    return deps;
};

/**
 * Wrap require
 */
global.require = function() {
    // do tracking
    
    
    require.apply(this, arguments);    
};

// expose
global.ams = exports;            
    
}(this));
