var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
gulp.task('default', function() {
  // place code for your default task here
});
gulp.task('styles', function() {
    gulp.src('./client/Templates/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client/dist/css/'))
        .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('watch', ['browserSync', 'styles'], function(){
gulp.watch('./client/Templates/*.scss', ['styles']); 
})
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'client'
    },
  })
})