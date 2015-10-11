var gulp = require('gulp');
var tsd = require('gulp-tsd');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');

var spawn = require('child_process').spawn;

gulp.task('tsd', function (callback) {
  tsd({
    command: 'reinstall',
    config: './tsd.json'
  }, callback);
});

var tsProject = ts.createProject('tsconfig.json');
gulp.task('typescript', function() {
   return tsProject.src()
      .pipe(ts(tsProject)).js
      .pipe(uglify())
      .pipe(gulp.dest('./'));
});

gulp.task('test', ['typescript'], function() {
  return gulp.src('tests/**/*.spec.js')
    .pipe(mocha());
});

gulp.task('publish', ['test'], function (done) {
  spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', done);
});

gulp.task('watch', function() {
  gulp.watch(['lib/**/*.ts', 'github-webhooker.ts', 'tests/**/*.ts'], ['test']);
});
