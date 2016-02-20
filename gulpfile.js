var source = require('vinyl-source-stream')
  , gulp = require('gulp')
  , rename = require('gulp-rename')
  , less = require('gulp-less')
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
 
gulp.task('less', function () {
  return gulp.src('./styles/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
})

gulp.task('bundle', function() {
  return browserify({
    entries: ['./src/main.js'],
    debug: false,
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
  return runSequence('bundle', 'less', done)
})

// run build first and then watch for changes
gulp.task('default', ['build'], function(done) {

  var jsWatcher = gulp.watch(['*.js', './src/**/*.js'], ['bundle'])
  jsWatcher.on('change', function(event) {
    console.log('File '+event.path+' was '+event.type+', running tasks...')
  })

  var lessWatcher = gulp.watch(['*.less', './styles/**/*.less'], ['less'])
  lessWatcher.on('change', function(event) {
    console.log('File '+event.path+' was '+event.type+', running tasks...')
  })

  return runSequence('build', done)
})