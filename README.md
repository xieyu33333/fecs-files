##fecs-files
fecs是百度的前端代码规范检查工具，目前只提供了命令行版本，fecs-files可以在gulpfile或者其他node.js环境中使用fecs的代码检查。  

###install
    npm install fecs-files

###usage
同时支持路径字符串和数组的形式。
    
    var fecs = require('fecs-files');
    fecs.check('*.js');
    fecs.check(['*.js', 'test/*.js']);