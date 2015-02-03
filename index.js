var fecs = require('fecs');
var glob = require("glob");
var gulp = require("gulp");
var through = require('through2');

gulp.src('node_modules/fecs/cli/check.js')
    .pipe(remove())
    .pipe(gulp.dest('node_modules/fecs/cli/'));


exports.check = function (path) {
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


function remove() {
  // Creating a stream through which each file will pass
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
          // return empty file
            cb(null, file);
        }
        if (file.isBuffer()) {
            var newString = file.contents.toString().replace("process.exit(success ? 0 : 1);", "");
            file.contents = new Buffer(newString);
        }
        if (file.isStream()) {
            file.contents = file.contents.pipe(prefixStream(prefixText));
        }

        cb(null, file);

    });
};
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


