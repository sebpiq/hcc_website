var path = require('path')
  , gulp = require('gulp')
  , gutil = require('gulp-util')
  , browserify = require('browserify')
  , runSequence = require('run-sequence')
  , source = require('vinyl-source-stream')


gulp.task('lib.browserify', function() {
  return browserify({ entries: './index.js' })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('webpd-latest.js'))
    .pipe(gulp.dest('./build'))
})