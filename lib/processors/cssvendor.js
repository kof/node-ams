/*
 * CSS processor.
 *
 * Add vendor specific css for such stuff like box-shadow.
 *
 * Properties list found on
 * http://qooxdoo.org/documentation/general/webkit_css_styles
 */

/**
 * Array of vendor prefixes
 * @type {Array.<string>}
 * @export
 */
var pref = ['-moz-', '-webkit-', '-o-', '-ms-'];

/**
 * @see pref
 */
exports.prefixes = pref;

/**
 * Hash of supported vendor prefixed css 3 properties
 * @enum {boolean}
 * @export
 */
var props = {
    'appearance': true,
    'background-clip': true,
    'background-composite': true,
    'background-origin': true,
    'background-size': true,
    'binding': true,
    'border-bottom-left-radius': true,
    'border-bottom-right-radius': true,
    'border-fit': true,
    'border-horizontal-spacing': true,
    'border-image': true,
    'border-radius': true,
    'border-top-left-radius': true,
    'border-top-right-radius': true,
    'border-vertical-spacing': true,
    'box-align': true,
    'box-direction': true,
    'box-flex': true,
    'box-flex-group': true,
    'box-lines': true,
    'box-ordinal-group': true,
    'box-orient': true,
    'box-pack': true,
    'box-shadow': true,
    'box-sizing': true,
    'column-break-after': true,
    'column-break-before': true,
    'column-break-inside': true,
    'column-count': true,
    'column-gap': true,
    'column-rule': true,
    'column-rule-color': true,
    'column-rule-style': true,
    'column-rule-width': true,
    'column-width': true,
    'columns': true,
    'dashboard-region': true,
    'font-size-delta': true,
    'font-smoothing': true,
    'highlight': true,
    'line-break': true,
    'line-clamp': true,
    'margin-bottom-collapse': true,
    'margin-collapse': true,
    'margin-start': true,
    'margin-top-collapse': true,
    'marquee': true,
    'marquee-direction': true,
    'marquee-increment': true,
    'marquee-repetition': true,
    'marquee-speed': true,
    'marquee-style': true,
    'match-nearest-mail-blockquote-color': true,
    'nbsp-mode': true,
    'padding-start': true,
    'rtl-ordering': true,
    'text-decorations-in-effect': true,
    'text-fill-color': true,
    'text-security': true,
    'text-size-adjust': true,
    'text-stroke': true,
    'text-stroke-color': true,
    'text-stroke-width': true,
    'transform': true,
    'user-drag': true,
    'user-modify': true,
    'user-select': true
};

/**
 * @see props
 */
exports.properties = props;

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.css$/
};

var r1 = /(.*\{\s*)([^}]+)(\})/gm, // declarations match
    r2 = /([^:\s]+) *: *([^;}]+) *;*/gi; // decl:value match

/**
 * Add vendor specific declarations for some css 3 properties.
 * @param {string} path path to file.
 * @param {string} data content of the file.
 * @param {Object} o current configuration.
 * @this Build
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {

    function replaceDecl(search, prop, val) {
        var i, decl = prop + ': ' + val + ';';

        if (props[prop]) {
            for (i = 0; i < pref.length; ++i) {
                decl += pref[i] + prop + ': ' + val + ';';
            }
        }

        return decl;
    }

    return data.replace(r1, function(search, intro, decls, outro) {
        decls = decls.replace(r2, replaceDecl);
        return intro + decls + outro;
    });
};
