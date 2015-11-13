var fs = require('fs');
var browserify = require('browserify');
var insertGlobals = require('insert-module-globals');

browserify('./js/app.js', {
    builtins: false,
    commondir: false,
    insertGlobalVars: {
        __filename: insertGlobals.vars.__filename,
        __dirname: insertGlobals.vars.__dirname,
        process: function() {
            return;
        },
    },
    browserField: false,
})
    .bundle()
    .pipe(fs.createWriteStream('./js/bundle.js'));
