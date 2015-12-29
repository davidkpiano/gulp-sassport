'use strict';

var _gulpSass = require('gulp-sass');

var _gulpSass2 = _interopRequireDefault(_gulpSass);

var _sassport = require('sassport');

var _sassport2 = _interopRequireDefault(_sassport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sassportModule = undefined;

function gulpSassport() {
  var modules = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var sassportOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  sassportModule = (0, _sassport2.default)(modules, sassportOptions);

  sassportModule._beforeRender(options);

  var gulpSassport = (0, _gulpSass2.default)(sassportModule.options);

  gulpSassport.assets = function (localPath) {
    var remotePath = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    sassportModule.assets(localPath, remotePath);

    return gulpSassport;
  };

  gulpSassport.functions = function (functionMap) {
    sassportModule.functions(functionMap);

    return gulpSassport;
  };

  gulpSassport.loaders = function (loaderMap) {
    sassportModule.loaders(loaderMap);

    return gulpSassport;
  };

  gulpSassport.exports = function (exportMap) {
    sassportModule.exports(exportMap);

    return gulpSassport;
  };

  gulpSassport.variables = function (variableMap) {
    sassportModule.variables(variableMap);

    return gulpSassport;
  };

  return gulpSassport;
}

module.exports = gulpSassport;