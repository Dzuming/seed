const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const babelRegister = require('babel-register');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
gulp.task('build', (callback)=> {
  runSequence('test', ['styles', 'webpack', 'eslint'],
    callback
  )
})
gulp.task('start', (callback)=> {
  runSequence(['browserSync', 'watch'],
    callback
  )
})
gulp.task('styles', ()=> {
  gulp.src('./client/Templates/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./client/dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('watch',  ()=> {
  gulp.watch('./client/Templates/*.scss', ['styles']);
  gulp.watch('./client/Scripts/*.js', ['webpack']);
})
gulp.task('eslint',  () => {
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
gulp.task('webpack', () => {
  return gulp.src('./client/Scripts/*.js')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(webpack({
      output: {
        filename: 'bundle.js',
      },
      devtool: 'source-map'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./client/dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
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
gulp.task('browserSync', () => {
  browserSync.init({
    browser: "chrome",
    server: {
      baseDir: './client',
    },
    
    
  })
})
