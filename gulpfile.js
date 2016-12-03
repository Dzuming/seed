const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const babelRegister = require('babel-register');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');
gulp.task('build', function (callback) {
  runSequence( 'test',['styles', 'babel',  'webpack', 'eslint'],
    callback
  )
})
gulp.task('start', function (callback) {
  runSequence( ['browserSync', 'watch'],
    callback
  )
})
gulp.task('styles', function () {
  gulp.src('./client/Templates/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./client/dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('watch', function () {
  gulp.watch('./client/Templates/*.scss', ['styles']);
  gulp.watch('./client/Scripts/*.js', ['babel', 'webpack']);
})
gulp.task('babel', () => {
  return gulp.src('./client/Scripts/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./client/dist/js'));
});
gulp.task('eslint', function () {
  return gulp.src(['./client/Scripts/*.js'])
    .pipe(eslint({
      "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
        rules: {
            'strict': 1
        },
        globals: [
            'jQuery',
            '$'
        ],
        envs: [
            'browser'
        ]
    }))
    .pipe(eslint.format())
});
gulp.task('webpack', function () {
  return gulp.src('./client/dist/js/*')
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
  gulp.src('./test/*js', { read: true })
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({
      compilers: babelRegister
      }))
    .pipe(mocha({ 
      reporter: 'mocha-istanbul',
      
  
}))
);
gulp.task('browserSync', function (done) {
  browserSync.init({
    browser: "chrome",
    server: {
      baseDir: './client'
    },
  })
})
