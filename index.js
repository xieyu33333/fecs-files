var fecs = require('fecs');
var glob = require("glob")

exports.check = function (path) {
   if (typeof(path) === 'string') {
        glob(path, {}, function (er, files) {
            check(files);
        })
   }
   else if (toString.call(path) === '[object Array]') {
        var files = []
        for (var i = 0; i < path.length; i++) {
            glob(path[i], {}, function (er, files) {
                files = files.concat(files);
            })
        }
        setTimeout(function() {
            check(files);
        }, 200);
   }  
};

function check(files) {
    var fecs_opts = {
        _: files,
        color: true,
        debug: false,
        help: false,
        lookup: true,
        rule: false,
        silent: false,
        sort: false,
        stream: false,
        version: false,
        reporter: 'baidu',
        format: '',
        output: './output',
    }
    fecs.check(fecs_opts);
}

// exports.format = function (opts) {
//     var opts = opts || {};
//     var output = opts.output || './output';

//     var fecs_opts = { 
//         _: dir(path),
//         color: true,
//         debug: false,
//         help: false,
//         lookup: true,
//         rule: false,
//         silent: false,
//         sort: false,
//         stream: false,
//         version: false,
//         reporter: 'baidu',
//         format: '',
//         output: './output',
//     }
    
//     fecs.check(fecs_opts);
// }   


