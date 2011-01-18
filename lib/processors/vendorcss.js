/*
 * CSS processor.
 *
 * Add vendor specific css for such stuff like box-shadow.
 *
 * Properties list found on
 * http://qooxdoo.org/documentation/general/webkit_css_styles
 * 
 * Used CSS parser:
 * https://github.com/NV/JSCSSP
 */

var jscssp = require('../../deps/JSCSSP/cssParser');


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
    'user-drag': true,
    'user-modify': true,
    'user-select': true
};

/**
 * @see props
 */
exports.properties = props;


/**
 * Regexp pattern which validates if this processor
 * can accept any file
 * @type {RegExp}
 * @export
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
    var parser = new jscssp.CSSParser(),
        pdata = parser.parse(data);

    pdata.cssRules.forEach(function(rule) {
        rule.declarations.forEach(function(decl) {
            var newDecl, i;
            if (props[decl.property]) {
                for (i = 0; i < pref.length; ++i) {
                    newDecl = parser.parse(
                        'a {' +
                            pref[i] + decl.property + ':' + decl.valueText +
                         '}'
                    );
                    rule.declarations.push(newDecl.cssRules[0].declarations[0]);
                }
            }
        });
    });

    data = pdata.cssText();

    return data;
};
