/*jslint browser: true, devel: true */
/*
 * Experimental!
 *
 * Track dependencies and send them to the tracker-server.
 * This code is used in client only.
 */

(function(global) {

var undefined,
    require = global.require,
    exports = {},
    modules = {},
    deps = {},
    o;

o = exports.options = {
    path: '/update',
    verbose: true,
    factory: 'factory'
};

/**
 * Find id/path of the module within require was called
 * @param {Function} fn module factory.
 * @return {string} id module id/path.
 */
function findId(fn) {
    var id;
    if (fn.name === o.factory) {
        for (id in modules) {
            if (modules[id] === fn) {
                return id;
            }
        }
    } else {
        return findId(fn.caller);
    }
}

function send() {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('post', o.path, true);
        xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');
        xhr.send(JSON.stringify(deps));
    } catch (e) {
        //TODO
    }
}

/**
 * Get tracked dependencies
 * @export
 */
exports.deps = function() {
    return deps;
};

/**
 * Wrap require
 * @param {String} path path to file.
 */
global.require = function req(path) {
    // do tracking
    var hostId = findId(req.caller);
    if (!deps[hostId]) {
        // use object to avoid dublicates
        deps[hostId] = {};
    }
    deps[hostId][path] = true;

    // error - module was not defined
    // post now deps to server and show alert
    if (!modules[path]) {
        if (o.verbose) {
            alert('required not defined module: ' + path);
        }
        send();
    }

    return require.apply(this, arguments);
};

/**
 * Wrap require.def
 */
global.require.def = function(id, deps, factory) {
    if (typeof deps === 'function') {
        factory = deps;
        deps = undefined;
    }
    modules[id] = factory;
    return require.def.apply(this, arguments);
};

// expose
global.ams = exports;

}(this));
