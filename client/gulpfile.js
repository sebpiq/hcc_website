var source = require('vinyl-source-stream')
  , gulp = require('gulp')
  , rename = require('gulp-rename')
  , browserify = require('browserify')
  , babelify = require('babelify')
  , notify = require('gulp-notify')
  , runSequence = require('run-sequence')

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args)
  this.emit('end') // Keep gulp from hanging on this task
}

gulp.task('bundle', function() {
  return browserify({
    entries: ['./src/main.js'],
    debug: true,
    transform: [babelify.configure({ presets: ['react'] })],
    cache: {}, 
    packageCache: {}, 
    fullPaths: true // Requirement of watchify
  })
  .bundle().on('error', handleErrors)
  .pipe(source('./src/main.js'))
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('./public/js/'))
})

// run only once
gulp.task('build', function(done) {
  return runSequence('bundle', done)
})


// run build first and then watch for changes
gulp.task('default', ['build'], function(done) {

  var watcher = gulp.watch(['*.js', './src/**/*.js'], ['bundle'])
  watcher.on('change', function(event) {
    console.log('File '+event.path+' was '+event.type+', running tasks...')
  })

  return runSequence('bundle', done)
})
