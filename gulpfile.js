const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const jslint = require('gulp-jslint');
const webpack = require('webpack-stream');
const mocha = require('gulp-mocha');
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
gulp.task('watch', ['browserSync', 'styles', 'babel', 'jslint', 'webpack', 'test'], function(){
gulp.watch('./client/Templates/*.scss', ['styles']);
gulp.watch('./client/Scripts/*.js', ['babel', 'webpack']); 
})
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'client'
    },
  })
})
gulp.task('babel', () => {
    return gulp.src('./client/Scripts/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./client/dist/js'));
});
gulp.task('jslint', function () {
    return gulp.src(['./client/Scripts/*.js'])
            .pipe(jslint({ /* this object represents the JSLint directives being passed down */ }))
            .pipe(jslint.reporter( 'default' ));
});
gulp.task('webpack', function() {
  return gulp.src('./client/Scripts/*.js')
    .pipe(webpack({
      // entry: {
      //   app: 'src/app.js',
      //   test: 'test/test.js',
      // },
      output: {
        filename: 'bundle.js',
      },
    }))
    .pipe(gulp.dest('./client/dist/'));
});
gulp.task('test', () => 
    gulp.src('./test', {read: true})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha())
        .pipe(mocha({reporter: 'mocha-istanbul'}))
);