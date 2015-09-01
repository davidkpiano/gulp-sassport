import gutil from 'gulp-util';
import through from 'through2';
import sassport from 'sassport';
import applySourceMap from 'vinyl-sourcemaps-apply';
import path from 'path';

const gulpSassport = function(modules = [], options = {}, sync = false) {
  return through.obj((file, enc, callback) => {
    if (file.isNull() || !file.contents.length) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(gulpError('Streaming not supported!'));
    }

    if (path.basename(file.path).indexOf('_') === 0) {
      return callback();
    }

    options.data = file.contents.toString();

    // Ensure `indentedSyntax` is true if a `.sass` file
    options.indentedSyntax = (path.extname(file.path) === '.sass');

    // Ensure file's parent directory in the include path
    options.includePaths = Array.prototype.concat
      .call([], options.includePaths || []);

    options.includePaths.unshift(path.dirname(file.path));

    // Generate Source Maps if plugin source-map present
    if (file.sourceMap) {
      options.sourceMap = file.path;
      options.omitSourceMapUrl = true;
    }

    console.log(options);

    if (sync !== true) {
      // Async Sass render
      let wrappedCallback = function(error, obj) {
        if (error) {
          return errorMessage(file, error, callback);
        }

        filePush(file, obj, callback);
      };

      sassport(modules).render(options, wrappedCallback);
    } else {
      // Sync Sass render
      try {
        console.log(options);
        result = sassport(modules).renderSync(options);

        filePush(file, result, callback);
      } catch(error) {
        return errorMessage(file, error, callback);
      }
    }
  });
}

// Handles returning the file to the stream
const filePush = function(file, sassObj, callback) {
  var sassMap;
  var sassMapFile;
  var sassFileSrc;

  // Build Source Maps!
  if (sassObj.map) {
    // Transform map into JSON
    sassMap = JSON.parse(sassObj.map.toString());
    // Grab the stdout and transform it into stdin
    sassMapFile = sassMap.file.replace('stdout', 'stdin');
    // Grab the base file name that's being worked on
    sassFileSrc = file.relative;
    // Replace the stdin with the original file name
    sassMap.sources[sassMap.sources.indexOf(sassMapFile)] = sassFileSrc;
    // Replace the map file with the original file name (but new extension)
    sassMap.file = gutil.replaceExtension(sassFileSrc, '.css');
    // Apply the map
    applySourceMap(file, sassMap);
  }

  file.contents = sassObj.css;
  file.path = gutil.replaceExtension(file.path, '.css');

  callback(null, file);
};

// Handles error message
const errorMessage = function(file, error, callback) {
  var relativePath = '';
  var filePath = error.file === 'stdin' ? file.path : error.file;
  var message = '';

  filePath = filePath ? filePath : file.path;
  relativePath = path.relative(process.cwd(), filePath);

  message += gutil.colors.underline(relativePath) + '\n';
  message += gutil.colors.gray('  ' + error.line + ':' + error.column) + '  ';
  message += error.message;

  error.messageFormatted = message;
  error.message = gutil.colors.stripColor(message);

  return callback(gulpError(error));
};

const gulpError = function(message, data) {
  return new gutil.PluginError('Sassport', message);
};

export default gulpSassport;



