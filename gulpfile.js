var gulp = require('gulp')
  , less = require('gulp-less')
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

// run build first and then watch for changes
gulp.task('default', ['less'], function(done) {

  var lessWatcher = gulp.watch(['*.less', './styles/**/*.less'], ['less'])
  lessWatcher.on('change', function(event) {
    console.log('File '+event.path+' was '+event.type+', running tasks...')
  })

  return runSequence('less', done)
})