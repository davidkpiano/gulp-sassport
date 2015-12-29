import gulpSass from 'gulp-sass';
import sassport from 'sassport';

let sassportModule;

function gulpSassport(modules = [], options = {}, sassportOptions = {}) {
  sassportModule = sassport(modules, sassportOptions);

  sassportModule._beforeRender(options);

  let gulpSassport = gulpSass(sassportModule.options);

  gulpSassport.assets = function(localPath, remotePath = null) {
    sassportModule.assets(localPath, remotePath);

    return gulpSassport;
  }

  gulpSassport.functions = function(functionMap) {
    sassportModule.functions(functionMap);

    return gulpSassport;
  }

  gulpSassport.loaders = function(loaderMap) {
    sassportModule.loaders(loaderMap);

    return gulpSassport;
  }

  gulpSassport.exports = function(exportMap) {
    sassportModule.exports(exportMap);

    return gulpSassport;
  }

  gulpSassport.variables = function(variableMap) {
    sassportModule.variables(variableMap);

    return gulpSassport;
  }

  return gulpSassport;
}


module.exports = gulpSassport;
