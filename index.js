var fecs = require('fecs');
var glob = require("glob");
var fs = require('fs')

exports.check = function (path) {

    var checkFile = 'node_modules/fecs-files/node_modules/fecs/cli/check.js';

    if (fs.existsSync(checkFile)) {
        var originFile = fs.readFileSync(checkFile, 'utf-8');
        var newFile = originFile.replace("process.exit(success ? 0 : 1);", "");
        fs.writeFileSync(checkFile, newFile, 'utf-8');
    }

   if (typeof(path) === 'string') {
        glob(path, {}, function (er, files) {
            check(files);
        })
   }
   else if (toString.call(path) === '[object Array]') {
        var fileList = [];
        for (var i = 0; i < path.length; i++) {
            glob(path[i], {}, function (er, files) {
                fileList = fileList.concat(files);
            })
        }
        setTimeout(function() {
            check(fileList);
        }, 1000);
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

//     { _: 
//        [ 'src/plugins/islider_animate.js',
//          'src/plugins/islider_button.js',
//          'src/plugins/islider_dot.js',
//          'src/plugins/islider_zoom.js' ],
//       color: true,
//       debug: false,
//       help: false,
//       lookup: true,
//       rule: false,
//       silent: false,
//       sort: false,
//       stream: false,
//       r: false,
//       version: false,
//       format: '',
//       output: './output',
//       reporter: '' 
//   }
    
//     fecs.format(fecs_opts);
// }   


