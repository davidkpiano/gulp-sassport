# gulp-sassport

Gulp plugin for the [Sassport](https://github.com/davidkpiano/sassport) tool. Very much based on [gulp-sass](https://github.com/dlmanning/gulp-sass/).

## Installation
`npm install gulp-sassport --save-dev`

## Usage

```js
var sassport = require('gulp-sassport');
var fooModule = require('path/to/some-sassport-module.js');

gulp.task('styles', function() {
  gulp.src('./path/to/stylesheet.scss')
    .pipe(sassport([ fooModule ], {
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./path/to/css'));
});
```

## API
_Coming soon!_
