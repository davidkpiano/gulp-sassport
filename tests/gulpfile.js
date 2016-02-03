var gulp = require('gulp');
var gulpSassport = require('../dist/index.js');
var sassport = require('sassport');

var fooModule = sassport.module('foo')
  .functions({
    'test($foo)': sassport.wrap(function(foo) {
      return foo + ' world!';
    })
  });

gulp.task('default', function() {
  gulp.src('./main.scss')
    .pipe(gulpSassport([fooModule], {
      outputStyle: 'compressed',
      includePaths: ['scss']
    })
      .assets('assets', 'http://remote.foo'))
      .functions({'foo($bar)': sassport.wrap(function(bar) { return bar + 'px' })})
    .pipe(gulp.dest('./css'));
});
