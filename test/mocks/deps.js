var join = require('path').join,
    filename = join(__dirname, '..', '..', 'lib', 'utils.js');

require.cache[filename] = {
    id: './utils',
    exports: {},
    loaded: true,
    filename: filename
};
