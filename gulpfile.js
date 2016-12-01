var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('default', function() {
  // place code for your default task here
});
gulp.task('styles', function() {
    gulp.src('./client/Templates/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'));
});