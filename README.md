# gulp-sassport

Gulp plugin for the [Sassport](https://github.com/davidkpiano/sassport) tool. It is a light wrapper for [gulp-sass](https://github.com/dlmanning/gulp-sass/).

## Installation
`npm install gulp-sassport --save-dev`

## Basic Usage

```js
var gulp = require('gulp');
var sassport = require('gulp-sassport');

// Use any Sassport modules
var fooModule = require('path/to/any-sassport-module.js');

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sassport([ fooModule ], {
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
```

## Options
Gulp-Sassport can be called with three arguments (all optional):

1. An array of Sassport modules
2. [Node-Sass options](https://github.com/sass/node-sass#options)
3. Sassport options

```js
gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sassport(
      [ require('sassport-reference') ], // Sassport modules
      { outputStyle: 'compressed' }      // Sass options
    )
    .pipe(gulp.dest('./css'));
});
```

## API
Gulp-Sassport is fully extensible, as if it were a Sassport module, with these methods:

- `sassport(...).assets(localPath, remotePath)`
- `sassport(...).functions(functionMap)`
- `sassport(...).loaders(loaderMap)`
- `sassport(...).exports(exportMap)`
- `sassport(...).variables(variableMap)`

See the [Sassport documentation](https://github.com/davidkpiano/sassport) for more info.
